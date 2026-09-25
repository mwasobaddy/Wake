"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { ArrowUpRightIcon } from "@/components/icons";

const links = [
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-line bg-ink/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2 font-mono text-sm tracking-tight">
          <span className="h-2.5 w-2.5 rounded-full bg-wake animate-pulse-dot" />
          <span className="font-bold uppercase tracking-[0.2em]">Wake</span>
          <span className="text-white/30">®</span>
        </a>

        <nav className="hidden items-center gap-8 font-mono text-xs uppercase tracking-[0.18em] text-white/60 sm:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-wake"
            >
              {link.label}
            </a>
          ))}
          <a
            href={site.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-wake"
          >
            Résumé
          </a>
        </nav>

        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-1.5 border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/80 transition-colors hover:border-wake hover:text-wake"
        >
          GitHub
          <ArrowUpRightIcon className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </header>
  );
}