import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site";

/**
 * Canonical URLs only. `changeFrequency` and `priority` are omitted on
 * purpose: Google ignores both, so including them is noise that implies a
 * signal where there is none.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
    },
  ];
}
