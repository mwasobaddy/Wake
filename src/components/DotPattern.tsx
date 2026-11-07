import { cx } from "@/lib/cx";

/**
 * Adapted from Magic UI's DotPattern (MIT), reduced to a static SVG pattern.
 * The registry version depends on `motion` for an optional glow; the glow is
 * not worth an animation runtime here, and a pattern element is cheaper than
 * generating one circle per dot.
 *
 * `id` must be unique per instance: two patterns with the same id collide.
 */
export function DotPattern({
  id,
  className,
  size = 24,
  dot = 1,
}: {
  id: string;
  className?: string;
  /** Spacing between dots, in px. */
  size?: number;
  /** Dot radius, in px. */
  dot?: number;
}) {
  const patternId = `${id}-pattern`;
  const fadeId = `${id}-fade`;
  const maskId = `${id}-mask`;

  return (
    <svg
      aria-hidden="true"
      className={cx(
        "pointer-events-none absolute inset-0 h-full w-full text-border-strong",
        className,
      )}
    >
      <defs>
        <pattern
          id={patternId}
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
        >
          <circle cx={dot} cy={dot} r={dot} fill="currentColor" />
        </pattern>
        <radialGradient id={fadeId} cx="50%" cy="0%" r="78%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id={maskId}>
          <rect width="100%" height="100%" fill={`url(#${fadeId})`} />
        </mask>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill={`url(#${patternId})`}
        mask={`url(#${maskId})`}
      />
    </svg>
  );
}
