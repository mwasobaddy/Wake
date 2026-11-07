"use client";

import { useEffect, useRef } from "react";

/**
 * Adapted from Magic UI's Pointer (MIT), with the `motion` dependency
 * removed: a rAF loop lerps a dot and a trailing ring toward the cursor.
 *
 * Render as a direct child of the area it should cover; it follows the mouse
 * within its parent and hides the native cursor there. Scoped to fine
 * pointers with motion allowed — touch and reduced-motion users never see
 * it, and the native cursor stays untouched for them.
 */
export function Pointer() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const parent = dot?.parentElement ?? null;
    if (!dot || !ring || !parent) return;

    let targetX = -100;
    let targetY = -100;
    let dotX = targetX;
    let dotY = targetY;
    let ringX = targetX;
    let ringY = targetY;
    let visible = false;
    let running = false;
    let raf = 0;

    const render = () => {
      dotX += (targetX - dotX) * 0.35;
      dotY += (targetY - dotY) * 0.35;
      ringX += (targetX - ringX) * 0.16;
      ringY += (targetY - ringY) * 0.16;
      dot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      if (running) raf = requestAnimationFrame(render);
    };

    const show = () => {
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
      if (!running) {
        running = true;
        raf = requestAnimationFrame(render);
      }
    };

    const hide = () => {
      visible = false;
      running = false;
      cancelAnimationFrame(raf);
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      show();
    };

    parent.style.cursor = "none";
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", hide);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      parent.style.cursor = "";
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", hide);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-50 size-8 rounded-full border-2 border-amber-fill opacity-0"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-50 size-2 rounded-full bg-blue-fill opacity-0"
      />
    </>
  );
}
