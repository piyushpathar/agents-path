import { createServer } from "node:http";
import { lookup } from "node:dns/promises";
import { BlockList, isIP } from "node:net";
import { timingSafeEqual } from "node:crypto";

const PORT = Number(process.env.RELAY_PORT ?? 8787);
const TOKEN = process.env.RELAY_TOKEN ?? "";
const ALLOWED_HOSTS = (process.env.RELAY_ALLOWED_HOSTS ?? "")
  .split(",")
  .map((host) => host.trim().toLowerCase())
  .filter(Boolean);
const MAX_BODY_BYTES = 1_000_000;
const UPSTREAM_TIMEOUT_MS = 20_000;

if (TOKEN.length < 24) {
  console.error("Set RELAY_TOKEN to a random string of at least 24 characters.");
  process.exit(1);
}

const privateRanges = new BlockList();
[
  ["0.0.0.0", 8], ["10.0.0.0", 8], ["100.64.0.0", 10], ["127.0.0.0", 8],
  ["169.254.0.0", 16], ["172.16.0.0", 12], ["192.168.0.0", 16], ["224.0.0.0", 4],
].forEach(([net, prefix]) => privateRanges.addSubnet(net, prefix, "ipv4"));
[["::", 128], ["::1", 128], ["fc00::", 7], ["fe80::", 10]].forEach(([net, prefix]) =>
  privateRanges.addSubnet(net, prefix, "ipv6"),
);

const isTokenValid = (header) => {
  const given = Buffer.from((header ?? "").replace(/^Bearer /, ""));
  const expected = Buffer.from(TOKEN);
  return given.length === expected.length && timingSafeEqual(given, expected);
};

const isHostAllowed = (hostname) =>
  ALLOWED_HOSTS.length === 0 ||
  ALLOWED_HOSTS.some((allowed) => hostname === allowed || hostname.endsWith(`.${allowed}`));

const resolvesToPublicAddress = async (hostname) => {
  const addresses = isIP(hostname)
    ? [{ address: hostname, family: isIP(hostname) }]
    : await lookup(hostname, { all: true });
  return addresses.every(
    ({ address, family }) => !privateRanges.check(address, family === 6 ? "ipv6" : "ipv4"),
  );
};

const readBody = (req) =>
  new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) reject(new Error("Body too large"));
      else chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });

const send = (res, status, payload) => {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(payload));
};

createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/health") return send(res, 200, { ok: true });
  if (req.method !== "POST" || req.url !== "/fetch") return send(res, 404, { error: "Not found" });
  if (!isTokenValid(req.headers.authorization)) return send(res, 401, { error: "Unauthorized" });

  try {
    const { url, method = "GET", headers = {}, body } = JSON.parse(await readBody(req));
    const target = new URL(url);
    if (!["http:", "https:"].includes(target.protocol)) return send(res, 400, { error: "Bad protocol" });
    if (!isHostAllowed(target.hostname)) return send(res, 403, { error: "Host not allowed" });
    if (!(await resolvesToPublicAddress(target.hostname))) return send(res, 403, { error: "Private address" });

    const upstream = await fetch(target, {
      method: method === "POST" ? "POST" : "GET",
      headers,
      body: method === "POST" ? body : undefined,
      redirect: "follow",
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });

    send(res, 200, {
      status: upstream.status,
      contentType: upstream.headers.get("content-type") ?? "",
      retryAfter: upstream.headers.get("retry-after"),
      body: upstream.ok ? await upstream.text() : "",
    });
    console.log(`${new Date().toISOString()} ${method} ${target.hostname} -> ${upstream.status}`);
  } catch (error) {
    send(res, 200, { status: 0, contentType: "", retryAfter: null, body: "", error: String(error) });
  }
}).listen(PORT, "127.0.0.1", () => console.log(`India relay listening on http://127.0.0.1:${PORT}`));
