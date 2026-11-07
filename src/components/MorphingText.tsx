"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cx } from "@/lib/cx";

/**
 * Adapted from Magic UI's MorphingText (MIT).
 *
 * Two departures from the registry source, both load-bearing here:
 *
 *  - The spans render real text (`texts[0]`, and `texts[1]` hidden) instead of
 *    empty elements filled in by the loop. A headline must read as a complete
 *    sentence in the server HTML and with JavaScript disabled.
 *  - The gooey filter and the rAF loop only start when motion is allowed.
 *    Under prefers-reduced-motion the first phrase sits static with no
 *    filter, and the alternate phrase stays hidden.
 */
const MORPH_TIME = 1.5;
const COOLDOWN_TIME = 2.4;

export function MorphingText({
  texts,
  className,
  mark = false,
}: {
  texts: readonly string[];
  className?: string;
  /**
   * Draws a marker wash behind the words, once, shortly after mount.
   * The wash is static CSS on the width-reserved container, so it survives
   * the word cycling underneath it and stays put under reduced motion.
   */
  mark?: boolean;
}) {
  const filterId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const text1Ref = useRef<HTMLSpanElement | null>(null);
  const text2Ref = useRef<HTMLSpanElement | null>(null);
  const [active, setActive] = useState(false);

  // Reserves the width of the longest phrase so the line never reflows as
  // the words cycle. Hidden from assistive technology; the live span below
  // carries the text.
  const sizer = texts.reduce((a, b) => (a.length >= b.length ? a : b), texts[0] ?? "");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const text1 = text1Ref.current;
    const text2 = text2Ref.current;
    if (!text1 || !text2 || texts.length < 2) return;

    setActive(true);

    let index = 0;
    let morph = 0;
    let cooldown = COOLDOWN_TIME;
    let last = performance.now();
    let raf = 0;

    const setStyles = (fraction: number) => {
      text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      const inverted = 1 - fraction;
      text1.style.filter = `blur(${Math.min(8 / inverted - 8, 100)}px)`;
      text1.style.opacity = `${Math.pow(inverted, 0.4) * 100}%`;

      text1.textContent = texts[index % texts.length];
      text2.textContent = texts[(index + 1) % texts.length];
    };

    const doCooldown = () => {
      morph = 0;
      text2.style.filter = "none";
      text2.style.opacity = "100%";
      text1.style.filter = "none";
      text1.style.opacity = "0%";
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      cooldown -= dt;

      if (cooldown <= 0) {
        morph -= cooldown;
        cooldown = 0;
        let fraction = morph / MORPH_TIME;
        if (fraction > 1) {
          cooldown = COOLDOWN_TIME;
          fraction = 1;
        }
        setStyles(fraction);
        if (fraction === 1) index++;
      } else {
        doCooldown();
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [texts]);

  return (
    <>
      {/* The wash sits on the outer box, outside the gooey filter: the
          threshold filter binarises alpha, so anything translucent inside it
          (including a marker wash) would vanish the moment it activates. */}
      <span
        className={cx(
          "relative inline-block h-[1em] align-bottom",
          mark && "morph-mark",
          className,
        )}
      >
        <span
          className="relative block h-full w-full"
          style={
            active ? { filter: `url(#${filterId}) blur(0.6px)` } : undefined
          }
        >
          <span aria-hidden="true" className="invisible whitespace-nowrap">
            {sizer}
          </span>
          <span ref={text1Ref} className="absolute inset-0 whitespace-nowrap">
            {texts[0]}
          </span>
          <span
            ref={text2Ref}
            aria-hidden="true"
            className="absolute inset-0 whitespace-nowrap opacity-0"
          >
            {texts[1] ?? texts[0]}
          </span>
        </span>
      </span>
      <svg aria-hidden="true" className="fixed h-0 w-0">
        <defs>
          <filter id={filterId}>
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
}
