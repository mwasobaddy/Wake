import { Reveal } from "./Reveal";
import { site } from "@/data/site";

export function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="border-t border-border bg-base"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              02 — Selected work
            </p>
            <h2
              id="work-heading"
              className="mt-4 text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl"
            >
              Platforms that had to <span className="text-blue-text">hold up</span>.
            </h2>
            <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted">
              A short selection of the kind of work we take on. These are
              illustrative placeholders — full case studies are in preparation.
            </p>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {site.work.map((project, index) => (
            <li key={project.title} className="h-full">
              <Reveal delay={index * 60} className="h-full">
                <article className="flex h-full flex-col rounded-card border border-border bg-surface p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                      {project.sector}
                    </span>
                    {project.placeholder ? (
                      <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-muted">
                        Sample
                      </span>
                    ) : null}
                  </div>

                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {project.summary}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {project.stack.map((item) => (
                      <li
                        key={item}
                        className="rounded-full bg-sunken px-2.5 py-1 text-[11px] font-medium text-muted"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-5 border-t border-border pt-4 text-xs text-muted">
                    Case study in preparation
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
