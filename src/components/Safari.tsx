import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

/**
 * Adapted from Magic UI's Safari (MIT), rebuilt rather than copied.
 *
 * The registry source draws the whole window as a fixed-aspect SVG with
 * hard-coded greys, which cannot follow the theme and cannot hold responsive
 * children. This version keeps the recognisable chrome — traffic lights, URL
 * pill, rounded window — but builds it from divs so every colour is a token
 * and the screen area holds real, responsive content.
 *
 * The traffic lights use the brand triad (red / amber / cobalt) instead of
 * the stock red-yellow-green. They are decorative.
 */
export function Safari({
  url,
  children,
  className,
}: {
  /** Shown in the address pill. Decorative; the chrome is aria-hidden. */
  url: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "overflow-hidden rounded-panel border border-border bg-surface shadow-[0_1px_2px_rgb(15_23_42/0.05),0_12px_32px_rgb(15_23_42/0.07)]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="flex items-center gap-3 border-b border-border bg-raised px-4 py-3"
      >
        <span className="flex shrink-0 items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-red-vivid" />
          <span className="size-2.5 rounded-full bg-amber-fill" />
          <span className="size-2.5 rounded-full bg-blue-fill" />
        </span>
        <span className="flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full bg-sunken px-3 py-1 text-xs text-muted">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="size-3 shrink-0"
          >
            <rect
              x="5"
              y="10"
              width="14"
              height="10"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M8 10V7a4 4 0 0 1 8 0v3"
              stroke="currentColor"
              strokeWidth="1.8"
            />
          </svg>
          <span className="truncate font-mono text-[11px]">{url}</span>
        </span>
        <span className="w-[42px] shrink-0" />
      </div>
      <div>{children}</div>
    </div>
  );
}
