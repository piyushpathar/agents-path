# India home relay

Lets your deployed app (Vercel, US servers, etc.) fetch Indian government and geo-restricted sites
through **your own home internet connection in India** — no paid proxy needed.

```
Deployed app ──HTTPS──▶ Cloudflare Tunnel ──▶ relay on your home PC ──▶ india.gov.in, etc.
                                                (Indian home IP)
```

## 1. Run the relay at home

Needs Node.js 18+ on a PC, laptop or Android phone (Termux) that stays on, connected to your home Wi-Fi.

```bash
# generate a secret token once and keep it
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

RELAY_TOKEN=<that-token> RELAY_ALLOWED_HOSTS=gov.in,nic.in node relay/india-relay.mjs
```

Windows (PowerShell):

```powershell
$env:RELAY_TOKEN="<that-token>"; $env:RELAY_ALLOWED_HOSTS="gov.in,nic.in"; node relay/india-relay.mjs
```

`RELAY_ALLOWED_HOSTS` is optional but recommended: comma-separated domains the relay may fetch
(subdomains included). Leave it empty to allow any public site.

## 2. Expose it with Cloudflare Tunnel (free)

Install `cloudflared`: https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/

```bash
cloudflared tunnel --url http://127.0.0.1:8787
```

It prints a URL like `https://random-words.trycloudflare.com`. Check it works:

```bash
curl https://random-words.trycloudflare.com/health
```

Quick tunnel URLs change every restart. For a permanent URL, create a named tunnel
(free Cloudflare account + any domain): `cloudflared tunnel login`, `cloudflared tunnel create india-relay`,
then route a hostname to `http://127.0.0.1:8787`.

## 3. Point the app at it

In the app's `.env` (and your hosting provider's environment variables):

```
INDIA_RELAY_URL=https://random-words.trycloudflare.com/fetch
INDIA_RELAY_TOKEN=<that-token>
```

`geoFetch` now sends every request through your home connection, keeping the India browser
headers and per-site rate limiting.

## Notes

- The relay only listens on `127.0.0.1`; it is reachable from outside only through the tunnel.
- Requests without the token are rejected; private/local network addresses are blocked.
- If the PC sleeps or the tunnel stops, requests fail with `UPSTREAM_ERROR` — keep it running,
  or use `pm2` / Task Scheduler to start it on boot.
