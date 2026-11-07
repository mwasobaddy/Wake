"use client";

import { useMemo, useSyncExternalStore } from "react";
import { KENYA_BOUNDARY } from "@/data/kenya-boundary";
import { cx } from "@/lib/cx";

/**
 * A dotted Kenya plotted from real boundary geometry (Natural Earth 50m,
 * public domain) instead of an image. Dots come from a deterministic grid
 * tested against the polygons, so the server and the client render identical
 * output and hydration is safe. Nairobi carries the same hand-drawn flag and
 * motion-gated pulse as the world map did.
 */

const NAIROBI = { lat: -1.2921, lng: 36.8219 };
const PAD = 0.6;
const STEP = 0.17;

function bounds() {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const poly of KENYA_BOUNDARY) {
    for (const ring of poly) {
      for (const [x, y] of ring) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  return { minX, minY, maxX, maxY };
}

/** Even-odd containment across every ring. Islands count; holes cut out. */
function inside(lng: number, lat: number) {
  let count = 0;
  for (const poly of KENYA_BOUNDARY) {
    for (const ring of poly) {
      let hit = false;
      for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        const [xi, yi] = ring[i];
        const [xj, yj] = ring[j];
        if (yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) {
          hit = !hit;
        }
      }
      if (hit) count++;
    }
  }
  return count % 2 === 1;
}

/** A simplified Kenyan flag: black/red/green with white fimbriation, Maasai
 *  shield and crossed spears. Drawn 8×5.4 units, top-left at (x, y). */
function KenyaFlag({ x, y }: { x: number; y: number }) {
  const cxp = x + 4;
  return (
    <g>
      <rect x={x} y={y} width={8} height={5.4} fill="#000000" />
      <rect x={x} y={y + 1.62} width={8} height={2.16} fill="#FFFFFF" />
      <rect x={x} y={y + 1.96} width={8} height={1.48} fill="#FF0000" />
      <rect x={x} y={y + 3.78} width={8} height={1.62} fill="#006600" />
      <line x1={cxp - 2.3} y1={y - 1.5} x2={cxp + 2.3} y2={y + 6.9} stroke="#FFFFFF" strokeWidth={0.3} />
      <line x1={cxp + 2.3} y1={y - 1.5} x2={cxp - 2.3} y2={y + 6.9} stroke="#FFFFFF" strokeWidth={0.3} />
      <ellipse cx={cxp} cy={y + 2.7} rx={1.4} ry={2.2} fill="#922529" />
      <ellipse cx={cxp} cy={y + 2.7} rx={1.4} ry={2.2} fill="none" stroke="#FFFFFF" strokeWidth={0.24} />
      <ellipse cx={cxp} cy={y + 2.7} rx={0.6} ry={1.05} fill="#FFFFFF" />
    </g>
  );
}

export function KenyaMap({ className }: { className?: string }) {
  // Same motion gate as the theme toggle: the server renders the static
  // frame, and SMIL pulse nodes only exist when motion is allowed.
  const motion = useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia("(prefers-reduced-motion: reduce)");
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );

  const { dots, nairobi, view } = useMemo(() => {
    const { minX, minY, maxX, maxY } = bounds();
    const w = maxX - minX + PAD * 2;
    const h = maxY - minY + PAD * 2;
    const scale = 100 / w;
    const W = 100;
    const H = h * scale;
    const px = (lng: number) => (lng - (minX - PAD)) * scale;
    const py = (lat: number) => H - (lat - (minY - PAD)) * scale;

    const list: Array<{ x: number; y: number; row: number }> = [];
    let row = 0;
    for (let lat = minY - PAD; lat <= maxY + PAD; lat += STEP, row++) {
      const offset = row % 2 === 1 ? STEP / 2 : 0;
      for (let lng = minX - PAD + offset; lng <= maxX + PAD; lng += STEP) {
        if (inside(lng, lat)) list.push({ x: px(lng), y: py(lat), row });
      }
    }

    return {
      dots: list,
      nairobi: { x: px(NAIROBI.lng), y: py(NAIROBI.lat) },
      view: `0 0 ${W.toFixed(2)} ${H.toFixed(2)}`,
    };
  }, []);

  const flagX = nairobi.x - 4;
  const flagY = nairobi.y - 8.2;

  return (
    <svg
      viewBox={view}
      role="img"
      aria-label="Dotted map of Kenya marking Nairobi"
      className={cx("h-auto w-full text-border-strong", className)}
    >
      {dots.map((dot, index) => (
        <circle
          key={`${dot.x.toFixed(2)}-${dot.y.toFixed(2)}-${index}`}
          cx={+dot.x.toFixed(2)}
          cy={+dot.y.toFixed(2)}
          r={0.32}
          fill="currentColor"
        />
      ))}

      <KenyaFlag x={+flagX.toFixed(2)} y={+flagY.toFixed(2)} />
      <text
        x={+nairobi.x.toFixed(2)}
        y={+(flagY - 3.4).toFixed(2)}
        textAnchor="middle"
        fontSize={2.7}
        letterSpacing={0.6}
        fill="currentColor"
        className="font-mono uppercase"
      >
        Nairobi
      </text>

      <circle cx={nairobi.x} cy={nairobi.y} r={0.9} fill="var(--red-vivid)" />
      {motion ? (
        <g pointerEvents="none">
          <circle
            cx={nairobi.x}
            cy={nairobi.y}
            r={0.9}
            fill="none"
            stroke="var(--red-vivid)"
            strokeWidth={0.28}
          >
            <animate
              attributeName="r"
              values="0.9;2.6"
              dur="1.6s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="1;0"
              dur="1.6s"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx={nairobi.x}
            cy={nairobi.y}
            r={0.9}
            fill="none"
            stroke="var(--red-vivid)"
            strokeWidth={0.24}
          >
            <animate
              attributeName="r"
              values="0.9;2.6"
              dur="1.6s"
              begin="0.8s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.9;0"
              dur="1.6s"
              begin="0.8s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      ) : null}
    </svg>
  );
}
