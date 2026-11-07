import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "@/lib/cx";

/**
 * Adapted from Magic UI's Marquee (MIT). Two changes from the registry
 * source, both deliberate:
 *
 *  - It uses our own class joiner, so the project does not need clsx and
 *    tailwind-merge for a 30-line component.
 *  - Vertical mode is dropped. It is unused here, and dead props rot.
 *
 * Motion is CSS only, so no animation runtime is added. Under
 * prefers-reduced-motion the stylesheet turns this into a static wrapped
 * list and hides the duplicate tracks.
 */
interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /** Pause when the pointer is over the strip. */
  pauseOnHover?: boolean;
  /** Travel right-to-left instead of left-to-right. */
  reverse?: boolean;
  /** How many copies of the children to render. */
  repeat?: number;
  children: ReactNode;
}

export function Marquee({
  className,
  pauseOnHover = false,
  reverse = false,
  repeat = 4,
  children,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cx(
        "marquee flex overflow-hidden",
        pauseOnHover && "marquee-pause-on-hover",
        className,
      )}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          // The copies exist only for the loop; announcing them would read the
          // same list four times.
          aria-hidden={i > 0 ? true : undefined}
          className={cx(
            "marquee-track flex shrink-0 items-center justify-around",
            reverse && "marquee-reverse",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
