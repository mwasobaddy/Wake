# Wake

Personal portfolio for **Wanjohi Kelvin** — brand: **Wake**. A project-based, catalogue-style site featuring 25 builds from [github.com/mwasobaddy](https://github.com/mwasobaddy).

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript
- Tailwind CSS v4
- Space Grotesk + JetBrains Mono
- Brand palette: black `#09090b` + orange `#ff5c00`

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

- `src/data/projects.ts` — the project catalogue (name, stack, links, categories)
- `src/data/site.ts` — profile copy, skills, social links
- `src/components/` — Nav, Hero, Ticker, Projects (filterable), About, Contact, Footer
- `src/app/` — layout, metadata, theme

## Deploy

Connected to Vercel with git integration — pushes to `main` deploy automatically.
