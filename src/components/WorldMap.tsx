"use client";

import { useMemo, useSyncExternalStore } from "react";
import { createMap } from "svg-dotted-map";
import { cx } from "@/lib/cx";

/**
 * Adapted from Magic UI's DottedMap (MIT).
 *
 * The point generator (`svg-dotted-map`) is kept — it is deterministic, so
 * the server and the client render identical dots and hydration is safe.
 * Everything else is rebuilt: token colours instead of hard-coded greys,
 * a hand-drawn Kenya flag flying over Nairobi instead of a plain marker,
 * and the pulse only starts when motion is allowed (SMIL `<animate>` does
 * not respect prefers-reduced-motion on its own).
 */

const NAIROBI = { lat: -1.2921, lng: 36.8219 };

/** The Kenyan flag, from the canonical Wikimedia Commons file
 *  (`public/brand/kenya-flag.svg`, public domain). Drawn at 12×8 units with
 *  its top-left at (x, y) — the 3:2 ratio holds at any size. A soft shadow
 *  keeps the black band legible over the dark map. */
function KenyaFlag({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <image
        href="/brand/kenya-flag.svg"
        x={x}
        y={y}
        width={12}
        height={8}
        preserveAspectRatio="xMidYMid meet"
        style={{ filter: "drop-shadow(0 0.6px 1px rgb(0 0 0 / 0.35))" }}
      />
    </g>
  );
}

export function WorldMap({ className }: { className?: string }) {
  // Motion starts off and follows the media query through the store. The
  // server always renders the static frame, so there is never a hydration
  // mismatch for reduced-motion users.
  const motion = useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia("(prefers-reduced-motion: reduce)");
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );

  const { points, nairobi, xStep, yToRowIndex } = useMemo(() => {
    const { points, addMarkers } = createMap({
      width: 150,
      height: 75,
      mapSamples: 5000,
    });
    const [marker] = addMarkers([{ ...NAIROBI }]);

    // One pass over row-sorted points: the stagger offset and each row's
    // index, so alternate rows shift by half a step like the registry map.
    const sorted = [...points].sort((a, b) => a.y - b.y || a.x - b.x);
    const rowMap = new Map<number, number>();
    let step = 0;
    let prevY = Number.NaN;
    let prevX = Number.NaN;
    for (const p of sorted) {
      if (p.y !== prevY) {
        prevY = p.y;
        prevX = Number.NaN;
        if (!rowMap.has(p.y)) rowMap.set(p.y, rowMap.size);
      }
      if (!Number.isNaN(prevX)) {
        const delta = p.x - prevX;
        if (delta > 0) step = step === 0 ? delta : Math.min(step, delta);
      }
      prevX = p.x;
    }

    return { points, nairobi: marker, xStep: step || 1, yToRowIndex: rowMap };
  }, []);

  const flagX = nairobi.x - 6;
  // The flag flies just above the dot, its spears reaching down to it like
  // a pin pole. Any higher and the two read as unrelated marks.
  const flagY = nairobi.y - 11;

  return (
    <svg
      viewBox="0 0 150 75"
      role="img"
      aria-label="World map marking Nairobi, Kenya"
      className={cx("h-auto w-full text-border-strong", className)}
    >
      {points.map((point, index) => {
        const row = yToRowIndex.get(point.y) ?? 0;
        const dx = row % 2 === 1 ? xStep / 2 : 0;
        return (
          <circle
            key={`${point.x.toFixed(2)}-${point.y.toFixed(2)}-${index}`}
            cx={point.x + dx}
            cy={point.y}
            r={0.28}
            fill="currentColor"
          />
        );
      })}

      <KenyaFlag x={flagX} y={flagY} />
      <text
        x={nairobi.x}
        y={flagY - 1.8}
        textAnchor="middle"
        fontSize={3.4}
        letterSpacing={0.8}
        fill="currentColor"
        className="font-mono uppercase"
      >
        Nairobi
      </text>

      <circle cx={nairobi.x} cy={nairobi.y} r={1.1} fill="var(--red-vivid)" />
      {motion ? (
        <g pointerEvents="none">
          <circle
            cx={nairobi.x}
            cy={nairobi.y}
            r={1.1}
            fill="none"
            stroke="var(--red-vivid)"
            strokeWidth={0.35}
          >
            <animate
              attributeName="r"
              values="1.1;3.1"
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
            r={1.1}
            fill="none"
            stroke="var(--red-vivid)"
            strokeWidth={0.3}
          >
            <animate
              attributeName="r"
              values="1.1;3.1"
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
