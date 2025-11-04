import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://www.pourlestoutpetits.fr";
  return [
    { url: `${base}/`, changeFrequency: "daily", priority: 1.0 },
    { url: `${base}/premium`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/sell`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/signin`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${base}/signup`, changeFrequency: "monthly", priority: 0.3 },
  ];
}