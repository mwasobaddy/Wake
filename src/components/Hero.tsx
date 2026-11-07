"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Mark } from "./Mark";
import { Marquee } from "./Marquee";
import { Safari } from "./Safari";
import { FlickeringGrid } from "./FlickeringGrid";
import { cx } from "@/lib/cx";
import { site } from "@/data/site";

const HEADLINE = ["We", "build", "software", "that", "has", "to", "work."];
/** Words from this index on carry the cobalt highlight. */
const HIGHLIGHT_FROM = 4;

export function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const safariRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-eyebrow", { y: 12, autoAlpha: 0, duration: 0.5 })
        .from(
          ".hero-word",
          { yPercent: 115, duration: 0.8, stagger: 0.045 },
          "-=0.2",
        )
        .from(".hero-sub", { y: 16, autoAlpha: 0, duration: 0.6 }, "-=0.55")
        .from(
          ".hero-actions > *",
          { y: 14, autoAlpha: 0, duration: 0.5, stagger: 0.08 },
          "-=0.4",
        )
        .from(".hero-panel", { y: 24, autoAlpha: 0, duration: 0.8 }, "-=0.7")
        .from(".hero-marquee", { autoAlpha: 0, duration: 0.6 }, "-=0.5");
    }, rootRef);

    return () => context.revert();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let animation: { pause: () => void } | undefined;

    // Anime.js owns one thing only: the idle float of the browser window.
    // GSAP owns the entrance, so the two never touch the same property —
    // GSAP animates the panel wrapper in, Anime.js floats the window itself.
    import("animejs").then(({ animate }) => {
      if (cancelled || !safariRef.current) return;
      animation = animate(safariRef.current, {
        translateY: [-5, 5],
        duration: 4600,
        loop: true,
        alternate: true,
        ease: "inOutSine",
      });
    });

    return () => {
      cancelled = true;
      animation?.pause();
    };
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden">
      {/* Single-hue glow behind a living grid, both decorative. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[460px] bg-[radial-gradient(58%_60%_at_50%_0%,var(--blue-tint-subtle),transparent)]"
      />
      <FlickeringGrid className="hero-flicker pointer-events-none absolute inset-x-0 top-0 h-[620px]" />

      <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-16 sm:px-8 lg:pb-20 lg:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="hero-eyebrow inline-flex items-center gap-2 rounded-pill border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted">
              <span className="live-dot size-2 rounded-full bg-red-vivid" />
              Open for new work
              <span className="text-border-strong">/</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
                Product engineering
              </span>
            </p>

            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[0.98] tracking-tight text-ink sm:text-5xl lg:text-[4.25rem]">
              {HEADLINE.map((word, i) => (
                <span
                  key={`${word}-${i}`}
                  className="inline-block overflow-hidden pb-2 align-bottom"
                >
                  <span
                    className={cx(
                      "hero-word inline-block",
                      i >= HIGHLIGHT_FROM && "text-blue-text",
                    )}
                  >
                    {word}
                    {i < HEADLINE.length - 1 ? "\u00A0" : ""}
                  </span>
                </span>
              ))}
            </h1>

            <p className="hero-sub mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">
              Xeraki is a product engineering studio. We take platforms from an
              empty repository to production — the interface people use, the
              services behind it, and the deploy that holds when traffic arrives.
            </p>

            <div className="hero-actions mt-9 flex flex-wrap items-center gap-3">
              {/* The single amber CTA in this viewport. The nav uses cobalt. */}
              <Link
                href="/#contact"
                className="inline-flex h-12 items-center rounded-pill border border-amber-border bg-amber-fill px-6 text-sm font-semibold text-on-amber transition-colors hover:bg-amber-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
              >
                Start a project
              </Link>
              <Link
                href="/#work"
                className="inline-flex h-12 items-center rounded-pill border border-blue-fill px-6 text-sm font-semibold text-blue-text transition-colors hover:bg-blue-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
              >
                See our work
              </Link>
            </div>
          </div>

          <div className="hero-panel lg:col-span-5">
            <div ref={safariRef}>
              <Safari url="xeraki.studio/about">
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <Mark height={30} cutsId="hero-browser" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold tracking-tight text-ink">
                        Xeraki
                      </p>
                      <p className="truncate text-xs text-muted">
                        Product engineering studio
                      </p>
                    </div>
                    <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[11px] font-medium text-muted">
                      <span className="live-dot size-1.5 rounded-full bg-red-vivid" />
                      Live
                    </span>
                  </div>

                  <p className="mt-5 text-balance text-xl font-semibold leading-snug tracking-tight text-ink">
                    One senior engineer. Full product coverage.
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Embedded with your team from design to deploy — augmented
                    by AI, accountable throughout.
                  </p>

                  <dl className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-border pt-5">
                    {site.studioFacts.map((fact) => (
                      <div key={fact.label}>
                        <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                          {fact.label}
                        </dt>
                        <dd className="mt-1 text-sm font-medium text-ink">
                          {fact.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div
                    aria-hidden="true"
                    className="mt-5 rounded-control bg-code-bg p-3 font-mono text-[11px] leading-relaxed text-code-text"
                  >
                    <p>
                      <span className="text-term-prompt">$</span> xeraki ship
                      --prod
                    </p>
                    <p>
                      <span className="text-term-prompt">✓</span> build passed
                      — 4.2s
                    </p>
                    <p>
                      <span className="text-term-prompt">●</span> live — Nairobi
                      · Remote
                    </p>
                  </div>
                </div>
              </Safari>
            </div>
          </div>
        </div>

        <div className="hero-marquee mt-16 border-y border-border py-4">
          <Marquee pauseOnHover className="[--gap:2rem]">
            {site.capabilities.map((capability) => (
              <span
                key={capability}
                className="whitespace-nowrap px-4 text-sm font-medium text-muted"
              >
                {capability}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
