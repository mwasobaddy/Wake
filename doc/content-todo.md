# Content todo

Real material the design is standing in for. Nothing here is a design task.

## Blocking — needed before launch

### Work / case studies

`site.work` holds three entries marked `placeholder: true`, and each card
renders a **Sample** tag so the site cannot present invented outcomes as real
ones. Replace them and set the flag to `false`.

Per case study:

- [ ] Client name — or a named sector if the client will not be named
- [ ] Written permission to publish the name and any screenshot
- [ ] The problem, ideally in the client's words
- [ ] What was built: scope, stack, duration
- [ ] An outcome the client will defend, with a number (time saved, revenue,
      uptime, adoption) — not an adjective
- [ ] 1–3 screenshots with customer data removed
- [ ] A quote, if the client will give one

Promotion to `/work` and `/work/[slug]` waits on this. See
`doc/site-architecture.md`.

### Contact

Built with direct links rather than a form, so it works with no backend.

- [x] Email — kelvinramsiel@gmail.com (temporary)
- [x] Phone / WhatsApp — +254 740 252 837
- [x] City — Nairobi City, Kenya
- [ ] **Official studio email on the company domain**, once the domain is
      registered. This is the one to remember: replace `site.contact.email` in
      `src/data/site.ts`, which feeds the contact section, the footer and the
      Organization JSON-LD.
- [ ] If a form is added later: a destination endpoint or service, plus a
      privacy note.

### Claims to confirm

- [ ] "Open for new work"
- [ ] "Nairobi · Remote"
- [ ] "Fixed scope or embedded"
- [ ] Process commitments: a working slice every week, handover documentation
      and runbooks

## Deferred — not blocking

### Blog / Insights

There is no blog page, and none is needed yet. Do not add one until all three
are true:

1. You can hold a publishing cadence — roughly one substantial post a month for
   six months.
2. The topics come from real work you have permission to discuss.
3. Someone owns editing and maintenance.

Until then, case studies are the content engine: they carry real queries and
real links, which an empty blog does not. When it does exist:

- route: `/insights` (index) and `/insights/[slug]`
- MDX, one `<h1>`, canonical, `Article` JSON-LD, a named author entity
- add the URLs to `sitemap.ts` and re-add "Insights" to `site.nav`

### Testimonials

Only with written permission and an attributable quote. The section
currently renders three role-only Sample placeholders (`site.testimonials`
with `placeholder: true`); the tag and this file both say so, and the
quotes carry no names and no metrics until real ones arrive.

### Team

If About grows to a team page, it needs real names, roles and photographs.
