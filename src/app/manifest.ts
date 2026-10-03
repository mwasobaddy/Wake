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
        src: "/icons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  };
}