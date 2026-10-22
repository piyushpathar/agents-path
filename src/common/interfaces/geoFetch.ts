import { FetchRoute, GeoFetchErrorCode, OfficialApiProvider } from "@/common/enums/geoFetch";

export interface GeoFetchOptions {
  method?: "GET" | "POST";
  headers?: Record<string, string>;
  body?: string;
  useIndiaProxy?: boolean;
  timeoutMs?: number;
  maxRetries?: number;
}

export interface OfficialApiRequest {
  provider: OfficialApiProvider;
  path: string;
  params?: Record<string, string | number>;
}

export interface GeoFetchSuccess {
  ok: true;
  status: number;
  route: FetchRoute;
  contentType: string;
  body: string;
}

export interface GeoFetchFailure {
  ok: false;
  status: number;
  route: FetchRoute;
  code: GeoFetchErrorCode;
  message: string;
}

export type GeoFetchResult = GeoFetchSuccess | GeoFetchFailure;
