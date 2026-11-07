"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { BorderBeam } from "./BorderBeam";
import { Mark } from "./Mark";
import { Marquee } from "./Marquee";
import { MorphingText } from "./MorphingText";
import { Carousel } from "./Carousel";
import { TerminalScreen } from "./TerminalScreen";
import { IPhone } from "./IPhone";
import { ServiceIcon, type ServiceIconName } from "./ServiceIcons";
import { FlickeringGrid } from "./FlickeringGrid";
import { site } from "@/data/site";

const HEADLINE_START = ["We", "build", "software"];
/** Each tail completes "We build software …"; the first is also the no-JS text. */
const HEADLINE_TAIL = [
  "that has to work.",
  "that ships.",
  "that holds up.",
  "that scales.",
];

function NairobiTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Africa/Nairobi",
    });
    const update = () => setTime(format.format(new Date()));
    update();
    const timer = window.setInterval(update, 30000);
    return () => window.clearInterval(timer);
  }, []);

  // Blank until mounted: the server cannot know the reader's clock, so it
  // renders nothing rather than a wrong time that hydration must correct.
  if (!time) return null;
  return <>{time} EAT</>;
}

export function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const deviceRef = useRef<HTMLDivElement | null>(null);
  const [screen, setScreen] = useState(0);

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

    // Anime.js owns one thing only: the idle float of the device mockup.
    // GSAP owns the entrance, so the two never touch the same property —
    // GSAP animates the panel wrapper in, Anime.js floats the device itself.
    import("animejs").then(({ animate }) => {
      if (cancelled || !deviceRef.current) return;
      animation = animate(deviceRef.current, {
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
              {HEADLINE_START.map((word, i) => (
                <span
                  key={`${word}-${i}`}
                  className="inline-block overflow-hidden pb-2 align-bottom"
                >
                  <span className="hero-word inline-block">
                    {word}
                    {"\u00A0"}
                  </span>
                </span>
              ))}
              <span className="inline-block overflow-hidden pb-2 align-bottom">
                <MorphingText
                  texts={HEADLINE_TAIL}
                  mark
                  className="hero-word text-blue-text"
                />
              </span>
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
            <div ref={deviceRef} className="flex justify-center">
              <IPhone className="w-[270px]">
                <BorderBeam delay={0.5} />
                <Carousel
                  label="Studio highlights"
                  onChange={setScreen}
                  screens={[
                    <div key="story" className="px-4 pb-2 pt-12">
                      <div className="flex items-center gap-2.5">
                        <Mark height={26} cutsId="hero-phone" />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold tracking-tight text-ink">
                            Xeraki
                          </p>
                          <p className="truncate text-[11px] text-muted">
                            Product engineering studio
                          </p>
                        </div>
                        <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-2 py-0.5 text-[10px] font-medium text-muted">
                          <span className="live-dot size-1.5 rounded-full bg-red-vivid" />
                          Live
                        </span>
                      </div>

                      <p className="mt-4 text-balance text-lg font-semibold leading-snug tracking-tight text-ink">
                        One senior engineer. Full product coverage.
                      </p>
                      <p className="mt-2 text-[13px] leading-relaxed text-muted">
                        Embedded with your team from design to deploy —
                        augmented by AI, accountable throughout.
                      </p>

                      <dl className="mt-4 space-y-3 border-t border-border pt-4">
                        {site.studioFacts.map((fact) => (
                          <div
                            key={fact.label}
                            className="flex items-baseline justify-between gap-3"
                          >
                            <dt className="shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                              {fact.label}
                            </dt>
                            <dd className="text-right text-[13px] font-medium text-ink">
                              {fact.value}
                            </dd>
                          </div>
                        ))}
                      </dl>

                      <div
                        aria-hidden="true"
                        className="mt-4 rounded-control bg-code-bg p-3 font-mono text-[11px] leading-relaxed text-code-text"
                      >
                        <p>
                          <span className="text-term-prompt">$</span> xeraki
                          ship --prod
                        </p>
                        <p>
                          <span className="text-term-prompt">✓</span> build
                          passed — 4.2s
                        </p>
                        <p>
                          <span className="text-term-prompt">●</span> live —
                          Nairobi · Remote
                        </p>
                      </div>
                    </div>,
                    <div key="profile" className="px-4 pb-2 pt-12 text-center">
                      <div className="overflow-hidden rounded-2xl bg-blue-tint-subtle ring-1 ring-border">
                        <img
                          src="/brand/kelvin.svg"
                          alt="Kelvin Ramsiel, founder of Xeraki"
                          width={476}
                          height={595}
                          className="aspect-[4/5] w-full object-cover object-top"
                        />
                      </div>
                      <p className="mt-4 text-lg font-semibold tracking-tight text-ink">
                        Kelvin Ramsiel
                      </p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                        Founder &amp; lead engineer
                      </p>
                      <p className="mx-auto mt-2 max-w-[210px] text-balance text-[13px] leading-relaxed text-muted">
                        I take platforms from an empty repo to production.
                      </p>
                      <ul
                        aria-label="Specialties"
                        className="mt-3 flex flex-wrap justify-center gap-1.5"
                      >
                        {["Laravel", "Next.js", "React Native", "APIs", "AI", "M-Pesa"].map(
                          (skill) => (
                            <li
                              key={skill}
                              className="rounded-full bg-sunken px-2.5 py-1 text-[11px] font-medium text-muted"
                            >
                              {skill}
                            </li>
                          ),
                        )}
                      </ul>
                      <p className="mt-3 inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-[10px] font-medium text-muted">
                        <span className="live-dot size-1.5 rounded-full bg-red-vivid" />
                        Open for work
                        <span aria-hidden="true">·</span>
                        Nairobi <NairobiTime />
                      </p>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <a
                          href={`mailto:${site.contact.email}`}
                          className="inline-flex h-10 items-center justify-center rounded-pill border border-amber-border bg-amber-fill px-3 text-xs font-semibold text-on-amber focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
                        >
                          Email
                        </a>
                        <a
                          href={`tel:${site.contact.phoneHref}`}
                          className="inline-flex h-10 items-center justify-center rounded-pill border border-blue-fill px-3 text-xs font-semibold text-blue-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
                        >
                          Call
                        </a>
                      </div>
                    </div>,
                    <div key="services" className="px-4 pb-2 pt-12">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                        What we do
                      </p>
                      <ul className="mt-3 space-y-1">
                        {site.services.map((service) => (
                          <li key={service.title}>
                            <Link
                              href="/#services"
                              className="flex items-center gap-2.5 rounded-control px-2 py-2 text-[13px] font-medium text-ink transition-colors hover:bg-sunken focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
                            >
                              <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-control bg-blue-tint text-on-blue-tint">
                                <ServiceIcon
                                  name={service.icon as ServiceIconName}
                                />
                              </span>
                              {service.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>,
                    <div key="contact" className="px-4 pb-2 pt-12">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                        Get started
                      </p>
                      <p className="mt-3 text-balance text-lg font-semibold leading-snug tracking-tight text-ink">
                        Bring us the problem.
                      </p>
                      <p className="mt-2 text-[13px] leading-relaxed text-muted">
                        A short note is enough — we will ask the rest.
                      </p>
                      <div className="mt-4 space-y-2">
                        <a
                          href={`mailto:${site.contact.email}`}
                          className="flex h-11 items-center justify-center rounded-pill border border-amber-border bg-amber-fill px-4 text-[13px] font-semibold text-on-amber focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
                        >
                          Email us
                        </a>
                        <a
                          href={`tel:${site.contact.phoneHref}`}
                          className="flex h-11 items-center justify-center rounded-pill border border-blue-fill px-4 text-[13px] font-semibold text-blue-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
                        >
                          Call {site.contact.phoneDisplay}
                        </a>
                      </div>
                      <p className="mt-4 border-t border-border pt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                        {site.contact.location}
                      </p>
                    </div>,
                    <TerminalScreen key="setup" active={screen === 3} />,
                  ]}
                />
              </IPhone>
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
