import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
}

export default function SectionHeading({
  index,
  eyebrow,
  title,
  children,
}: SectionHeadingProps) {
  return (
    <Reveal>
      <div className="mb-12 flex flex-col gap-6 border-b border-line pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-wake">
            <span className="text-white/30">{index}</span>
            <span className="h-px w-8 bg-wake/60" />
            {eyebrow}
          </p>
          <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            {title}
          </h2>
        </div>
        {children ? (
          <div className="max-w-md text-sm leading-relaxed text-white/50">
            {children}
          </div>
        ) : null}
      </div>
    </Reveal>
  );
}