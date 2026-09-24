import { projects } from "@/data/projects";

export default function Ticker() {
  const words = Array.from(
    new Set(projects.flatMap((p) => p.stack)),
  );

  const run = [...words, ...words];

  return (
    <div className="relative overflow-hidden border-y border-line bg-coal/50 py-3">
      <div className="animate-marquee flex width-fit items-center gap-8 whitespace-nowrap">
        {run.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="flex items-center gap-8 font-mono text-xs uppercase tracking-[0.22em] text-white/50"
          >
            {word}
            <span className="text-wake">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}