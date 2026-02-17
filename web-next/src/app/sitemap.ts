import { MetadataRoute } from "next";
import { cities } from "@/lib/cities";
import { propertyManagementCities } from "@/lib/property-management-cities";
import { getAllPosts, BLOG_CATEGORIES, getCategorySlug } from "@/lib/blog";
import { listPublishedListingsServer } from "@/lib/listings/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kingofkings.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Core pages – highest priority
  const corePages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/property-management`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/management`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/listings`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  ];

  // Listings category pages
  const listingsPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/listings/for-sale-home`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${SITE_URL}/listings/for-sale-condo`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${SITE_URL}/listings/for-rent-home`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${SITE_URL}/listings/for-rent-condo`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${SITE_URL}/listings/commercial`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
  ];

  // Service sub-pages
  const servicePages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/services/real-estate`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/services/property-management`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/services/investments`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/services/developments`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  // Property management city pages (Mississauga, Toronto, Milton, Oakville)
  const propertyManagementCityPages: MetadataRoute.Sitemap = propertyManagementCities.map((city) => ({
    url: `${SITE_URL}/property-management/${city.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Management city pages (GTA, Durham, York, Cottage Country)
  const managementCityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${SITE_URL}/management/${city.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Blog category pages
  const blogCategoryPages: MetadataRoute.Sitemap = BLOG_CATEGORIES.map((cat) => ({
    url: `${SITE_URL}/blog/category/${getCategorySlug(cat)}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Blog post pages – use actual publish date for lastModified
  const blogPostPages: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Published listing detail pages
  const listings = await listPublishedListingsServer({ limit: 500 });
  const listingDetailPages: MetadataRoute.Sitemap = listings
    .filter((l) => l.slug)
    .map((listing) => ({
      url: `${SITE_URL}/listings/${listing.slug}`,
      lastModified: listing.updatedAt ? new Date(listing.updatedAt) : now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  // Legal pages
  const legalPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];

  return [
    ...corePages,
    ...servicePages,
    ...listingsPages,
    ...listingDetailPages,
    ...propertyManagementCityPages,
    ...managementCityPages,
    ...blogCategoryPages,
    ...blogPostPages,
    ...legalPages,
  ];
}
