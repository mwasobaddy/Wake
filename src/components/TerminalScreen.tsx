"use client";

import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/cx";

type Line = { text: string; tone: "command" | "ok" | "info" | "file" | "done" | "plain" };

const COMMAND = "pnpm dlx shadcn@latest init";

const LINES: Line[] = [
  { text: "Preflight checks.", tone: "ok" },
  { text: "Verifying framework. Found Next.js.", tone: "ok" },
  { text: "Validating Tailwind CSS.", tone: "ok" },
  { text: "Validating import alias.", tone: "ok" },
  { text: "Writing components.json.", tone: "ok" },
  { text: "Checking registry.", tone: "ok" },
  { text: "Updating tailwind.config.ts", tone: "ok" },
  { text: "Updating app/globals.css", tone: "ok" },
  { text: "Installing dependencies.", tone: "ok" },
  { text: "Updated 1 file:", tone: "info" },
  { text: "- lib/utils.ts", tone: "file" },
  { text: "Success! Project initialization completed.", tone: "done" },
  { text: "You may now add components.", tone: "plain" },
];

/**
 * Adapted from Magic UI's Terminal (MIT), without `motion`: the command
 * types character by character, then output lines print in sequence — the
 * same rhythm as the registry component. Reduced motion (or no JavaScript)
 * shows the full transcript at once; the timer only runs while `active`,
 * and leaving the screen resets it so returning replays the run.
 */
export function TerminalScreen({ active }: { active: boolean }) {
  // Initialized full: the server and no-JS render the complete transcript,
  // and the client matches on first paint. The effect below only ever
  // rewrites this state from inside timer callbacks.
  const [typed, setTyped] = useState(COMMAND);
  const [shown, setShown] = useState(LINES.length);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Deferred past paint on purpose: writing state here would be a
    // setState-in-effect, and the 80ms also lets the screen finish fading
    // in before the first character lands.
    const kickoff = window.setTimeout(() => {
      setTyped("");
      setShown(0);
      let char = 0;
      const typeTimer = window.setInterval(() => {
        char += 1;
        setTyped(COMMAND.slice(0, char));
        if (char >= COMMAND.length) {
          window.clearInterval(typeTimer);
          LINES.forEach((_, i) => {
            timers.current.push(
              window.setTimeout(() => setShown(i + 1), 250 + i * 220),
            );
          });
        }
      }, 36);
      timers.current.push(typeTimer);
    }, 80);
    timers.current.push(kickoff);

    return () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
      timers.current = [];
    };
  }, [active]);

  // Server and no-JS render: the complete transcript, readable with no
  // timers at all.
  const command = active ? typed : COMMAND;
  const count = active ? shown : LINES.length;

  return (
    <div className="px-4 pb-2 pt-12">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
        Setup
      </p>
      <div
        aria-hidden={active ? undefined : true}
        className="mt-3 min-h-[300px] rounded-control bg-code-bg p-3 font-mono text-[11px] leading-[1.7] text-code-text"
      >
        <p className="break-all">
          <span className="text-term-prompt">$ </span>
          {command}
          {active && typed.length < COMMAND.length ? (
            <span className="terminal-caret" />
          ) : null}
        </p>
        {LINES.slice(0, count).map((line, i) => (
          <p
            key={`${i}-${line.text}`}
            className={cx(
              "terminal-line",
              line.tone === "ok" || line.tone === "done" ? "text-code-text" : undefined,
              line.tone === "info" ? "text-amber-fill" : undefined,
              line.tone === "file" ? "pl-2 text-muted" : undefined,
              line.tone === "done" ? "font-semibold" : undefined,
            )}
          >
            {line.tone === "ok" ? (
              <span className="text-term-prompt">✔ </span>
            ) : null}
            {line.tone === "info" ? <span>ℹ </span> : null}
            {line.text}
          </p>
        ))}
      </div>
    </div>
  );
}
