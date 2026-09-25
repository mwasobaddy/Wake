import { site } from "@/data/site";

const links = [
  { label: "Email", href: `mailto:${site.email}` },
  { label: "Call", href: site.phoneHref },
  { label: "WhatsApp", href: site.whatsapp, external: true },
  { label: "CV", href: site.cv, external: true },
];

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 sm:flex-row">
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
          <span className="h-2 w-2 rounded-full bg-wake" />
          {site.name} © {new Date().getFullYear()} — {site.owner}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-wake"
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
          Built with Next.js · Wake up and build.
        </p>
      </div>
    </footer>
  );
}