"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Mark } from "./Mark";
import { Marquee } from "./Marquee";
import { FlickeringGrid } from "./FlickeringGrid";
import { cx } from "@/lib/cx";
import { site } from "@/data/site";

const HEADLINE = ["We", "build", "software", "that", "has", "to", "work."];
/** Words from this index on carry the cobalt highlight. */
const HIGHLIGHT_FROM = 4;

export function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const markRef = useRef<HTMLDivElement | null>(null);

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

    // Anime.js owns one thing only: the idle float of the mark. GSAP owns the
    // entrance, so the two never touch the same element.
    import("animejs").then(({ animate }) => {
      if (cancelled || !markRef.current) return;
      animation = animate(markRef.current, {
        translateY: [-6, 6],
        duration: 4200,
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
            <div className="rounded-panel border border-border bg-surface p-6 shadow-[0_1px_2px_rgb(15_23_42/0.05),0_12px_32px_rgb(15_23_42/0.07)]">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  Studio profile
                </span>
                <span className="inline-flex items-center gap-2 text-xs text-muted">
                  <span className="live-dot size-1.5 rounded-full bg-red-vivid" />
                  Live
                </span>
              </div>

              <div ref={markRef} className="flex items-center justify-center py-10">
                <Mark height={124} cutsId="hero" />
              </div>

              <dl className="grid grid-cols-2 gap-x-5 gap-y-4 border-t border-border pt-5">
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
