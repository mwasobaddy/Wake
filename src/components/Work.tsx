import { Reveal } from "./Reveal";
import { BorderBeam } from "./BorderBeam";
import { SpotlightCard } from "./SpotlightCard";
import { Carousel } from "./Carousel";
import { IPhone } from "./IPhone";
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

        <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {site.work.map((project, index) => (
            <li key={project.title} className="flex justify-center">
              <Reveal delay={index * 60} className="w-full max-w-[290px]">
                <SpotlightCard className="rounded-[3rem]">
                  <IPhone proportional className="w-full">
                    <BorderBeam
                      size={80}
                      duration={8.5}
                      delay={0.7 + index * 1.5}
                    />
                    <div className="flex items-center justify-between gap-3 px-4 pt-12">
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                        {project.sector}
                      </span>
                      {project.placeholder ? (
                        <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-muted">
                          Sample
                        </span>
                      ) : null}
                    </div>

                    <Carousel
                      label={`${project.title} screens`}
                      className="flex min-h-0 flex-1 flex-col"
                      screens={[
                        <div key="overview" className="px-4 pb-2 pt-4">
                          <h3 className="text-lg font-semibold tracking-tight text-ink">
                            {project.title}
                          </h3>
                          <p className="mt-2 line-clamp-5 text-[13px] leading-relaxed text-muted">
                            {project.summary}
                          </p>

                          <ul className="mb-4 mt-4 flex flex-wrap gap-1.5">
                            {project.stack.map((item) => (
                              <li
                                key={item}
                                className="rounded-full bg-sunken px-2.5 py-1 text-[11px] font-medium text-muted"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>,
                        <div key="delivery" className="px-4 pb-2 pt-4">
                          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                            How it is delivered
                          </p>
                          <dl className="mt-3 space-y-3">
                            <div className="flex items-baseline justify-between gap-3">
                              <dt className="shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                                Team
                              </dt>
                              <dd className="text-right text-[13px] font-medium text-ink">
                                Solo senior + specialists
                              </dd>
                            </div>
                            <div className="flex items-baseline justify-between gap-3">
                              <dt className="shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                                Cadence
                              </dt>
                              <dd className="text-right text-[13px] font-medium text-ink">
                                Weekly working slices
                              </dd>
                            </div>
                            <div className="flex items-baseline justify-between gap-3">
                              <dt className="shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                                Handover
                              </dt>
                              <dd className="text-right text-[13px] font-medium text-ink">
                                Docs + runbooks
                              </dd>
                            </div>
                          </dl>
                        </div>,
                      ]}
                    />

                    <p className="mx-4 mb-2 border-t border-border pt-3 text-xs text-muted">
                      Case study in preparation
                    </p>
                  </IPhone>
                </SpotlightCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
