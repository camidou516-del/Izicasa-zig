import type { MetadataRoute } from "next";

import { getPosts } from "@/lib/sanity/client";
import { siteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();

  const staticRoutes = [
    "",
    "/formations",
    "/services",
    "/packs",
    "/partenariats",
    "/blog",
    "/contact",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const blogRoutes = posts.map((post: { slug: { current: string } }) => ({
    url: `${siteUrl}/blog/${post.slug.current}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
