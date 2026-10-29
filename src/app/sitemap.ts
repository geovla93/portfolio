import type { MetadataRoute } from "next";

import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      // No reliable content modification date is recorded. Omit lastModified
      // rather than report a new date for unchanged content on every build.
    },
  ];
}
