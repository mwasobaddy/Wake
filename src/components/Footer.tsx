import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
          <span className="h-2 w-2 rounded-full bg-wake" />
          {site.name} © {new Date().getFullYear()} — {site.owner}
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
          Built with Next.js · Wake up and build.
        </p>
      </div>
    </footer>
  );
}