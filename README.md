# Portfolio

This is a single-package Next.js App Router portfolio built with React,
TypeScript, Tailwind CSS, and Playwright.

## Requirements

- Node.js `^22.13.0 || >=24.0.0`
- pnpm `11.28.4` (pinned in `package.json`)
- Chromium installed for Playwright browser tests
- Network access to Google Fonts when running the development server or building,
  because `next/font/google` downloads the Geist font during compilation

## Setup

Install the locked dependencies and start the development server:

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Open <http://localhost:3000>. The home page is at `src/app/page.tsx`.

The contact form and site metadata read these environment variable names:

- `NEXT_PUBLIC_SITE_URL`
- `RESEND_API_KEY`
- `RECIPIENT_EMAIL`
- `TURNSTILE_SECRET_KEY` (server-only secret for the existing Turnstile widget)
- `TURNSTILE_HOSTNAMES` (optional comma-separated exact frontend hostnames;
  defaults to the hostname in `NEXT_PUBLIC_SITE_URL`)
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (optional override; defaults to the existing
  widget `0x4AAAAAAFq4H9ljrur0kahN`)

Provide appropriate values in your local environment before building or testing.
Do not commit local environment files.

The contact form uses Cloudflare Turnstile with the `contact` action. Its server
action calls Siteverify before running the existing BotID check and email handler,
and requires a successful response with the exact action and an allowed hostname.
Tokens are cleared and the widget is reset after every submission attempt.

The form uses TanStack Form. While the visitor types, the email field runs a
debounced server check that the address's domain exists. The check is an MX
lookup that fails only on NXDOMAIN, so a DNS outage never blocks a sender. The
server action repeats the check before sending any email.

For production, set `NEXT_PUBLIC_SITE_URL` to the public site URL, or set
`TURNSTILE_HOSTNAMES` explicitly (for example, `geovla.dev,www.geovla.dev`).
Production verification rejects allowlists containing `localhost` or loopback IPs.
The existing widget's Cloudflare hostname configuration must also allow each
frontend hostname. For development on both local addresses, use
`TURNSTILE_HOSTNAMES=localhost,127.0.0.1` in your ignored local environment file.
The existing secret is read in place; integration does not retrieve or rotate it.

Automated browser tests mock the widget, and verification tests mock Siteverify;
they do not send contact emails. Before deploying, complete a real challenge and
submit through the contact form, then confirm that replaying the same token is
rejected. Test keys alone cannot validate the existing widget's configuration.

## Verification

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm exec playwright install chromium
pnpm test:e2e
```

The Playwright configuration starts the app at `http://127.0.0.1:3100` and runs
the browser tests in Chromium. The build and browser tests require the environment
variables listed above. Google Fonts must be reachable during compilation.
