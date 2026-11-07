import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

/**
 * Adapted from Magic UI's OrbitingCircles (MIT), dependency-free as shipped:
 * the motion is pure CSS. Each child rides `--radius` around the centre,
 * starting at its own `--angle`, and counter-rotates so pills stay upright.
 *
 * `radius` accepts any CSS length — pass `cqw` units against a
 * `[container-type:inline-size]` ancestor and the whole system scales.
 * The base transform equals the animation's first frame, so under reduced
 * motion (where the animation is off) the items rest distributed on the
 * circle instead of piling at the centre.
 */
export function OrbitingCircles({
  children,
  radius,
  duration = 24,
  reverse = false,
  delay = 0,
  className,
}: {
  children: ReactNode[];
  /** Orbit radius, e.g. `"160px"` or `"34cqw"`. */
  radius: string;
  /** Seconds per revolution. */
  duration?: number;
  reverse?: boolean;
  /** Negative offsets distribute sibling rings. */
  delay?: number;
  className?: string;
}) {
  const count = children.length;

  return (
    <>
      {children.map((child, index) => {
        const angle = (360 / count) * index;
        return (
          <div
            key={index}
            aria-hidden="true"
            style={
              {
                "--orbit-radius": radius,
                "--orbit-angle": `${angle}deg`,
                "--orbit-duration": `${duration}s`,
                "--orbit-delay": `${-delay}s`,
              } as React.CSSProperties
            }
            className={cx(
              "orbit-child absolute left-1/2 top-1/2",
              reverse && "orbit-reverse",
              className,
            )}
          >
            {child}
          </div>
        );
      })}
    </>
  );
}
