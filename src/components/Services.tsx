import Link from "next/link";
import { Reveal } from "./Reveal";
import { SpotlightCard } from "./SpotlightCard";
import { ServiceIcon, type ServiceIconName } from "./ServiceIcons";
import { site, siteUrl } from "@/data/site";

/** Matches the visible cards one-for-one; nothing here is invisible on the page. */
const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `${site.name} services`,
  itemListElement: site.services.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Service",
      name: service.title,
      description: service.blurb,
      provider: {
        "@type": "Organization",
        name: site.name,
        url: siteUrl,
      },
    },
  })),
};

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="border-t border-border bg-base"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            01 — Services
          </p>
          <h2
            id="services-heading"
            className="mt-4 text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl"
          >
            The work behind the <span className="text-blue-text">product</span>.
          </h2>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted">
            Six disciplines, one team. We take on the whole surface — the
            interface, the services it talks to, the data underneath, and the
            deploy that keeps it up.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {site.services.map((service, index) => (
            <li key={service.title} className="h-full">
              <Reveal delay={index * 60} className="h-full">
                <SpotlightCard className="h-full rounded-card">
                  <article className="group flex h-full flex-col rounded-card border border-border bg-surface p-6 transition-colors hover:border-blue-fill/40">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-control bg-blue-tint text-on-blue-tint">
                    <ServiceIcon name={service.icon as ServiceIconName} />
                  </span>

                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {service.blurb}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="rounded-full bg-sunken px-2.5 py-1 text-[11px] font-medium text-muted"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                  </article>
                </SpotlightCard>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-10" delay={120}>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-control text-sm font-semibold text-blue-text underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring"
          >
            Discuss a project
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="size-4"
            >
              <path
                d="M4 12h15M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </Reveal>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
    </section>
  );
}
