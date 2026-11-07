import {
  siExpo,
  siExpress,
  siLaravel,
  siNextdotjs,
  siNodedotjs,
  siPhp,
  siPostgresql,
  siReact,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";

/**
 * One icon per stack entry. Brand glyphs come from simple-icons; the four
 * entries no icon set carries (Blade, React Native, M-Pesa, WebSockets) are
 * small hand-drawn marks in the same 24×24 box. Everything renders in
 * currentColor, so tiles theme for free.
 */

const BRAND: Record<string, SimpleIcon> = {
  Laravel: siLaravel,
  TypeScript: siTypescript,
  React: siReact,
  PHP: siPhp,
  "Next.js": siNextdotjs,
  "Tailwind CSS": siTailwindcss,
  PostgreSQL: siPostgresql,
  "Node.js": siNodedotjs,
  Express: siExpress,
  Expo: siExpo,
};

function ReactNativeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden="true" className="size-5">
      <circle cx={12} cy={12} r={1.6} fill="currentColor" stroke="none" />
      <ellipse cx={12} cy={12} rx={10} ry={4} />
      <ellipse cx={12} cy={12} rx={10} ry={4} transform="rotate(60 12 12)" />
      <ellipse cx={12} cy={12} rx={10} ry={4} transform="rotate(120 12 12)" />
    </svg>
  );
}

function MPesaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-5">
      <path d="M5 19V5l7 7 7-7v14" />
    </svg>
  );
}

function WebSocketIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-5">
      <path d="M9 3v4M15 3v4" />
      <path d="M7 7h10v4a5 5 0 0 1-10 0V7Z" />
      <path d="M12 16v5" />
    </svg>
  );
}

function BladeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-5">
      <path d="M8.5 7 4 12l4.5 5" />
      <path d="M15.5 7 20 12l-4.5 5" />
      <path d="M13.2 4.5 10.8 19.5" />
    </svg>
  );
}

function AiIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-5">
      <path d="M12 2.5 13.9 9l6.6 1.9-6.6 1.9L12 19.3l-1.9-6.5L3.5 10.9 10.1 9 12 2.5Z" />
      <path d="M19 15.5l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9.9-2.6Z" />
    </svg>
  );
}

export function StackIcon({ name }: { name: string }) {
  const brand = BRAND[name];
  if (brand) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-5">
        <path d={brand.path} />
      </svg>
    );
  }
  switch (name) {
    case "React Native":
      return <ReactNativeIcon />;
    case "M-Pesa":
      return <MPesaIcon />;
    case "WebSockets":
      return <WebSocketIcon />;
    case "Blade":
      return <BladeIcon />;
    case "AI / LLM":
      return <AiIcon />;
    default:
      return null;
  }
}
