import Link from "next/link";
import { Reveal } from "./Reveal";
import { site } from "@/data/site";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-t border-border bg-base"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                02 — Studio
              </p>
              <h2
                id="about-heading"
                className="mt-4 text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl"
              >
                A studio built to ship, not to pitch.
              </h2>
              <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">
                Xeraki is a small product engineering studio. We work as one team
                with the people building the product — designers, engineers, and
                whoever owns the outcome — instead of handing over a deck and
                disappearing.
              </p>
              <p className="mt-4 text-pretty text-base leading-relaxed text-muted">
                As a company we are deliberately narrow: platforms, integrations,
                and the infrastructure underneath them. That focus is why a
                half-formed idea can go to production without a rewrite six
                months later.
              </p>

              <Link
                href="/#contact"
                className="mt-7 inline-flex items-center gap-2 rounded-control text-sm font-semibold text-blue-text underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring"
              >
                Work with us
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-4">
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

          <div className="lg:col-span-7">
            <ul className="grid gap-4 sm:grid-cols-2">
              {site.principles.map((principle, index) => (
                <li key={principle.title} className="h-full">
                  <Reveal delay={index * 60} className="h-full">
                    <article className="flex h-full flex-col rounded-card border border-border bg-surface p-6">
                      <span
                        aria-hidden="true"
                        className="font-mono text-xs tabular-nums text-muted"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-3 text-base font-semibold tracking-tight text-ink">
                        {principle.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {principle.body}
                      </p>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Reveal className="mt-12" delay={80}>
          <div className="rounded-panel border border-border bg-surface p-6 sm:p-8">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              How we work
            </h3>
            <ol className="mt-6 grid gap-6 sm:grid-cols-3 sm:gap-8">
              {site.process.map((step, index) => (
                <li key={step.title} className="relative">
                  <span className="flex size-9 items-center justify-center rounded-full bg-blue-fill text-sm font-semibold text-on-blue">
                    {index + 1}
                  </span>
                  <h4 className="mt-4 text-base font-semibold tracking-tight text-ink">
                    {step.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
