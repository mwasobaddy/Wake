import type { CSSProperties } from "react";

type Tone = "auto" | "light" | "dark";

/**
 * The brand mark, inline.
 *
 * It has to be inline rather than an <img>: the anchor shape is ink on light
 * surfaces and amber on dark ones, and a static file cannot follow the theme.
 * The fills read CSS variables, so `[data-theme]` flips them with no JS.
 *
 * The seams are transparent via a mask, matching the exported SVGs. Each
 * instance needs its own mask id or the browser resolves every reference to
 * the first one in the document — harmless today, but it breaks the moment a
 * variant differs.
 */

const MARK_TRANSFORM = "translate(402.582792,-1.712294)";

type Shape =
  | { kind: "path"; d: string; transform?: string; width: number; fill: string }
  | {
      kind: "ellipse";
      cx: number;
      cy: number;
      rx: number;
      ry: number;
      transform: string;
      width: number;
      fill: string;
    };

const COBALT = "var(--mark-cobalt)";
const RED = "var(--mark-red)";
const ANCHOR = "var(--mark-anchor)";

const SHAPES: Shape[] = [
  {
    kind: "path",
    d: "M376.881,335.802L404,348.447L404,710.922L203.268,879.356L203,879.231L203,481.705L376.881,335.802Z",
    transform:
      "matrix(-0.906308,-0.422618,-0.422618,0.906308,1146.564275,313.937182)",
    width: 4.17,
    fill: RED,
  },
  {
    kind: "path",
    d: "M663.078,459L884,459L884,457.162L1304.701,1359.359C1265.637,1423.616 1223.264,1486.416 1176.452,1543.29L1170.077,1546.262L663.078,459Z",
    width: 4.17,
    fill: COBALT,
  },
  {
    kind: "path",
    d: "M203,935.055L203,183L404,183L404,510.597L203,935.055Z",
    transform:
      "matrix(0.906308,0.422618,0.167928,-0.360122,-235.776392,710.426982)",
    width: 5.48,
    fill: COBALT,
  },
  {
    kind: "path",
    d: "M105.226,459.484L105.452,459L326.779,459L590.709,1025L368.93,1025L105.226,459.484Z",
    width: 4.17,
    fill: ANCHOR,
  },
  {
    kind: "ellipse",
    cx: 399.5,
    cy: 1374.5,
    rx: 58.5,
    ry: 78.5,
    transform: "matrix(1.837607,0,0,1.369427,-449.623932,-392.77707)",
    width: 2.57,
    fill: COBALT,
  },
];

function ShapeNode({ shape, cut }: { shape: Shape; cut: boolean }) {
  // In the mask, black hides: stroking the outline is what creates the seam.
  const paint = cut
    ? { fill: "none", stroke: "#000", strokeWidth: shape.width }
    : { fill: shape.fill };

  const node =
    shape.kind === "path" ? (
      <path d={shape.d} {...paint} />
    ) : (
      <ellipse cx={shape.cx} cy={shape.cy} rx={shape.rx} ry={shape.ry} {...paint} />
    );

  return shape.transform ? <g transform={shape.transform}>{node}</g> : node;
}

export function Mark({
  height = 28,
  className,
  tone = "auto",
  cutsId = "default",
  title,
}: {
  /** Rendered height in px; the width follows the artwork ratio. */
  height?: number;
  className?: string;
  /** Force a tone when the surface does not follow the theme, e.g. the footer band. */
  tone?: Tone;
  /** Unique per instance; the mask id is derived from it. */
  cutsId?: string;
  /** Provide only when the mark is the sole label; omit when it sits beside the wordmark. */
  title?: string;
}) {
  const maskId = `mark-cuts-${cutsId}`;
  const width = Math.round((height * 1637) / 1263 * 100) / 100;
  const style =
    tone === "auto"
      ? undefined
      : ({
          "--mark-anchor": `var(--mark-anchor-${tone})`,
        } as CSSProperties);

  return (
    <svg
      viewBox="157 368 1637 1263"
      width={width}
      height={height}
      className={className}
      style={style}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <mask
          id={maskId}
          maskUnits="userSpaceOnUse"
          x="157"
          y="368"
          width="1637"
          height="1263"
        >
          <rect x="157" y="368" width="1637" height="1263" fill="#fff" />
          <g transform={MARK_TRANSFORM}>
            {SHAPES.map((shape, i) => (
              <ShapeNode key={i} shape={shape} cut />
            ))}
          </g>
        </mask>
      </defs>
      <g mask={`url(#${maskId})`}>
        <g transform={MARK_TRANSFORM}>
          {SHAPES.map((shape, i) => (
            <ShapeNode key={i} shape={shape} cut={false} />
          ))}
        </g>
      </g>
    </svg>
  );
}
