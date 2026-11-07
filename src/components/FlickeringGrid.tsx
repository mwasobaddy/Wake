"use client";

import { useEffect, useMemo, useRef } from "react";
import { cx } from "@/lib/cx";
import { useTheme } from "@/lib/use-theme";

/**
 * Adapted from Magic UI's FlickeringGrid (MIT).
 *
 * Changes from the registry source, all for this page specifically:
 *  - Colour comes from the theme rather than a hard-coded rgb string, so the
 *    grid stays visible on the navy canvas.
 *  - Cells are larger and redraws are throttled to ~15fps. A 16px cell at 15fps
 *    is roughly 50k fills/second; the original 10px cell at 60fps is ten times
 *    that for an effect nobody can see at that resolution.
 *  - It draws one static frame and never starts the loop under
 *    prefers-reduced-motion.
 *  - The loop pauses when scrolled out of view.
 */
export function FlickeringGrid({
  className,
  squareSize = 2,
  gridGap = 14,
  flickerChance = 0.35,
  maxOpacity = 0.32,
}: {
  className?: string;
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  maxOpacity?: number;
}) {
  const theme = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const rgbaPrefix = useMemo(
    () => (theme === "dark" ? "rgba(124, 155, 255," : "rgba(47, 79, 224,"),
    [theme],
  );

  useEffect(() => {
    const canvasNode = canvasRef.current;
    const containerNode = containerRef.current;
    if (!canvasNode || !containerNode) return;

    const context = canvasNode.getContext("2d");
    if (!context) return;

    // Re-bind as explicitly non-null so the closures keep the narrowing.
    const canvas: HTMLCanvasElement = canvasNode;
    const container: HTMLDivElement = containerNode;
    const ctx: CanvasRenderingContext2D = context;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cols = 0;
    let rows = 0;
    let squares = new Float32Array(0);
    let raf = 0;
    let lastDraw = 0;
    let dpr = 1;
    let visible = true;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const opacity = squares[i * rows + j];
          if (opacity <= 0.001) continue;
          ctx.fillStyle = `${rgbaPrefix}${opacity})`;
          ctx.fillRect(
            i * (squareSize + gridGap) * dpr,
            j * (squareSize + gridGap) * dpr,
            squareSize * dpr,
            squareSize * dpr,
          );
        }
      }
    }

    function setup() {
      const width = container.clientWidth;
      const height = container.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, width * dpr);
      canvas.height = Math.max(1, height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      cols = Math.ceil(width / (squareSize + gridGap));
      rows = Math.ceil(height / (squareSize + gridGap));
      squares = new Float32Array(cols * rows);
      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * maxOpacity;
      }
      draw();
    }

    function tick(time: number) {
      if (!visible) {
        raf = 0;
        return;
      }
      // ~15fps is plenty for a background that is barely moving.
      if (time - lastDraw > 66) {
        const delta = Math.min((time - lastDraw) / 1000, 0.2);
        lastDraw = time;
        for (let i = 0; i < squares.length; i++) {
          if (Math.random() < flickerChance * delta) {
            squares[i] = Math.random() * maxOpacity;
          }
        }
        draw();
      }
      raf = requestAnimationFrame(tick);
    }

    setup();

    const resizeObserver = new ResizeObserver(setup);
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !raf && !reduce) {
          lastDraw = 0;
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(canvas);

    if (!reduce) raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [rgbaPrefix, squareSize, gridGap, flickerChance, maxOpacity]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cx("w-full", className)}
    >
      <canvas ref={canvasRef} className="pointer-events-none block" />
    </div>
  );
}
