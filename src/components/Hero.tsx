import { site } from "@/data/site";
import { count, categories } from "@/data/projects";
import { ArrowDownIcon, ArrowUpRightIcon, DownloadIcon } from "@/components/icons";
import WakeSunrise from "@/components/WakeSunrise";
import Reveal from "@/components/Reveal";

export default function Hero() {
  const techCount = site.skills.reduce((n, g) => n + g.items.length, 0);

  const stats = [
    { value: `${count}+`, label: "Projects shipped" },
    { value: String(categories.length - 1), label: "Domains explored" },
    { value: `${techCount}+`, label: "Technologies in rotation" },
  ];

  return (
    <section id="top" className="relative isolate overflow-hidden">
      <div className="grid-lines absolute inset-0" />
      <div className="sun-glow absolute inset-0" />

      <WakeSunrise
        prefix="hero"
        aria-hidden
        className="pointer-events-none absolute right-0 top-24 hidden w-[min(40vw,460px)] lg:block"
      />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 pb-16 pt-36">
        <Reveal>
          <div className="mb-10 flex items-center gap-4">
            <WakeSunrise prefix="mark" className="h-10 w-16" />
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/50">
              {`// ${site.owner} — full-stack engineer, ${site.location}`}
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="text-[clamp(4.5rem,16vw,14rem)] font-bold leading-none tracking-tighter">
            Wake<span className="text-wake">.</span>
          </h1>
        </Reveal>

        <Reveal delay={150}>
          <p className="mt-8 max-w-2xl font-medium leading-snug sm:text-2xl">
            I build digital products at{" "}
            <span className="rise">full intensity</span> — SaaS, mobile, and AI,
            from first commit to production.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-10 max-w-xl">
            <p className="text-sm leading-relaxed text-white/60">{site.tagline}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 bg-wake px-5 py-3 font-mono text-xs font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ember"
              >
                Browse the catalogue
                <ArrowDownIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
              </a>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 border border-line px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-white/80 transition-colors hover:border-wake hover:text-wake"
              >
                GitHub
                <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href={site.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 border border-line px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-white/80 transition-colors hover:border-wake hover:text-wake"
              >
                View CV
                <DownloadIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-16 grid grid-cols-3 divide-x divide-line border-y border-line">
            {stats.map((stat) => (
              <div key={stat.label} className="px-6 py-5 first:pl-0">
                <p className="font-bold text-wake">{stat.value}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}