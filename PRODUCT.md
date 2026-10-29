# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two primary audiences, weighted equally. The site has to work for both without favoring either:

- **Hiring teams.** Recruiters, boards, and hiring managers deciding whether George fits a technical leadership or engineering role.
- **Prospective clients.** Founders and teams deciding whether to hire George for freelance or contract builds, Web3 work included.

Both are doing the same job: deciding whether George is the right engineering leader for them, then finding how to reach him.

## Product Purpose

geovla.dev is George Vlassis's personal portfolio. It presents him as a hands-on engineering and product leader in blockchain security, shows the work he has shipped and the roles he has held, and gives visitors a direct way to get in touch. A visit succeeds when either audience reaches out. The contact form is the main channel. The CV download, GitHub, LinkedIn, and X are secondary routes.

## Positioning

Hands-on engineering and product leader specializing in blockchain security (confirmed by George, 2026-10-29). This replaces the earlier "software engineer first" positioning. What supports it, all on record:

- Current title at Cyberscope: Chief Technology Officer & Vice President, Product (listed on cyberscope.io/about-us; no start date published).
- Product leadership: defines the roadmap for Cyberscope's blockchain security SaaS platforms and coordinates engineering, auditing, and design teams.
- Still hands-on: full-stack product work in Next.js, Node.js, TypeScript, MongoDB, and Postgres.
- Security depth: formal smart contract audits of DeFi and NFT projects at Cyberscope, plus internal auditing tools.

A typical engineering leader can't truthfully claim this mix of shipped DeFi products, audit experience, and current technical and product leadership.

## Operating Context

- Based in Ioannina, Greece (per the CV). The site is English-only.
- Visitors move between the site, the downloadable CV, and George's GitHub, LinkedIn, and X profiles.
- Contact submissions arrive as email through Resend, sent to the address in `RECIPIENT_EMAIL`. The sender gets a follow-up email.
- Vercel Analytics is installed.

## Capabilities and Constraints

- **Single page.** Sections are Hero, About, Experience, Projects, and Contact. The header has in-page hash navigation (About, Experience, Projects, Contact) and a light/dark/system theme menu. The footer has social links.
- **Content lives in data files.** Roles are in `src/data/experiences.ts`, projects in `src/data/projects.ts`, and nav links in `src/data/nav-links.ts`.
- **Contact form.**
  - Built with TanStack Form and `ContactFormSchema` (Zod). Fields are validated on submit, then again each time a field loses focus.
  - Cloudflare Turnstile (action `contact`) is verified on the server before any validation or sending.
  - An MX lookup rejects only NXDOMAIN domains, so a DNS outage never blocks a real sender.
  - The protection must stay invisible to legitimate senders.
- **CV.** Downloads from `/george_vlassis_cv.pdf` under its existing filename.
- **SEO.** Full metadata, an Open Graph and Twitter image (`/og-image.png`, 1200×630), `sitemap.ts`, and `robots.ts`.
- **Stack.**
  - Next.js 16 App Router, React 19, Tailwind CSS 4, and shadcn/ui on Base UI primitives, with lucide-react, Motion, sonner, and next-themes.
  - This Next.js version has breaking changes. Read `node_modules/next/dist/docs/` before writing code (see `AGENTS.md`).
  - Builds need network access to Google Fonts.
- **Playwright tests pin behavior.** They check:
  - accessible names: "Get in touch", "View Github", "Download CV", "Live Demo", "View Code", "Send Message", and the "Name", "Email Address", and "Message" fields
  - the theme menu
  - the mobile navigation menu below 768px
  - the hero's guilloché medallion
  - the contact validation flow

  Any change to these must update the tests on purpose.
- **Open: earlier experience.** George has more than 5 years of experience (confirmed), but only the Cyberscope roles from November 2022 onward are recorded anywhere in the repo. Pre-2022 work needs details from George before it can appear.

## Brand Commitments

- Name: George Vlassis. Domain: geovla.dev.
- Handles: GitHub `geovla93`, X `@GeorgeVlassis`, LinkedIn `georgios-vlassis-045844105`.
- No logo, mark, or confirmed voice exists. The tone of the current copy is not a binding commitment.
- Dark is the default theme for first-time visitors; light and system stay selectable (decided 2026-10-29).

## Evidence on Hand

- **Roles** (`src/data/experiences.ts`):
  - Chief Technology Officer & Vice President, Product, Cyberscope. VP, Product since June 2025 (per the CV); the CTO title is on cyberscope.io/about-us without a start date, so the site shows the combined title on the June 2025 entry until George confirms the date.
  - Software Engineer, Cyberscope, November 2022 to May 2025.
- **The CV is outdated** (per George): it predates the CTO title.
- **Projects** (`src/data/projects.ts`, screenshots in `public/images/`):
  - Volume Boost, a DeFi automation tool run through a Telegram bot (`t.me/volboost_bot`).
  - Utopia, a Web3 DeFi platform on BSC (`utopiabnb.com`).
  - This portfolio (`geovla.dev`).
  - None has a public source link.
- **Portrait:** `public/images/me.jpg`.
- **CV:** `public/george_vlassis_cv.pdf`, one page. Its education entry ("Bachelor's Degree in Management, Anytown University, Anytown, USA") is template placeholder text. George's real education is unconfirmed, so don't surface it.
- **Not on hand:** testimonials, client names or logos, metrics, case studies, writing, talks, or open-source highlights. Don't invent any of them. The experience copy's growth and efficiency claims have no numbers behind them, so don't add figures. Outcome or impact slots stay off the page until George supplies real numbers (decided 2026-10-29).

## Product Principles

1. **A leader who still builds.** Technical and product leadership is the headline; shipped code and audit work prove it is hands-on. Neither half is allowed to disappear.
2. **Answer both readers at once.** Every section should answer something both a hiring manager and a prospective client want to know: what George has built, where he has worked, and how to reach him.
3. **Claim only what's on record.** Show real projects, real roles, and live links. Gaps stay as gaps until George fills them.
4. **Make reaching out effortless and safe.** The contact form is the conversion. Its protection and validation should be invisible to real senders and never lose what they typed.
5. **The site is a work sample.** It's listed as one of the projects, so its build quality counts as evidence.
