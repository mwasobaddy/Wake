/**
 * Fresh Xeraki copy. Nothing here is carried over from the old Wake site —
 * the work history lives in git at 80c70b2 if any of it is worth reusing.
 */
export const site = {
  name: "Xeraki",
  tagline: "A software studio building product platforms and the systems behind them.",
  description:
    "Xeraki designs and ships product platforms — the interface, the services behind it, and the deploy that holds under load.",
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
