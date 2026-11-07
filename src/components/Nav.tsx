"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import ThemeToggle from "./ThemeToggle";
import { Mark } from "./Mark";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
      {open ? (
        <path
          d="M6 6l12 12M18 6L6 18"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M4 7h16M4 12h16M4 17h16"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

export default function Nav() {
  const pathname = usePathname();
  // The menu is keyed to the path it was opened on, so navigating closes it
  // without an effect: the stored path stops matching and `open` goes false.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;

  function closeMenu() {
    setOpenFor(null);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenFor(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="nav-surface sticky top-0 z-40 border-b border-border">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5 sm:px-8">
        <Link
          href="/"
          className="inline-flex h-11 items-center gap-2.5 rounded-control text-lg font-semibold tracking-tight text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring"
        >
          <Mark height={28} className="shrink-0" cutsId="nav" />
          {site.name}
        </Link>

        <nav aria-label="Primary" className="hidden md:flex md:h-16 md:items-stretch">
          {site.nav.map((item) => {
            // Hash links do not resolve to a pathname, so nothing lights up
            // until these become real routes. The active treatment is defined
            // here so it does not have to be re-invented later.
            const [route] = item.href.split("#");
            const active =
              route !== "" && route !== "/" && pathname.startsWith(route);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex items-center border-b-2 px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring ${
                  active
                    ? "border-blue-fill text-blue-text"
                    : "border-transparent text-muted hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          {/*
            Cobalt, not amber. The hero owns the single amber CTA for this
            viewport (§5.1 "one per view"), and §5.3's nav CTA would otherwise
            make two. Swapping these two is a one-class change if you would
            rather the nav held the amber slot.
          */}
          <Link
            href="/#contact"
            className="hidden h-11 items-center rounded-control bg-blue-fill px-4 text-sm font-semibold text-on-blue transition-colors hover:bg-blue-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring sm:inline-flex"
          >
            Book a call
          </Link>

          <button
            type="button"
            onClick={() => setOpenFor(open ? null : pathname)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-11 items-center justify-center rounded-control text-muted transition-colors hover:bg-sunken hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring md:hidden"
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="absolute inset-x-0 top-full border-b border-border bg-raised shadow-lg md:hidden"
        >
          <nav aria-label="Mobile" className="mx-auto max-w-6xl px-5 pb-4 pt-2 sm:px-8">
            <ul className="flex flex-col">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="flex min-h-11 items-center border-b border-border text-sm font-medium text-ink last:border-b-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/#contact"
              onClick={closeMenu}
              className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-control bg-blue-fill px-4 text-sm font-semibold text-on-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
            >
              Book a call
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
