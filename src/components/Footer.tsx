import Link from "next/link";
import { site } from "@/data/site";
import { Mark } from "./Mark";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-band bg-blue-deep text-on-band">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.6fr_repeat(3,1fr)]">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-control text-lg font-semibold tracking-tight text-on-band focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              {/* The band is dark in both themes, so the anchor must be amber
                  here regardless of the page theme. */}
              <Mark height={32} className="shrink-0" cutsId="footer" tone="dark" />
              {site.name}
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-on-band/70">
              {site.tagline}
            </p>
          </div>

          {site.footer.columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-on-band/60">
                {column.title}
              </p>
              <ul className="mt-2 space-y-0.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-11 items-center rounded-control text-sm text-band-link underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/12 pt-6">
          <p className="text-xs text-on-band/60">
            © {year} {site.name}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-on-band/60">
            Built in Nairobi
          </p>
        </div>
      </div>
    </footer>
  );
}
