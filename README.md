# Portfolio

This is a single-package Next.js App Router portfolio built with React,
TypeScript and Tailwind CSS.

## Requirements

- Node.js `^22.13.0 || >=24.0.0`
- pnpm `11.28.4` (pinned in `package.json`)
- Network access to Google Fonts when running the development server or building,
  because `next/font/google` downloads the Geist font during compilation

## Setup

Install the locked dependencies and start the development server:

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Open <http://localhost:3000>. The home page is at `src/app/page.tsx`.

The contact form reads these environment variable names:

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
action calls Siteverify before validating the fields and sending any email, and
requires a successful response with the exact action and an allowed hostname.
Tokens are cleared and the widget is reset after every submission attempt.

The form uses TanStack Form. It validates `ContactFormSchema` when the visitor
submits, then again each time a field loses focus, until a message is sent. The
server action checks that the email address's domain exists before sending any
email. The check is an MX lookup that fails only on NXDOMAIN, so a DNS outage
never blocks a sender.

For production, set `NEXT_PUBLIC_SITE_URL` to the public site URL, or set
`TURNSTILE_HOSTNAMES` explicitly (for example, `geovla.dev,www.geovla.dev`).
Production verification rejects allowlists containing `localhost` or loopback IPs.
The existing widget's Cloudflare hostname configuration must also allow each
frontend hostname. For development on both local addresses, use
`TURNSTILE_HOSTNAMES=localhost,127.0.0.1` in your ignored local environment file.
The existing secret is read in place; integration does not retrieve or rotate it.

The SEO checks do not submit the contact form or send emails. Before deploying, complete a real challenge and
submit through the contact form, then confirm that replaying the same token is
rejected. Test keys alone cannot validate the existing widget's configuration.

## Verification

```bash
pnpm lint
pnpm typecheck
pnpm build
```

Start the production build, then run the HTTP SEO checks in another terminal:

```bash
pnpm start --hostname 127.0.0.1 --port 3100
```

```bash
pnpm test:seo
```

The checks use Node's built-in test runner and require no browser or additional
dependencies. Set `SEO_BASE_URL` to check another local server or a deployed site.
For a preview build, set `SEO_EXPECT_PREVIEW=1`; if Vercel serves its generated
social image from the preview domain, set `SEO_IMAGE_ORIGIN` to that origin too.

## SEO

`src/data/site.ts` owns the canonical production URL (`https://geovla.dev`) and
shared identity metadata. `NEXT_PUBLIC_SITE_URL` still configures the contact
form's hostname fallback; it does not override canonical or sitemap URLs.

The home page owns its canonical and social metadata. Structured data and
`/llms.txt` reuse the experience, project, and social-profile data. Project `id`
values are stable public fragments; keep them unchanged when editing titles.
The 1200×630 `/opengraph-image` is generated at build time from the current
identity and role data, with no external image or font requests.

Vercel preview builds (`VERCEL_ENV=preview`) send `noindex, follow` in metadata
and an `X-Robots-Tag` header. They remain crawlable so bots can read that rule.
Production remains indexable. Other staging hosts need an equivalent deployment
policy if introduced later.

`/sitemap.xml` lists the single canonical HTML page and omits modification dates
because the repository does not record reliable content-update dates. `/llms.txt`
is an experimental supplementary resource, with no promised ranking benefit.

See [the SEO audit and validation notes](docs/seo.md) for the findings, scope,
maintenance guidance, and deployment checks.
