import type { ReactNode } from "react";

export type ServiceIconName =
  | "design"
  | "web"
  | "api"
  | "mobile"
  | "data"
  | "cloud";

const PATHS: Record<ServiceIconName, ReactNode> = {
  design: (
    <>
      <path d="M12 19.5l7.5-7.5-3.5-3.5L8.5 16 7 20l4-1z" />
      <path d="M14.5 6.5L17 4l3 3-2.5 2.5" />
    </>
  ),
  web: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <path d="M3 9.5h18" />
      <circle cx="6.2" cy="7" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  api: (
    <>
      <path d="M8.5 4H7a2 2 0 0 0-2 2v3.5L3.5 12 5 14.5V18a2 2 0 0 0 2 2h1.5" />
      <path d="M15.5 4H17a2 2 0 0 1 2 2v3.5L20.5 12 19 14.5V18a2 2 0 0 1-2 2h-1.5" />
    </>
  ),
  mobile: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
    </>
  ),
  data: (
    <>
      <path d="M4 19.5v-6M9.3 19.5V9M14.7 19.5v-4M20 19.5V5.5" />
      <path d="M2.5 19.5h19" />
    </>
  ),
  cloud: (
    <>
      <path d="M7.2 18.5a4.2 4.2 0 0 1-.6-8.35A5.6 5.6 0 0 1 17.3 9.4a3.6 3.6 0 0 1 .1 7.2H7.2z" />
    </>
  ),
};

export function ServiceIcon({ name }: { name: ServiceIconName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-5"
    >
      {PATHS[name]}
    </svg>
  );
}
