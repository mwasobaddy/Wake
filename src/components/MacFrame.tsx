import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

/**
 * A desktop monitor frame. There is no Mac in the Magic UI registry, so this
 * is drawn to match the adapted Safari and iPhone: divs, token colours, no
 * fixed-aspect SVG. The bezel stays near-black in both themes, like real
 * hardware; the screen area holds whatever is passed in.
 */
export function MacFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("w-full", className)}>
      <div className="rounded-[20px] border border-border bg-[#0b1220] p-2.5 shadow-[0_1px_2px_rgb(15_23_42/0.05),0_16px_40px_rgb(15_23_42/0.12)]">
        <div className="overflow-hidden rounded-[12px]">{children}</div>
      </div>
      <div aria-hidden="true" className="mx-auto h-9 w-16">
        <div
          className="h-full w-full bg-border-strong"
          style={{ clipPath: "polygon(12% 0, 88% 0, 100% 100%, 0% 100%)" }}
        />
      </div>
      <div
        aria-hidden="true"
        className="mx-auto h-2 w-44 rounded-[50%] bg-border-strong"
      />
    </div>
  );
}
