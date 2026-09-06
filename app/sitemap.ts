import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getWorkSlugs } from "@/lib/work";
import { getWritingSlugs } from "@/lib/writing";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/work", "/writing", "/about", "/discuss"].map(
    (path) => ({
      url: `${site.url}${path || "/"}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    }),
  );

  const workRoutes = getWorkSlugs().map((slug) => ({
    url: `${site.url}/work/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const writingRoutes = getWritingSlugs().map((slug) => ({
    url: `${site.url}/writing/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...workRoutes, ...writingRoutes];
}
