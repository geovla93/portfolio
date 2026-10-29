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

Provide appropriate values in your local environment before building or testing.
Do not commit local environment files.

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
