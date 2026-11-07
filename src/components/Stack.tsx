import { Reveal } from "./Reveal";
import { OrbitingCircles } from "./OrbitingCircles";
import { StackIcon } from "./StackIcons";
import { Mark } from "./Mark";
import { site } from "@/data/site";

export function Stack() {
  return (
    <section
      id="stack"
      aria-labelledby="stack-heading"
      className="border-t border-border bg-base"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                04 — Stack
              </p>
              <h2
                id="stack-heading"
                className="mt-4 text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl"
              >
                Counted across{" "}
                <span className="text-blue-text">
                  {site.shippedTotal} shipped projects
                </span>
                .
              </h2>
              <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted">
                Every orbit is a tool the studio has billed hours on, labelled
                with how many projects it carried. No badge collecting — if it
                is on the map, it has survived production.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={100}>
              {/* Orbits need ~560px to breathe; below sm the same data
                  renders as grouped lists instead of a clipped system. */}
              <div className="hidden sm:block">
                <div className="[container-type:inline-size]">
                  <div className="relative mx-auto aspect-square w-full max-w-[560px]">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 m-auto h-[74cqw] w-[74cqw] rounded-full border border-border"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 m-auto h-[44cqw] w-[44cqw] rounded-full border border-border"
                    />

                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center">
                      <Mark height={34} cutsId="stack" />
                      <p className="mt-2 text-4xl font-semibold tabular-nums tracking-tight text-ink">
                        {site.shippedTotal}
                      </p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                        projects
                      </p>
                    </div>

                    <OrbitingCircles radius="37cqw" duration={46} delay={3}>
                      {site.stackOuter.map((item) => (
                        <span
                          key={item.name}
                          className="flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-2xl border border-border bg-surface/95 px-3 py-2 text-center shadow-sm backdrop-blur"
                        >
                          <span className="inline-flex size-9 items-center justify-center rounded-control bg-blue-tint text-on-blue-tint">
                            <StackIcon name={item.name} />
                          </span>
                          <span className="whitespace-nowrap text-[11px] font-medium leading-none text-ink">
                            {item.name}
                          </span>
                          <span className="font-mono text-[10px] tabular-nums leading-none text-muted">
                            {item.projects} {Number(item.projects) === 1 ? "project" : "projects"}
                          </span>
                        </span>
                      ))}
                    </OrbitingCircles>

                    <OrbitingCircles radius="22cqw" duration={30} reverse>
                      {site.stackInner.map((item) => (
                        <span
                          key={item.name}
                          className="flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-2xl border border-border bg-surface/95 px-3 py-2 text-center shadow-sm backdrop-blur"
                        >
                          <span className="inline-flex size-9 items-center justify-center rounded-control bg-blue-tint text-on-blue-tint">
                            <StackIcon name={item.name} />
                          </span>
                          <span className="whitespace-nowrap text-[11px] font-medium leading-none text-ink">
                            {item.name}
                          </span>
                          <span className="font-mono text-[10px] tabular-nums leading-none text-muted">
                            {item.projects} {Number(item.projects) === 1 ? "project" : "projects"}
                          </span>
                        </span>
                      ))}
                    </OrbitingCircles>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:hidden">
                {[
                  { title: "Core", items: site.stackInner },
                  { title: "Ecosystem", items: site.stackOuter },
                ].map((group) => (
                  <div
                    key={group.title}
                    className="rounded-card border border-border bg-surface p-5"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                      {group.title}
                    </p>
                    <ul className="mt-3 space-y-2.5">
                      {group.items.map((item) => (
                        <li
                          key={item.name}
                          className="flex items-center justify-between gap-3"
                        >
                          <span className="flex items-center gap-2.5">
                            <span className="inline-flex size-8 items-center justify-center rounded-control bg-blue-tint text-on-blue-tint">
                              <StackIcon name={item.name} />
                            </span>
                            <span className="text-sm font-medium text-ink">
                              {item.name}
                            </span>
                          </span>
                          <span className="font-mono text-xs tabular-nums text-muted">
                            {item.projects}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
