# Site architecture

## Current shape

One page. Nav items point at sections on `/`: Work, Services, About, Insights,
Contact.

## The rule

Every URL has one intent. A route is created only when the content justifies it
— that is, when a section on `/` would either bloat the home page or compete
with it for the same intent.

| Signal | Keep as a section | Promote to a route |
| --- | --- | --- |
| Unique content | A short overview | Enough for a page of its own |
| Search intent | Same intent as the home page | A distinct intent or query cluster |
| Linkability | Nobody would share a deep link | Worth citing on its own |
| Function | Static copy | A form, filters, or a list that paginates |
| Volume | Two or three sections | Five or more, or growing |

## Route plan, in order

1. **`/contact`** — earliest promotion. Distinct intent, holds a form and real
   details, and conversion tracking belongs on its own URL.
2. **`/work`** and **`/work/[slug]`** — as soon as two or three real case
   studies exist. Highest SEO value: unique content, long-tail queries, and the
   only genuine internal-linking surface a studio has.
3. **`/services`**, then `/services/[slug]` — when each discipline can hold real
   depth (deliverables, proof, pricing model), not a paragraph of restatement.
4. **`/about`** — when there is a real story, team and process to tell.
5. **`/insights`** — only when posts exist. An empty blog index is a liability.

## When a section becomes a page

- The home section becomes a **teaser** — three cards or a short intro — and
  links out. It must not repeat the page body copy; two URLs with one intent is
  how a page ends up "indexed, not selected".
- The new route gets its own `title`, `description`, `canonical`, Open Graph
  image and structured data.
- Add the URL to `src/app/sitemap.ts`.
- Update `site.nav`; the active-link logic already resolves the route portion of
  each href, so switching `/#work` to `/work` is a string change.
- Update this file.

## Non-negotiables

- One `<h1>` per page. Sections use `<h2>`, cards use `<h3>`.
- Content renders in the initial HTML. No content hidden behind `opacity: 0` or
  a JS-only reveal.
- Canonicals are absolute, via `NEXT_PUBLIC_SITE_URL`.
- JSON-LD describes only content that is visible on the page.
- Exactly one amber CTA per viewport.
