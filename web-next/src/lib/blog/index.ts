import type { BlogCategory, BlogPost } from "./types";
import { posts } from "./posts";
import { BLOG_CATEGORIES } from "./types";

export { BLOG_CATEGORIES };
export type { BlogCategory, BlogPost };

export function getAllPosts(): BlogPost[] {
  return [...posts].sort((a, b) => (b.date > a.date ? 1 : -1));
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug);
}

export function getCategorySlug(category: BlogCategory): string {
  return category.toLowerCase().replace(/\s+/g, "-");
}

export function getCategoryFromSlug(slug: string): BlogCategory | undefined {
  const normalized = slug.toLowerCase().replace(/-/g, " ");
  return BLOG_CATEGORIES.find((c) => c.toLowerCase().replace(/\s+/g, " ") === normalized);
}
