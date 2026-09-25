import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = "https://portfolio-wake.vercel.app";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/_not-found",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}