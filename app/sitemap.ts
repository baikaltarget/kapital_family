import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getPosts } from "@/lib/blog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.site.url.replace(/\/$/, "");
  const now = new Date();

  const staticPaths = [
    "/",
    "/massazh/",
    "/basseyn/",
    "/prokol-ushey/",
    "/prokol-ushey/detyam/",
    "/tseny/",
    "/spetsialisty/",
    "/o-nas/",
    "/kontakty/",
    "/otzyvy/",
    "/usolie-sibirskoe/",
    "/blog/",
  ];

  const services = site.services.map((s) => `/${s.hub}/${s.slug}/`);
  const posts = getPosts().map((p) => `/blog/${p.slug}/`);

  return [...staticPaths, ...services, ...posts].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: p === "/" ? "weekly" : "monthly",
    priority: p === "/" ? 1 : p.split("/").length <= 3 ? 0.8 : 0.6,
  }));
}
