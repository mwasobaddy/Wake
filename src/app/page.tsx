import Link from "next/link";
import { site } from "@/data/site";

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        {/* Single-hue hero glow, per §6. Never behind body text. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,var(--blue-tint-subtle),transparent)]"
        />

        <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-20 sm:px-8 lg:pb-32 lg:pt-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            Software studio · Est. 2024
          </p>

          <h1 className="mt-6 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            We build software that{" "}
            <span className="text-blue-text">has to work</span>.
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">
            Xeraki designs and ships product platforms: the interface people
            use, the services behind it, and the deploy that holds when the
            traffic arrives.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            {/* The single amber CTA in this viewport. The nav uses cobalt so
                there is never a second one competing with it. */}
            <Link
              href="/#contact"
              className="inline-flex h-11 items-center rounded-control border border-amber-border bg-amber-fill px-5 text-sm font-semibold text-on-amber transition-colors hover:bg-amber-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
            >
              Start a project
            </Link>
            <Link
              href="/#work"
              className="inline-flex h-11 items-center rounded-control border border-blue-fill px-5 text-sm font-semibold text-blue-text transition-colors hover:bg-blue-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
            >
              See our work
            </Link>
          </div>

          <ul className="mt-14 flex flex-wrap gap-2">
            {site.capabilities.map((capability) => (
              <li
                key={capability}
                className="rounded-full bg-sunken px-3 py-1.5 text-xs font-medium text-muted"
              >
                {capability}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
