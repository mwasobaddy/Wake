import { site } from "@/data/site";
import Reveal from "@/components/Reveal";
import { ArrowUpRightIcon, MailIcon } from "@/components/icons";

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-16 overflow-hidden border-t border-line">
      <div className="sun-glow absolute inset-0" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-28 text-center sm:py-36">
        <Reveal>
          <p className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-white/40">
            <span className="text-white/20">03</span>
            <span className="h-px w-8 bg-wake/60" />
            Contact
            <span className="h-px w-8 bg-wake/60" />
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-6xl">
            Let&apos;s wake up to{" "}
            <span className="rise">what&apos;s next</span> together.
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
            Product idea? A platform that needs building? A system that needs
            rewiring? Bring it.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {site.email ? (
              <a
                href={`mailto:${site.email}`}
                className="group inline-flex items-center gap-2 bg-wake px-6 py-4 font-mono text-xs font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ember"
              >
                <MailIcon className="h-4 w-4" />
                {site.email}
              </a>
            ) : null}
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex items-center gap-2 border border-line px-6 py-4 font-mono text-xs uppercase tracking-[0.18em] text-white/80 transition-colors hover:border-wake hover:text-wake ${
                site.email ? "" : "bg-wake text-ink hover:bg-ember"
              }`}
            >
              @{site.handle}
              <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}