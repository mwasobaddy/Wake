"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cx } from "@/lib/cx";

/**
 * The transferable half of React Bits' ReflectiveCard: tilt toward the
 * cursor with a specular highlight that follows it. The other half — a
 * WebGL metal plate that optionally reflects the user's webcam — stays out
 * on purpose: six service cards do not need six GL contexts, and a services
 * grid must never ask for camera permission.
 *
 * Fine pointers with motion allowed get the tilt; everyone else gets a
 * static card. The highlight itself is hover CSS, so it still appears for
 * reduced-motion users without moving.
 */
export function TiltCard({
  children,
  className,
  maxTilt = 7,
}: {
  children: ReactNode;
  className?: string;
  /** Maximum tilt in degrees at the card edge. */
  maxTilt?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = element.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        element.style.setProperty("--tilt-rx", `${((0.5 - py) * maxTilt * 2).toFixed(2)}deg`);
        element.style.setProperty("--tilt-ry", `${((px - 0.5) * maxTilt * 2).toFixed(2)}deg`);
        element.style.setProperty("--tilt-gx", `${(px * 100).toFixed(1)}%`);
        element.style.setProperty("--tilt-gy", `${(py * 100).toFixed(1)}%`);
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      element.style.setProperty("--tilt-rx", "0deg");
      element.style.setProperty("--tilt-ry", "0deg");
    };

    element.addEventListener("pointermove", onMove);
    element.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      element.removeEventListener("pointermove", onMove);
      element.removeEventListener("pointerleave", onLeave);
    };
  }, [maxTilt]);

  return (
    <div ref={ref} className={cx("tilt-card", className)}>
      {children}
      <div aria-hidden="true" className="tilt-glare" />
    </div>
  );
}
