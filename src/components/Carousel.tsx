"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { cx } from "@/lib/cx";

/**
 * A small carousel with no animation library: screens cross-fade with a CSS
 * transition and advance on a timer. Screens share one grid cell, so the
 * viewport is always as tall as the tallest screen — no measuring, no jumps,
 * no clipping.
 *
 * Auto-advance never starts under prefers-reduced-motion; the dots still
 * switch screens instantly. It also pauses while hovered or focused (so it
 * never moves under a reader) and while the tab is hidden.
 */
export function Carousel({
  label,
  screens,
  intervalMs = 6000,
  className,
}: {
  /** Announced as the carousel's name, e.g. "Studio highlights". */
  label: string;
  screens: readonly ReactNode[];
  /** Ms between automatic advances. */
  intervalMs?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const timer = useRef<number | null>(null);
  const count = screens.length;

  const stop = useCallback(() => {
    if (timer.current !== null) {
      window.clearInterval(timer.current);
      timer.current = null;
    }
  }, []);

  const start = useCallback(() => {
    stop();
    if (count < 2) return;
    timer.current = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, intervalMs);
  }, [count, intervalMs, stop]);

  useEffect(() => {
    if (
      count < 2 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    start();
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [count, start, stop]);

  return (
    <div className={className}>
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        onMouseEnter={stop}
        onMouseLeave={start}
        onFocus={stop}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) start();
        }}
      >
        <div className="grid">
          {screens.map((screen, i) => (
            <div
              key={i}
              className="carousel-screen"
              data-active={i === index}
              aria-hidden={i === index ? undefined : true}
            >
              {screen}
            </div>
          ))}
        </div>
      </div>

      {count > 1 ? (
        <div className="flex items-center justify-center gap-1 pt-2">
          {screens.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setIndex(i);
                start();
              }}
              aria-label={`Show ${label} screen ${i + 1} of ${count}`}
              aria-current={i === index}
              className="flex h-10 w-7 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
            >
              <span
                aria-hidden="true"
                className={cx(
                  "h-1.5 rounded-full transition-all",
                  i === index ? "w-5 bg-blue-fill" : "w-1.5 bg-border-strong",
                )}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
