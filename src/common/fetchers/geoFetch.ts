import "server-only";
import { ProxyAgent, type Dispatcher } from "undici";
import {
  GEO_BLOCK_STATUS_CODES,
  GEO_FETCH_ENV,
  GEO_FETCH_LIMITS,
  GEO_FETCH_MESSAGES,
  INDIA_BROWSER_HEADERS,
  OFFICIAL_API_BASE_URLS,
  RETRYABLE_STATUS_CODES,
} from "@/common/constants/geoFetch";
import { FetchRoute, GeoFetchErrorCode, OfficialApiProvider } from "@/common/enums/geoFetch";
import type {
  GeoFetchFailure,
  GeoFetchOptions,
  GeoFetchResult,
  OfficialApiRequest,
} from "@/common/interfaces/geoFetch";

const hostQueues = new Map<string, Promise<void>>();
const hostLastRequestAt = new Map<string, number>();
let indiaProxyAgent: ProxyAgent | null = null;

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const getIndiaProxyAgent = (): ProxyAgent | null => {
  const proxyUrl = process.env[GEO_FETCH_ENV.indiaProxyUrl];
  if (!proxyUrl) return null;
  indiaProxyAgent ??= new ProxyAgent(proxyUrl);
  return indiaProxyAgent;
};

const waitForHostSlot = (host: string): Promise<void> => {
  const previous = hostQueues.get(host) ?? Promise.resolve();
  const next = previous.then(async () => {
    const elapsed = Date.now() - (hostLastRequestAt.get(host) ?? 0);
    const wait =
      GEO_FETCH_LIMITS.minIntervalMsPerHost - elapsed + Math.random() * GEO_FETCH_LIMITS.jitterMs;
    if (wait > 0) await sleep(wait);
    hostLastRequestAt.set(host, Date.now());
  });
  hostQueues.set(host, next);
  return next;
};

const parseRetryAfterMs = (header: string | null): number | null => {
  if (!header) return null;
  const seconds = Number(header);
  if (Number.isFinite(seconds)) return seconds * 1000;
  const date = Date.parse(header);
  return Number.isNaN(date) ? null : Math.max(0, date - Date.now());
};

const backoffMs = (attempt: number, retryAfter: string | null): number =>
  Math.min(
    parseRetryAfterMs(retryAfter) ??
      GEO_FETCH_LIMITS.backoffBaseMs * 2 ** attempt + Math.random() * GEO_FETCH_LIMITS.jitterMs,
    GEO_FETCH_LIMITS.maxBackoffMs,
  );

const failure = (status: number, route: FetchRoute, code: GeoFetchErrorCode): GeoFetchFailure => {
  const messages: Record<GeoFetchErrorCode, string> = {
    [GeoFetchErrorCode.GeoBlocked]: GEO_FETCH_MESSAGES.geoBlocked,
    [GeoFetchErrorCode.RateLimited]: GEO_FETCH_MESSAGES.rateLimited,
    [GeoFetchErrorCode.Timeout]: GEO_FETCH_MESSAGES.timeout,
    [GeoFetchErrorCode.MissingApiKey]: GEO_FETCH_MESSAGES.missingApiKey,
    [GeoFetchErrorCode.Upstream]: GEO_FETCH_MESSAGES.upstream,
  };
  return { ok: false, status, route, code, message: messages[code] };
};

export const geoFetch = async (url: string, options: GeoFetchOptions = {}): Promise<GeoFetchResult> => {
  const { host, origin } = new URL(url);
  const dispatcher: Dispatcher | null = options.useIndiaProxy === false ? null : getIndiaProxyAgent();
  const route = dispatcher ? FetchRoute.IndiaProxy : FetchRoute.Direct;
  const maxRetries = options.maxRetries ?? GEO_FETCH_LIMITS.maxRetries;
  const headers = { ...INDIA_BROWSER_HEADERS, Referer: `${origin}/`, ...options.headers };

  for (let attempt = 0; ; attempt++) {
    await waitForHostSlot(host);
    try {
      const response = await fetch(url, {
        method: options.method ?? "GET",
        headers,
        body: options.body,
        redirect: "follow",
        cache: "no-store",
        signal: AbortSignal.timeout(options.timeoutMs ?? GEO_FETCH_LIMITS.timeoutMs),
        ...(dispatcher && { dispatcher }),
      } as RequestInit);

      if (response.ok) {
        return {
          ok: true,
          status: response.status,
          route,
          contentType: response.headers.get("content-type") ?? "",
          body: await response.text(),
        };
      }

      if (RETRYABLE_STATUS_CODES.has(response.status) && attempt < maxRetries) {
        await sleep(backoffMs(attempt, response.headers.get("retry-after")));
        continue;
      }

      if (GEO_BLOCK_STATUS_CODES.has(response.status)) {
        return failure(response.status, route, GeoFetchErrorCode.GeoBlocked);
      }
      return failure(
        response.status,
        route,
        response.status === 429 ? GeoFetchErrorCode.RateLimited : GeoFetchErrorCode.Upstream,
      );
    } catch (error) {
      const isTimeout = error instanceof DOMException && error.name === "TimeoutError";
      if (attempt < maxRetries) {
        await sleep(backoffMs(attempt, null));
        continue;
      }
      return failure(0, route, isTimeout ? GeoFetchErrorCode.Timeout : GeoFetchErrorCode.Upstream);
    }
  }
};

const officialApiAuth = (
  provider: OfficialApiProvider,
): { headers: Record<string, string>; params: Record<string, string> } | null => {
  if (provider === OfficialApiProvider.DataGovIn) {
    const apiKey = process.env[GEO_FETCH_ENV.dataGovInApiKey];
    return apiKey ? { headers: {}, params: { "api-key": apiKey, format: "json" } } : null;
  }
  const clientId = process.env[GEO_FETCH_ENV.apiSetuClientId];
  const apiKey = process.env[GEO_FETCH_ENV.apiSetuApiKey];
  return clientId && apiKey
    ? { headers: { "X-APISETU-CLIENTID": clientId, "X-APISETU-APIKEY": apiKey }, params: {} }
    : null;
};

export const fetchOfficialApi = async ({
  provider,
  path,
  params = {},
}: OfficialApiRequest): Promise<GeoFetchResult> => {
  const auth = officialApiAuth(provider);
  if (!auth) return failure(0, FetchRoute.OfficialApi, GeoFetchErrorCode.MissingApiKey);

  const url = new URL(`${OFFICIAL_API_BASE_URLS[provider]}/${path.replace(/^\//, "")}`);
  Object.entries({ ...params, ...auth.params }).forEach(([key, value]) =>
    url.searchParams.set(key, String(value)),
  );

  const result = await geoFetch(url.toString(), {
    headers: { Accept: "application/json", ...auth.headers },
  });
  return { ...result, route: FetchRoute.OfficialApi };
};

export const fetchWithFallback = async (
  url: string,
  officialApi?: OfficialApiRequest,
  options?: GeoFetchOptions,
): Promise<GeoFetchResult> => {
  if (officialApi) {
    const apiResult = await fetchOfficialApi(officialApi);
    if (apiResult.ok) return apiResult;
  }
  return geoFetch(url, options);
};
