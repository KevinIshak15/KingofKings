import { getFirestore } from "firebase-admin/firestore";
import { getAdminApp } from "@/lib/firebase-admin";
import type { Listing } from "./types";

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
  const doc = snap.docs[0];
  const d = doc.data();
  return {
    id: doc.id,
    status: d.status ?? "published",
    listingType: d.listingType ?? "sale",
    propertyCategory: d.propertyCategory ?? "home",
    propertyType: d.propertyType ?? "",
    mlsNumber: d.mlsNumber ?? null,
    title: d.title ?? "",
    description: d.description ?? "",
    price: Number(d.price ?? 0),
    address: d.address ?? { street: "", city: "", province: "", postalCode: "", country: "Canada" },
    beds: Number(d.beds ?? 0),
    baths: Number(d.baths ?? 0),
    sqft: d.sqft != null ? Number(d.sqft) : null,
    lot: d.lot ?? null,
    yearBuilt: d.yearBuilt != null ? Number(d.yearBuilt) : null,
    parking: d.parking ?? null,
    taxesAnnual: d.taxesAnnual != null ? Number(d.taxesAnnual) : null,
    condoFeesMonthly: d.condoFeesMonthly != null ? Number(d.condoFeesMonthly) : null,
    heating: d.heating ?? null,
    cooling: d.cooling ?? null,
    basement: d.basement ?? null,
    exterior: d.exterior ?? null,
    amenities: d.amenities ?? [],
    appliancesIncluded: d.appliancesIncluded ?? [],
    virtualTourUrl: d.virtualTourUrl ?? null,
    videoUrl: d.videoUrl ?? null,
    openHouses: d.openHouses ?? [],
    images: d.images ?? [],
    slug: d.slug ?? "",
    seoTitle: d.seoTitle ?? null,
    seoDescription: d.seoDescription ?? null,
    createdAt: d.createdAt?.toDate?.()?.toISOString?.() ?? new Date().toISOString(),
    updatedAt: d.updatedAt?.toDate?.()?.toISOString?.() ?? new Date().toISOString(),
    publishedAt: d.publishedAt?.toDate?.()?.toISOString?.() ?? null,
  };
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

    let list = snap.docs.map((doc) => {
    const d = doc.data();
    return {
      id: doc.id,
      status: d.status ?? "published",
      listingType: d.listingType ?? "sale",
      propertyCategory: d.propertyCategory ?? "home",
      propertyType: d.propertyType ?? "",
      mlsNumber: d.mlsNumber ?? null,
      title: d.title ?? "",
      description: d.description ?? "",
      price: Number(d.price ?? 0),
      address: d.address ?? {},
      beds: Number(d.beds ?? 0),
      baths: Number(d.baths ?? 0),
      sqft: d.sqft != null ? Number(d.sqft) : null,
      lot: d.lot ?? null,
      yearBuilt: d.yearBuilt != null ? Number(d.yearBuilt) : null,
      parking: d.parking ?? null,
      taxesAnnual: d.taxesAnnual != null ? Number(d.taxesAnnual) : null,
      condoFeesMonthly: d.condoFeesMonthly != null ? Number(d.condoFeesMonthly) : null,
      heating: d.heating ?? null,
      cooling: d.cooling ?? null,
      basement: d.basement ?? null,
      exterior: d.exterior ?? null,
      amenities: d.amenities ?? [],
      appliancesIncluded: d.appliancesIncluded ?? [],
      virtualTourUrl: d.virtualTourUrl ?? null,
      videoUrl: d.videoUrl ?? null,
      openHouses: d.openHouses ?? [],
      images: d.images ?? [],
      slug: d.slug ?? "",
      seoTitle: d.seoTitle ?? null,
      seoDescription: d.seoDescription ?? null,
      createdAt: d.createdAt?.toDate?.()?.toISOString?.() ?? "",
      updatedAt: d.updatedAt?.toDate?.()?.toISOString?.() ?? "",
      publishedAt: d.publishedAt?.toDate?.()?.toISOString?.() ?? null,
    } as Listing;
  });

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
