"use client";

import { useEffect, useRef, useState } from "react";
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
  // Keyed to the path it was opened on, so a navigation closes it without an
  // effect: the stored path stops matching and `open` goes false.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;

  const sheetRef = useRef<HTMLDialogElement | null>(null);

  function closeMenu() {
    setOpenFor(null);
  }

  // A native <dialog> opened with showModal() gives us the focus trap, the
  // Escape key, the inert background and the top layer for free. Re-implementing
  // those by hand is where mobile menus usually go wrong.
  useEffect(() => {
    const dialog = sheetRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // A sheet opened on a phone should not survive into a desktop viewport.
  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (media.matches) setOpenFor(null);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

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
            viewport, and §5.3's nav CTA would otherwise make two. Swapping
            these two is a one-class change if you would rather the nav held
            the amber slot.
          */}
          <Link
            href="/#contact"
            className="hidden h-11 items-center rounded-pill bg-blue-fill px-4 text-sm font-semibold text-on-blue transition-colors hover:bg-blue-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring sm:inline-flex"
          >
            Book a call
          </Link>

          <button
            type="button"
            onClick={() => setOpenFor(open ? null : pathname)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-sunken hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring md:hidden"
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      <dialog
        ref={sheetRef}
        id="mobile-nav"
        aria-labelledby="mobile-nav-title"
        onClose={closeMenu}
        onClick={(event) => {
          // Clicking the backdrop targets the dialog itself; clicking inside
          // targets a child.
          if (event.target === event.currentTarget) closeMenu();
        }}
        className="sheet md:hidden"
      >
        <div className="flex max-h-[88dvh] flex-col bg-raised text-ink">
          <div className="flex shrink-0 justify-center pt-2.5">
            <span
              aria-hidden="true"
              className="h-1 w-10 rounded-full bg-border-strong"
            />
          </div>

          <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-5">
            <Link
              href="/"
              onClick={closeMenu}
              className="inline-flex items-center gap-2.5 rounded-control text-lg font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring"
            >
              <Mark height={26} className="shrink-0" cutsId="sheet" />
              <span id="mobile-nav-title">{site.name}</span>
            </Link>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className="inline-flex size-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-sunken hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
            >
              <MenuIcon open />
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-4">
            <ul className="flex flex-col">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="flex min-h-14 items-center border-b border-border text-lg font-medium text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/#contact"
              onClick={closeMenu}
              className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-pill bg-blue-fill px-4 text-sm font-semibold text-on-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
            >
              Book a call
            </Link>
          </nav>

          <div className="shrink-0 border-t border-border px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <p className="inline-flex items-center gap-2 text-xs text-muted">
              <span className="live-dot size-2 rounded-full bg-red-vivid" />
              Open for new work
            </p>
          </div>
        </div>
      </dialog>
    </header>
  );
}
