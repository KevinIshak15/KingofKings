/**
 * Canonical origin for metadata, sitemap, Open Graph, and JSON-LD.
 * Set `NEXT_PUBLIC_SITE_URL` in production to your real `https://` domain.
 * On Vercel, `VERCEL_URL` is used when that env var is unset.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (explicit) return explicit;
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//, "");
    return `https://${host}`;
  }
  return "http://localhost:3000";
}

/** Site-wide contact and business info */
export const SITE_PHONE = "(647) 408-5334";
export const SITE_PHONE_TEL = "tel:+16474085334";
export const SITE_LOCATION = "Meadowvale Mews";
export const SITE_ADDRESS_LINE = "7145 West Credit Ave, Building 1, Suite 100";
export const SITE_CITY = "Mississauga";
export const SITE_PROVINCE = "Ontario";
export const SITE_POSTAL_CODE = "L5N 6J7";
export const SITE_ADDRESS_FULL = `${SITE_ADDRESS_LINE}, ${SITE_CITY}, ON ${SITE_POSTAL_CODE}`;
export const SITE_HOURS = "Open 24 hours";
export const SITE_EMAIL = "concierge@kingofkings.com";
