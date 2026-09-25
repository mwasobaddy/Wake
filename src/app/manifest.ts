import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Wake — Wanjohi Kelvin, Full-Stack Engineer",
    short_name: "Wake",
    description:
      "Portfolio of Wanjohi Kelvin — full-stack engineer building SaaS, mobile & AI products in Kenya.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#09090b",
    categories: ["technology", "portfolio"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}