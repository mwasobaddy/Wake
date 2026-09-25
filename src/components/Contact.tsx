import { site } from "@/data/site";
import Reveal from "@/components/Reveal";
import {
  ArrowUpRightIcon,
  DownloadIcon,
  GitHubIcon,
  MailIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/icons";

const channels = [
  {
    idx: "01",
    label: "Email",
    display: site.email,
    href: `mailto:${site.email}`,
    icon: MailIcon,
  },
  {
    idx: "02",
    label: "Call",
    display: site.phone,
    href: site.phoneHref,
    icon: PhoneIcon,
  },
  {
    idx: "03",
    label: "WhatsApp",
    display: "Chat on WhatsApp",
    href: site.whatsapp,
    icon: WhatsAppIcon,
    external: true,
  },
  {
    idx: "04",
    label: "GitHub",
    display: `@${site.handle}`,
    href: site.github,
    icon: GitHubIcon,
    external: true,
  },
  {
    idx: "05",
    label: "CV",
    display: "wanjohi-kelvin-cv.pdf",
    href: site.cv,
    icon: DownloadIcon,
    external: true,
  },
];

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
            rewiring? Bring it. I reply fast — pick your channel.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <div className="mt-12 grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {channels.map(({ idx, label, display, href, icon: Icon, external }) => (
              <a
                key={idx}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex items-center gap-4 border border-line bg-ink/60 p-5 text-left transition-colors hover:border-wake hover:bg-wake/5"
              >
                <span className="shrink-0 border border-line p-3 text-wake transition-colors group-hover:border-wake">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[11px] uppercase tracking-[0.22em] text-white/35">
                    {idx} — {label}
                  </span>
                  <span className="block truncate font-mono text-sm text-white/90 sm:text-base">
                    {display}
                  </span>
                </span>
                <ArrowUpRightIcon className="h-4 w-4 shrink-0 text-white/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-wake" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}