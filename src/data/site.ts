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
    { label: "Insights", href: "/#insights" },
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
          { label: "Insights", href: "/#insights" },
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
