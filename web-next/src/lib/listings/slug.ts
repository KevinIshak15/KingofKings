/** Normalize string for slug: lowercase, replace spaces/special chars with hyphen */
export function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[\s/\\]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Generate slug for listing: city-street-listingType-id */
export function generateListingSlug(
  city: string,
  street: string,
  listingType: string,
  id: string
): string {
  const parts = [slugify(city), slugify(street), slugify(listingType), id];
  return parts.filter(Boolean).join("-") || id;
}
