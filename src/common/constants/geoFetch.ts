import { OfficialApiProvider } from "@/common/enums/geoFetch";

export const INDIA_BROWSER_HEADERS: Readonly<Record<string, string>> = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,application/json;q=0.8,*/*;q=0.7",
  "Accept-Language": "en-IN,en;q=0.9,hi-IN;q=0.8,hi;q=0.7",
  "Accept-Encoding": "gzip, deflate, br",
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  "Upgrade-Insecure-Requests": "1",
  "Sec-Ch-Ua": '"Chromium";v="129", "Google Chrome";v="129", "Not=A?Brand";v="8"',
  "Sec-Ch-Ua-Mobile": "?0",
  "Sec-Ch-Ua-Platform": '"Windows"',
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "none",
  "Sec-Fetch-User": "?1",
};

export const GEO_FETCH_ENV = {
  indiaProxyUrl: "INDIA_PROXY_URL",
  dataGovInApiKey: "DATA_GOV_IN_API_KEY",
  apiSetuClientId: "API_SETU_CLIENT_ID",
  apiSetuApiKey: "API_SETU_API_KEY",
} as const;

export const GEO_FETCH_LIMITS = {
  minIntervalMsPerHost: 1500,
  jitterMs: 750,
  timeoutMs: 20000,
  maxRetries: 3,
  backoffBaseMs: 2000,
  maxBackoffMs: 30000,
} as const;

export const GEO_BLOCK_STATUS_CODES: ReadonlySet<number> = new Set([401, 403, 451]);
export const RETRYABLE_STATUS_CODES: ReadonlySet<number> = new Set([408, 425, 429, 500, 502, 503, 504]);

export const OFFICIAL_API_BASE_URLS: Readonly<Record<OfficialApiProvider, string>> = {
  [OfficialApiProvider.DataGovIn]: "https://api.data.gov.in/resource",
  [OfficialApiProvider.ApiSetu]: "https://apisetu.gov.in",
};

export const GEO_FETCH_MESSAGES = {
  geoBlocked:
    "Request blocked by the source site (likely non-Indian or datacenter IP). Set INDIA_PROXY_URL or use the official API.",
  rateLimited: "Source site is rate limiting requests. Try again later.",
  timeout: "Source site did not respond in time.",
  missingApiKey: "Official API key is not configured.",
  upstream: "Source site returned an error.",
} as const;
