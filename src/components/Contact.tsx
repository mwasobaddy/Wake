import { Reveal } from "./Reveal";
import { DotPattern } from "./DotPattern";
import { site } from "@/data/site";

export function Contact() {
  const { contact } = site;

  const rows = [
    {
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      label: "Phone",
      value: contact.phoneDisplay,
      href: `tel:${contact.phoneHref}`,
    },
    {
      label: "WhatsApp",
      value: "Message the studio",
      href: contact.whatsapp,
      external: true,
    },
    {
      label: "Studio",
      value: contact.location,
    },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden border-t border-border bg-base"
    >
      <DotPattern id="contact-dots" className="opacity-60" />
      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                04 — Contact
              </p>
              <h2
                id="contact-heading"
                className="mt-4 text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl"
              >
                Bring us the <span className="text-blue-text">problem</span>.
              </h2>
              <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted">
                Tell us what you are building and where it is stuck. A short
                note is enough — we will ask the rest.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex h-12 items-center rounded-pill border border-amber-border bg-amber-fill px-6 text-sm font-semibold text-on-amber transition-colors hover:bg-amber-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
                >
                  Email us
                </a>
                <a
                  href={`tel:${contact.phoneHref}`}
                  className="inline-flex h-12 items-center rounded-pill border border-blue-fill px-6 text-sm font-semibold text-blue-text transition-colors hover:bg-blue-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
                >
                  Call {contact.phoneDisplay}
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={100}>
              <dl className="overflow-hidden rounded-panel border border-border bg-surface">
                {rows.map((row) => (
                  <div
                    key={row.label}
                    className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border px-5 py-4 last:border-b-0"
                  >
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                      {row.label}
                    </dt>
                    <dd className="max-w-full text-sm font-medium text-ink">
                      {row.href ? (
                        <a
                          href={row.href}
                          {...(row.external
                            ? { target: "_blank", rel: "noreferrer" }
                            : {})}
                          className="break-all text-blue-text underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
                        >
                          {row.value}
                        </a>
                      ) : (
                        row.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
