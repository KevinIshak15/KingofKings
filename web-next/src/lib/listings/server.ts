import { getFirestore } from "firebase-admin/firestore";
import { getAdminApp } from "@/lib/firebase-admin";
import type { Listing } from "./types";

function mapDocToListing(doc: { id: string; data: () => Record<string, unknown> }): Listing {
  const d = doc.data();
  const address = d.address ?? { street: "", city: "", province: "", postalCode: "", country: "Canada" };
  return {
    id: doc.id,
    status: (d.status as string) ?? "published",
    listingType: (d.listingType as string) ?? "sale",
    propertyCategory: (d.propertyCategory as string) ?? "home",
    propertyType: (d.propertyType as string) ?? "",
    mlsNumber: (d.mlsNumber as string | null) ?? null,
    title: (d.title as string) ?? "",
    description: (d.description as string) ?? "",
    price: Number(d.price ?? 0),
    address: address as Listing["address"],
    beds: Number(d.beds ?? 0),
    baths: Number(d.baths ?? 0),
    sqft: d.sqft != null ? Number(d.sqft) : null,
    lot: (d.lot as Listing["lot"]) ?? null,
    yearBuilt: d.yearBuilt != null ? Number(d.yearBuilt) : null,
    parking: (d.parking as Listing["parking"]) ?? null,
    taxesAnnual: d.taxesAnnual != null ? Number(d.taxesAnnual) : null,
    condoFeesMonthly: d.condoFeesMonthly != null ? Number(d.condoFeesMonthly) : null,
    heating: (d.heating as string | null) ?? null,
    cooling: (d.cooling as string | null) ?? null,
    basement: (d.basement as string | null) ?? null,
    exterior: (d.exterior as string | null) ?? null,
    amenities: (d.amenities as string[]) ?? [],
    appliancesIncluded: (d.appliancesIncluded as string[]) ?? [],
    virtualTourUrl: (d.virtualTourUrl as string | null) ?? null,
    videoUrl: (d.videoUrl as string | null) ?? null,
    openHouses: (d.openHouses as Listing["openHouses"]) ?? [],
    images: (d.images as Listing["images"]) ?? [],
    slug: (d.slug as string) ?? "",
    seoTitle: (d.seoTitle as string | null) ?? null,
    seoDescription: (d.seoDescription as string | null) ?? null,
    createdAt: (d.createdAt as { toDate?: () => Date })?.toDate?.()?.toISOString?.() ?? new Date().toISOString(),
    updatedAt: (d.updatedAt as { toDate?: () => Date })?.toDate?.()?.toISOString?.() ?? new Date().toISOString(),
    publishedAt: (d.publishedAt as { toDate?: () => Date } | null)?.toDate?.()?.toISOString?.() ?? null,
    listingDescription: (d.listingDescription as string | null) ?? null,
    locationDescription: (d.locationDescription as string | null) ?? null,
    timeOnSite: (d.timeOnSite as string | null) ?? null,
    communityName: (d.communityName as string | null) ?? null,
    areaName: (d.areaName as string | null) ?? null,
    bathsObj: (d.bathsObj as Listing["bathsObj"]) ?? null,
    squareFeet: (d.squareFeet as Listing["squareFeet"]) ?? null,
    squareFootageDisplay: (d.squareFootageDisplay as string | null) ?? null,
    buildingType: (d.buildingType as string | null) ?? null,
    storeys: (d.storeys as number | string | null) ?? null,
    titleType: (d.titleType as string | null) ?? null,
    landSize: (d.landSize as string | null) ?? null,
    ageOfBuilding: (d.ageOfBuilding as string | null) ?? null,
    annualPropertyTaxes: (d.annualPropertyTaxes as number | string | null) ?? null,
    parkingType: (d.parkingType as string | null) ?? null,
    totalParkingSpaces: (d.totalParkingSpaces as number | null) ?? null,
    bedroomsAboveGrade: (d.bedroomsAboveGrade as number | null) ?? null,
    bathroomsTotal: (d.bathroomsTotal as number | null) ?? null,
    bathroomsPartial: (d.bathroomsPartial as number | null) ?? null,
    flooring: (d.flooring as string[] | string | null) ?? null,
    basementType: (d.basementType as string | null) ?? null,
    features: (d.features as string[] | string | null) ?? null,
    foundationType: (d.foundationType as string | null) ?? null,
    style: (d.style as string | null) ?? null,
    rentalEquipment: (d.rentalEquipment as string[] | string | null) ?? null,
    heatingType: (d.heatingType as string | null) ?? null,
    utilityType: (d.utilityType as string[] | string | null) ?? null,
    utilitySewer: (d.utilitySewer as string | null) ?? null,
    water: (d.water as string | null) ?? null,
    exteriorFinish: (d.exteriorFinish as string[] | string | null) ?? null,
    rooms: (d.rooms as Listing["rooms"]) ?? undefined,
    unitsPreferenceDefault: (d.unitsPreferenceDefault as "imperial" | "metric" | null) ?? null,
    lotFrontage: (d.lotFrontage as string | null) ?? null,
    lotDepth: (d.lotDepth as string | null) ?? null,
    media: (d.media as Listing["media"]) ?? null,
  };
}

/** Server-side: get published listing by slug */
export async function getPublishedListingBySlug(slug: string): Promise<Listing | null> {
  const app = getAdminApp();
  if (!app) return null;

  const db = getFirestore(app);
  const snap = await db
    .collection("listings")
    .where("slug", "==", slug)
    .where("status", "==", "published")
    .limit(1)
    .get();

  if (snap.empty) return null;
  return mapDocToListing(snap.docs[0]);
}

/** Server-side: list published listings with optional filters */
export async function listPublishedListingsServer(filters?: {
  listingType?: string;
  propertyCategory?: string;
  limit?: number;
}): Promise<Listing[]> {
  try {
    const app = getAdminApp();
    if (!app) return [];

    const db = getFirestore(app);
    const snap = await db
      .collection("listings")
      .where("status", "==", "published")
      .get();

    let list = snap.docs.map((doc) => mapDocToListing(doc));

  if (filters?.listingType) {
    list = list.filter((l) => l.listingType === filters.listingType);
  }
  if (filters?.propertyCategory) {
    list = list.filter((l) => l.propertyCategory === filters.propertyCategory);
  }
  list.sort((a, b) => {
    const aDate = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const bDate = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return bDate - aDate;
  });
  return list.slice(0, filters?.limit ?? 100);
  } catch {
    return [];
  }
}
