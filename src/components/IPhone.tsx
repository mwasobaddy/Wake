import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

/**
 * Adapted from Magic UI's iPhone (MIT), rebuilt rather than copied.
 *
 * The registry source is a fixed-aspect SVG with hard-coded greys, which
 * cannot follow the theme or hold responsive children. This keeps the
 * recognisable shape — rounded body, Dynamic Island, home indicator — as
 * divs in token colours, with the screen area holding real content.
 *
 * Width comes from the caller. With `proportional`, the frame also keeps the
 * real iPhone ratio (433:882) and the screen stretches full height, so the
 * content root should be `flex min-h-0 flex-1 flex-col` with the footer on
 * `mt-auto`. Without it, the phone is exactly as tall as its content.
 */
export function IPhone({
  children,
  className,
  proportional = false,
}: {
  children: ReactNode;
  className?: string;
  proportional?: boolean;
}) {
  return (
    <div
      className={cx(
        "relative rounded-[3rem] border border-border bg-[#0b1220] p-2.5 shadow-[0_1px_2px_rgb(15_23_42/0.05),0_16px_40px_rgb(15_23_42/0.12)]",
        proportional && "aspect-[433/882]",
        className,
      )}
    >
      <div
        className={cx(
          "relative overflow-hidden rounded-[2.4rem] bg-surface",
          proportional && "flex h-full flex-col",
        )}
      >
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-2.5 z-10 h-[22px] w-24 -translate-x-1/2 rounded-full bg-black"
        />
        {children}
        <div aria-hidden="true" className="flex justify-center pb-2 pt-1">
          <span className="h-1 w-24 rounded-full bg-border-strong" />
        </div>
      </div>
    </div>
  );
}
