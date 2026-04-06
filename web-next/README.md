# King Of Kings — Next.js Marketing Site (SEO-Optimized)

SEO-correct Next.js 14 App Router site with SSG/SSR. All marketing pages render real HTML on first load.

## Quick Start

```bash
cd web-next
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Setup

### Logo

Copy your logo to `web-next/public/logo.png`. If you have it in the original project (e.g. `client/public/static/logo.png` or similar), copy it to `web-next/public/logo.png`.

### Environment Variables

Create `.env` (and optionally `.env.local` for machine-specific overrides).

Production canonical URL (`.com` should redirect to this):

```
NEXT_PUBLIC_SITE_URL=https://www.kingofkingsgroup.ca
NEXT_PUBLIC_API_URL=http://localhost:5000
```

For local development, add `.env.local` with `NEXT_PUBLIC_SITE_URL=http://localhost:3000` so metadata and OG tags use localhost.

- `NEXT_PUBLIC_SITE_URL` — Used for canonical URLs, sitemap, and Open Graph. Production: `https://www.kingofkingsgroup.ca`.
- `NEXT_PUBLIC_API_URL` — Base URL for the Express API (contact, investors, analysis, subscribers). Use empty string for same-origin.
- `NEXT_PUBLIC_ADMIN_EMAIL` — Admin allowlist email (e.g. `md.ragy@gmail.com`). Used client-side for admin checks.
- `ADMIN_EMAIL` — Server-side admin email (same value). Used by `/api/admin/setup`.
- `NEXT_PUBLIC_FIREBASE_*` — Firebase client config (API key, auth domain, project ID, etc.).
- `FIREBASE_ADMIN_PROJECT_ID`, `FIREBASE_ADMIN_CLIENT_EMAIL`, `FIREBASE_ADMIN_PRIVATE_KEY` — Firebase Admin SDK for `/api/admin/setup` and `check-setup`.

## Build

```bash
npm run build
npm run start
```

## SEO Features

- **Metadata**: Unique title (≤60 chars), meta description (150–160 chars), canonical URL, Open Graph, Twitter cards per page
- **JSON-LD**: LocalBusiness, Service, FAQPage schemas on relevant pages
- **City Pages**: `/property-management/[city]` — 19 cities pre-rendered via `generateStaticParams()`
- **Sitemap**: `/sitemap.xml` — All static + city pages
- **Robots**: `/robots.txt` — Allow crawling, link to sitemap

## Routes

| Route | Type | Notes |
|-------|------|-------|
| `/` | SSG | Home |
| `/about` | SSG | About |
| `/services` | SSG | Services + evaluation form |
| `/management` | SSG | Property management overview |
| `/investors` | SSG | Investor network + application |
| `/contact` | SSG | Contact form |
| `/property-management/[city]` | SSG | 19 city pages |

## Forms (Express API)

Contact, investor, analysis, and newsletter forms POST to the Express API. Ensure the Express server is running and `NEXT_PUBLIC_API_URL` points to it. In development: run Express on port 5000 and Next on 3000.

## Testing Checklist

- [ ] `npm run build` succeeds
- [ ] All marketing pages load with real HTML (view source, no SPA shell)
- [ ] `/property-management/toronto` (and other cities) pre-render
- [ ] Metadata: check `<title>`, `<meta name="description">`, `rel="canonical"` per page
- [ ] Open Graph: test with [opengraph.xyz](https://www.opengraph.xyz/) or Facebook Debugger
- [ ] `/sitemap.xml` lists all pages
- [ ] `/robots.txt` allows crawling and references sitemap
- [ ] Lighthouse mobile 90+ on marketing routes
- [ ] Forms submit to Express API successfully
