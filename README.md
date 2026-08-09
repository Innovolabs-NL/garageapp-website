# GarageApp website

Dutch-first marketing site for [GarageApp](https://github.com/Innovolabs-NL/GarageApp) — brochure pages + SEO blog. Built with Next.js, `next-intl`, and Tailwind.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (redirects to `/nl`).

## Locales

| Locale | Prefix | Notes |
|--------|--------|--------|
| Dutch (default) | `/nl` | Localized paths: `/functies`, `/prijzen`, `/over-ons` |
| English | `/en` | `/features`, `/pricing`, `/about` |

Toggle language in the header; path is preserved when possible.

## Content

- UI copy: `src/messages/nl.json`, `src/messages/en.json`
- Blog articles (Markdown + frontmatter): `content/blog/nl/`, `content/blog/en/`

## Visual system

Bold editorial: Space Grotesk display type over Inter body, GarageApp slate (`#1F3A5F`) as the brand anchor, amber marker accents, and rule-line layouts instead of card grids. Light and dark mode are both supported — the toggle in the header persists to `localStorage` and defaults to the OS preference (tokens live in `src/app/globals.css`, boot script in `src/lib/theme.ts`).

## Contact form

`POST /api/contact` sends via [Resend](https://resend.com) when `RESEND_API_KEY` is set. Without the key, the API returns 503 and the form shows an error — use the mailto link on the contact page as fallback.

Copy `.env.example` → `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://garageapp.nl
RESEND_API_KEY=
CONTACT_TO_EMAIL=hello@innovolabs.nl
CONTACT_FROM_EMAIL=GarageApp <onboarding@resend.dev>
```

## Deploy (Vercel)

1. Import `Innovolabs-NL/garageapp-website` in Vercel
2. Set the env vars above
3. Deploy (framework: Next.js)
4. Optional: attach domain `garageapp.nl` / `www`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |

## License

Proprietary — Innovolabs.
