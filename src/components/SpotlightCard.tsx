"use client";

import { useRef, type CSSProperties, type PointerEvent, type ReactNode } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

// Adapted from React Bits' SpotlightCard (TS-TW registry item). Two changes to
// suit this codebase: the pointer position is written to CSS custom properties
// rather than state, so travelling across the grid never re-renders a card, and
// all presentation is left to the caller so the site's own card styles win.
export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(255, 92, 0, 0.14)",
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const track = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spotlight-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spotlight-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={track}
      onPointerEnter={(e) => {
        e.currentTarget.dataset.spotlight = "on";
        track(e);
      }}
      onPointerLeave={(e) => {
        delete e.currentTarget.dataset.spotlight;
      }}
      className={`spotlight ${className}`}
      style={{ "--spotlight-color": spotlightColor } as CSSProperties}
    >
      {children}
    </div>
  );
}