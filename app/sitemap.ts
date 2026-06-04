import type { MetadataRoute } from "next";
import { seoTopicList } from "./seo-data";

const baseUrl = "https://www.cafecomzakia.com.br";
const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/pacote`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/spotify`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/jogos`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.82,
    },
    ...seoTopicList.map((topic) => ({
      url: `${baseUrl}/${topic.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.88,
    })),
  ];
}
