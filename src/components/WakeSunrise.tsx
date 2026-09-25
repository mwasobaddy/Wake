interface WakeSunriseProps {
  className?: string;
  prefix?: string;
}

const SKYLINE = [
  { x: 64, w: 10, h: 16 },
  { x: 78, w: 7, h: 11 },
  { x: 90, w: 8, h: 22 },
  { x: 86, w: 16, h: 5 },
  { x: 93.5, w: 1, h: 9 },
  { x: 110, w: 9, h: 30 },
  { x: 113, w: 3, h: 8 },
  { x: 124, w: 8, h: 12 },
  { x: 138, w: 6, h: 26 },
  { x: 139.5, w: 1, h: 7 },
  { x: 141, w: 1, h: 9 },
  { x: 150, w: 10, h: 15 },
  { x: 164, w: 7, h: 9 },
  { x: 176, w: 12, h: 6 },
  { x: 192, w: 8, h: 4 },
  { x: 204, w: 10, h: 8 },
  { x: 218, w: 10, h: 13 },
];

const RAYS = [
  { x: 38, y1: 85, y2: 92 },
  { x: 50, y1: 81, y2: 90 },
  { x: 62, y1: 85, y2: 92 },
];

const Y = 120; // horizon baseline

export default function WakeSunrise({ className = "", prefix = "wk" }: WakeSunriseProps) {
  return (
    <svg
      viewBox="0 0 240 160"
      role="img"
      aria-label="Wake sunrise over Nairobi skyline"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient
          id={`${prefix}-sunBody`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor="#ff8a3d" />
          <stop offset="100%" stopColor="#ff5c00" />
        </linearGradient>
        <radialGradient id={`${prefix}-halo`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ff5c00" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ff5c00" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${prefix}-cityGlow`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ff5c00" stopOpacity="0" />
          <stop offset="45%" stopColor="#ff5c00" stopOpacity="0.1" />
          <stop offset="75%" stopColor="#ff5c00" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ff8a3d" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      <circle cx="50" cy="118" r="62" fill={`url(#${prefix}-halo)`} />

      <path d="M 26 120 A 24 24 0 0 1 74 120 Z" fill={`url(#${prefix}-sunBody)`} />

      {RAYS.map((ray) => (
        <line
          key={ray.x}
          x1={ray.x}
          y1={ray.y1}
          x2={ray.x}
          y2={ray.y2}
          stroke="#ff8a3d"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.85"
        />
      ))}

      <rect x="0" y="96" width="240" height="24" fill={`url(#${prefix}-cityGlow)`} />

      <line
        x1="0"
        y1={Y}
        x2="240"
        y2={Y}
        stroke={`url(#${prefix}-sunBody)`}
        strokeWidth="1"
        opacity="0.8"
      />

      {SKYLINE.map((b, i) => (
        <rect
          key={`${b.x}-${i}`}
          x={b.x}
          y={Y - b.h}
          width={b.w}
          height={b.h}
          fill="#0b0b0c"
        />
      ))}

      {SKYLINE.map((b, i) => (
        <rect
          key={`cap-${b.x}-${i}`}
          x={b.x}
          y={Y - b.h - 1}
          width={b.w}
          height="1"
          fill="#ff8a3d"
          opacity="0.55"
        />
      ))}
    </svg>
  );
}