# Anand Ranjan — personal site

Production-oriented site for freelance and consulting work in AI systems, production engineering, integrations, and difficult debugging.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- MDX writing via `next-mdx-remote`
- Static generation for pages and content

No database. Enquiries are delivered by FormSubmit's free hosted form endpoint.

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
- `NEXT_PUBLIC_CONTACT_EMAIL` — inbox for **Discuss a project**. Defaults to `anandranjan789@gmail.com`.

### Enquiry form activation

FormSubmit requires a one-time email confirmation. After the site is deployed,
send one test enquiry, open the activation email delivered to the contact inbox,
and approve it. Future enquiries will then arrive directly by email. The form
includes FormSubmit's honeypot field and default reCAPTCHA protection.

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
