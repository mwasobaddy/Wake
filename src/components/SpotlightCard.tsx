"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { cx } from "@/lib/cx";

/**
 * Adapted from React Bits' SpotlightCard (MIT + Commons Clause).
 *
 * The light follows the pointer and only appears on hover, so there is no
 * animation to disable for reduced motion — it is a static gradient whose
 * position is updated by the pointer, not a timeline.
 */
export function SpotlightCard({
  children,
  className,
  radius = 220,
}: {
  children: ReactNode;
  className?: string;
  /** Spotlight radius in px. */
  radius?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    element.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    element.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={cx("group/spotlight relative isolate overflow-hidden", className)}
      style={{ "--spot-radius": `${radius}px` } as CSSProperties}
    >
      {children}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100"
        style={{
          background:
            "radial-gradient(var(--spot-radius) circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in srgb, var(--blue-fill) 14%, transparent), transparent 72%)",
        }}
      />
    </div>
  );
}
