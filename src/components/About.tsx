import { site } from "@/data/site";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-16 border-t border-line py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
        <div>
          <SectionHeading index="02" eyebrow="About" title="Who is Wake?" />
        </div>

        <div className="space-y-8">
          <Reveal>
            <div className="space-y-5 text-base leading-relaxed text-white/65">
              <p>
                {site.name} is the build studio of {site.owner} — a full-stack
                engineer based in {site.location} who ships end-to-end: product
                thinking, backend systems, interfaces, and the deployment run.
              </p>
              <p>
                The portfolio spans government innovation platforms (KeNHAVATE),
                proptech &amp; fintech built for the Kenyan market (MaliManager
                with M-Pesa), AI tooling (Harmonia-AI, the AI invoice generator),
                community platforms, and mobile apps. Twenty-five builds and
                counting.
              </p>
              <p>
                The name says it all: Wake. Sharp, energetic, and a little
                orange — built for the dawn shift, when momentum counts.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="border border-line bg-coal/50 p-6">
              <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-wake">
                Toolbelt
              </p>
              <div className="space-y-5">
                {site.skills.map((group) => (
                  <div
                    key={group.group}
                    className="grid gap-2 sm:grid-cols-[130px_1fr]"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
                      {group.group}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/55"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
              Currently: shipping products that move real money, real people,
              and real ears — one commit at a time.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}