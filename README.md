# Anand Ranjan — personal site

Production-oriented site for freelance and consulting work in AI systems, production engineering, integrations, and difficult debugging.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- MDX writing via `next-mdx-remote`
- Static generation for pages and content

No database. Enquiry form uses `mailto:` when `NEXT_PUBLIC_CONTACT_EMAIL` is set; otherwise it copies a message for LinkedIn.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run typecheck
npm run lint
npm run build
```

## Environment

Copy `.env.example` to `.env.local`:

- `NEXT_PUBLIC_SITE_URL` — canonical origin (required for correct sitemap, robots, Open Graph). Example: `https://your-domain.vercel.app`
- `NEXT_PUBLIC_CONTACT_EMAIL` — public inbox for **Discuss a project**. Leave empty to keep the copy-to-clipboard fallback.

## Deploy on Vercel

1. Import this repository.
2. Framework preset: Next.js.
3. Set the env vars above.
4. Deploy.

## Content

- Case studies: `lib/work.ts`
- Writing: `content/writing/*.mdx`
- Site identity: `lib/site.ts`

Do not invent metrics, testimonials, or confidential employer detail. Use `TODO` markers when a fact is missing.
