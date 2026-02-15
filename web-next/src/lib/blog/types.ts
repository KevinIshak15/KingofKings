export const BLOG_CATEGORIES = [
  "Market Updates",
  "Investment Strategies",
  "Rental Advice",
  "Development Insights",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: BlogCategory;
  readingTime: number;
  author?: string;
  coverImage?: string;
  body: Array<{ type: "p" | "h2" | "h3"; content: string }>;
  takeaways: string[];
}
