import type { CSSProperties } from "react";
import { cx } from "@/lib/cx";

/**
 * Adapted from Magic UI's BorderBeam (MIT), with the `motion` dependency
 * removed: the traveller rides a CSS `offset-path` rectangle and animates
 * `offset-distance` on keyframes, which needs no runtime at all.
 *
 * Place as a child of the positioned box it should ring (it aligns to
 * `inset-0` and inherits the radius). Pure decoration — hidden entirely
 * under reduced motion.
 */
export function BorderBeam({
  size = 60,
  duration = 7,
  delay = 0,
  reverse = false,
  className,
}: {
  /** Length of the light segment, in px. */
  size?: number;
  /** Seconds for one full lap. */
  duration?: number;
  /** Negative offsets distribute beams so siblings do not sync. */
  delay?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={cx("border-beam", className)}>
      <div
        className="border-beam-traveler"
        style={
          {
            width: size,
            offsetPath: `rect(0 auto auto 0 round ${size}px)`,
            "--beam-duration": `${duration}s`,
            "--beam-delay": `${-delay}s`,
            animationDirection: reverse ? "reverse" : undefined,
          } as CSSProperties
        }
      />
    </div>
  );
}
