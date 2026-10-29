import type { MetadataRoute } from "next";

import { site } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    // Previews remain crawlable so crawlers can read their noindex directive.
    sitemap: `${site.url}/sitemap.xml`,
  };
}
