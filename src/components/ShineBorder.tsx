import type { CSSProperties, ReactNode } from "react";
import { cx } from "@/lib/cx";

/**
 * Adapted from Magic UI's ShineBorder (MIT), reduced to the part that earns
 * its keep here: a single conic highlight travelling around a 1px ring. It is
 * CSS only — no `motion` dependency — and stops under reduced motion.
 */
export function ShineBorder({
  children,
  className,
  duration = 14,
}: {
  children: ReactNode;
  className?: string;
  /** Seconds for one full revolution. */
  duration?: number;
}) {
  return (
    <div
      className={cx("shine-border", className)}
      style={{ "--shine-duration": `${duration}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}
