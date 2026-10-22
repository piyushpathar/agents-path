export enum FetchRoute {
  OfficialApi = "official-api",
  IndiaProxy = "india-proxy",
  Direct = "direct",
}

export enum OfficialApiProvider {
  DataGovIn = "data-gov-in",
  ApiSetu = "api-setu",
}

export enum GeoFetchErrorCode {
  GeoBlocked = "GEO_BLOCKED",
  RateLimited = "RATE_LIMITED",
  Timeout = "TIMEOUT",
  MissingApiKey = "MISSING_API_KEY",
  Upstream = "UPSTREAM_ERROR",
}
