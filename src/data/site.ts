export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://xeraki.example"
).replace(/\/$/, "");

/**
 * Fresh Xeraki copy. Nothing here is carried over from the old Wake site —
 * the work history lives in git at 80c70b2 if any of it is worth reusing.
 */
export const site = {
  name: "Xeraki",
  tagline:
    "A product engineering studio building platforms and the systems behind them.",
  description:
    "Xeraki is a product engineering studio. We design and ship platforms — the interface, the services behind it, and the deploy that holds under load.",
  /**
   * The six disciplines are the same strings as `capabilities` plus the detail
   * the services section needs. Keep the titles identical so the marquee and
   * the cards cannot drift apart.
   */
  services: [
    {
      icon: "design",
      title: "Product design",
      blurb:
        "Interfaces that make a complicated system legible — from the first wireframe to the component library the team ships against.",
      points: ["Design systems", "Prototyping", "Accessibility"],
    },
    {
      icon: "web",
      title: "Web platforms",
      blurb:
        "Multi-tenant product surfaces built to survive the second year, not just the launch demo.",
      points: ["Next.js & React", "Laravel", "Dashboards"],
    },
    {
      icon: "api",
      title: "APIs & integrations",
      blurb:
        "The plumbing between your product and everyone else's: payments, identity, messaging and data.",
      points: ["REST & GraphQL", "M-Pesa & Stripe", "Webhooks"],
    },
    {
      icon: "mobile",
      title: "Mobile apps",
      blurb:
        "One codebase, native-feeling results, and offline behaviour that does not fall apart in the field.",
      points: ["React Native", "Expo", "Offline-first"],
    },
    {
      icon: "data",
      title: "Data & AI",
      blurb:
        "Models placed where they earn their keep, with the evaluation and guardrails that keep them honest.",
      points: ["LLM features", "Pipelines", "Retrieval"],
    },
    {
      icon: "cloud",
      title: "Cloud & DevOps",
      blurb:
        "Deploys that are boring on purpose: observable, repeatable, and cheap enough to leave running.",
      points: ["CI/CD", "Observability", "Cost control"],
    },
  ] as const,
  nav: [
    { label: "Work", href: "/#work" },
    { label: "Services", href: "/#services" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ],
  capabilities: [
    "Product design",
    "Web platforms",
    "APIs & integrations",
    "Mobile apps",
    "Data & AI",
    "Cloud & DevOps",
  ],
  studioFacts: [
    { label: "Focus", value: "Product platforms" },
    { label: "Team", value: "Embedded engineers" },
    { label: "Base", value: "Nairobi · Remote" },
    { label: "Engagement", value: "Fixed scope or embedded" },
  ],
  principles: [
    {
      title: "Ship in slices",
      body: "Working software every week beats a perfect plan every quarter. Scope gets cut to protect the date, not the quality.",
    },
    {
      title: "Own the whole surface",
      body: "Interface, services, data and deploy are one system. We do not hand a layer over a wall and hope it fits.",
    },
    {
      title: "Boring infrastructure",
      body: "The deploy should be the least interesting part of the product: repeatable, observable, and cheap to leave running.",
    },
    {
      title: "Write it down",
      body: "Decisions live in the repository, so the next engineer inherits the reasoning instead of doing archaeology.",
    },
  ],
  process: [
    {
      title: "Discovery",
      body: "Map the product, the constraints and the risk before any production code is written.",
    },
    {
      title: "Build",
      body: "Embedded with your team, in slices, with something working to look at every week.",
    },
    {
      title: "Hand over",
      body: "Documentation, runbooks, and a team that can keep shipping without us.",
    },
  ],
  /**
   * PLACEHOLDERS. These are illustrative, not published client work.
   * Every entry carries `placeholder: true`, which renders a "Sample" tag so
   * the site cannot quietly present invented outcomes as real ones.
   *
   * Before Work is promoted to its own route, replace each of these with a
   * real engagement and set `placeholder: false`. Required per case:
   * client name (only with written permission), sector, the problem, what was
   * built, the outcome with a number the client will stand behind, and 1–3
   * screenshots. See doc/content-todo.md.
   */
  work: [
    {
      placeholder: true,
      sector: "PropTech",
      title: "Property operations platform",
      summary:
        "Rent collection, tenant records and maintenance in a single ledger, with mobile-money settlement built into the flow rather than bolted on.",
      stack: ["Next.js", "Laravel", "M-Pesa"],
    },
    {
      placeholder: true,
      sector: "Enterprise",
      title: "Public-sector idea portal",
      summary:
        "Staff engagement and points behind OTP and Google sign-in, with an audit trail for every action and role-scoped access.",
      stack: ["Laravel", "React", "OTP auth"],
    },
    {
      placeholder: true,
      sector: "SaaS",
      title: "AI invoicing tool",
      summary:
        "Turns a plain-text brief into a priced, branded invoice with PDF export and reminder emails, backed by a dashboard that tracks status.",
      stack: ["Node.js", "LLM", "PDF"],
    },
  ],
  contact: {
    email: "kelvinramsiel@gmail.com",
    phoneDisplay: "+254 740 252 837",
    /** E.164 without spaces, for tel: links. */
    phoneHref: "+254740252837",
    whatsapp: "https://wa.me/254740252837",
    location: "Nairobi City, Kenya",
  },
  /**
   * Counted across 25 shipped projects (the previous portfolio catalogue).
   * Variants are folded so the numbers stay honest: Laravel 12/13 into
   * Laravel, Next.js 16 into Next.js, the AI spellings into AI/LLM, and the
   * realtime spellings into WebSockets. Inner ring is the top six, outer
   * ring the next nine.
   */
  stackInner: [
    { name: "Laravel", projects: 15 },
    { name: "TypeScript", projects: 11 },
    { name: "React", projects: 8 },
    { name: "Blade", projects: 8 },
    { name: "PHP", projects: 7 },
    { name: "Next.js", projects: 3 },
  ],
  stackOuter: [
    { name: "WebSockets", projects: 4 },
    { name: "Tailwind CSS", projects: 3 },
    { name: "PostgreSQL", projects: 3 },
    { name: "AI / LLM", projects: 3 },
    { name: "Node.js", projects: 2 },
    { name: "Express", projects: 2 },
    { name: "Expo", projects: 2 },
    { name: "React Native", projects: 2 },
    { name: "M-Pesa", projects: 1 },
  ],
  shippedTotal: 25,
  /**
   * PLACEHOLDERS, like `work`. Role-only attributions, no invented names,
   * no invented metrics — and each card carries a Sample tag until replaced
   * by a real quote with written permission. See doc/content-todo.md.
   */
  testimonials: [
    {
      placeholder: true,
      role: "Founder, SaaS",
      text: "Xeraki took our idea from a rough brief to a platform our customers pay through. One person, zero hand-offs, no drama.",
    },
    {
      placeholder: true,
      role: "Operations lead, Enterprise",
      text: "The weekly slices meant we always knew where things stood. The handover docs were better than what we had before.",
    },
    {
      placeholder: true,
      role: "Owner, Services SME",
      text: "What used to take a day of admin now takes a text prompt. It just works, which is exactly what was promised.",
    },
  ],
  footer: {
    columns: [
      {
        title: "Capabilities",
        links: [
          { label: "Web platforms", href: "/#services" },
          { label: "APIs & integrations", href: "/#services" },
          { label: "Mobile apps", href: "/#services" },
          { label: "Data & AI", href: "/#services" },
        ],
      },
      {
        title: "Studio",
        links: [
          { label: "About", href: "/#about" },
          { label: "Process", href: "/#process" },
          { label: "Contact", href: "/#contact" },
        ],
      },
      {
        title: "Start",
        links: [
          { label: "Start a project", href: "/#contact" },
          { label: "Book a call", href: "/#contact" },
        ],
      },
    ],
  },
} as const;
