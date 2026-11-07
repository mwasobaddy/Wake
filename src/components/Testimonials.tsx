import { Reveal } from "./Reveal";
import { site } from "@/data/site";

function QuoteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
      <path d="M10.2 5.5c-3.4 1.2-5.7 4-5.7 7.7 0 2.5 1.6 4.3 3.9 4.3 2 0 3.6-1.5 3.6-3.5 0-1.9-1.4-3.3-3.2-3.4.3-1.6 1.5-3 3-3.8L10.2 5.5Zm8.6 0c-3.4 1.2-5.7 4-5.7 7.7 0 2.5 1.6 4.3 3.9 4.3 2 0 3.6-1.5 3.6-3.5 0-1.9-1.4-3.3-3.2-3.4.3-1.6 1.5-3 3-3.8L18.8 5.5Z" />
    </svg>
  );
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="border-t border-border bg-base"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            05 — Word of mouth
          </p>
          <h2
            id="testimonials-heading"
            className="mt-4 text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl"
          >
            What working together{" "}
            <span className="text-blue-text">sounds like</span>.
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {site.testimonials.map((quote, index) => (
            <li key={quote.role} className="h-full">
              <Reveal delay={index * 60} className="h-full">
                <figure className="flex h-full flex-col rounded-card border border-border bg-surface p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex size-10 items-center justify-center rounded-full bg-blue-tint text-on-blue-tint">
                      <QuoteIcon />
                    </span>
                    {quote.placeholder ? (
                      <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-muted">
                        Sample
                      </span>
                    ) : null}
                  </div>
                  <blockquote className="mt-4 flex-1 text-pretty text-[15px] leading-relaxed text-ink">
                    “{quote.text}”
                  </blockquote>
                  <figcaption className="mt-5 border-t border-border pt-4 text-sm font-medium text-muted">
                    {quote.role}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
