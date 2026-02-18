"use client";

import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  type DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebase.client";
import type {
  Listing,
  ListingCreateInput,
  ListingUpdateInput,
  ListingStatus,
  ListingType,
  PropertyCategory,
} from "./types";
import { generateListingSlug } from "./slug";

const COLLECTION = "listings";

function listingFromDoc(docSnap: { id: string; data: () => DocumentData }): Listing {
  const d = docSnap.data();
  return {
    id: docSnap.id,
    status: d.status ?? "draft",
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
    amenities: Array.isArray(d.amenities) ? d.amenities : [],
    appliancesIncluded: Array.isArray(d.appliancesIncluded) ? d.appliancesIncluded : [],
    virtualTourUrl: d.virtualTourUrl ?? null,
    videoUrl: d.videoUrl ?? null,
    openHouses: Array.isArray(d.openHouses) ? d.openHouses : [],
    images: Array.isArray(d.images) ? d.images : [],
    slug: d.slug ?? "",
    seoTitle: d.seoTitle ?? null,
    seoDescription: d.seoDescription ?? null,
    createdAt: d.createdAt?.toDate?.()?.toISOString?.() ?? new Date().toISOString(),
    updatedAt: d.updatedAt?.toDate?.()?.toISOString?.() ?? new Date().toISOString(),
    publishedAt: d.publishedAt?.toDate?.()?.toISOString?.() ?? null,
    listingDescription: d.listingDescription ?? null,
    locationDescription: d.locationDescription ?? null,
    timeOnSite: d.timeOnSite ?? null,
    communityName: d.communityName ?? null,
    areaName: d.areaName ?? null,
    bathsObj: d.bathsObj ?? null,
    squareFeet: d.squareFeet ?? null,
    squareFootageDisplay: d.squareFootageDisplay ?? null,
    buildingType: d.buildingType ?? null,
    storeys: d.storeys ?? null,
    titleType: d.titleType ?? null,
    landSize: d.landSize ?? null,
    ageOfBuilding: d.ageOfBuilding ?? null,
    annualPropertyTaxes: d.annualPropertyTaxes ?? null,
    parkingType: d.parkingType ?? null,
    totalParkingSpaces: d.totalParkingSpaces ?? null,
    bedroomsAboveGrade: d.bedroomsAboveGrade ?? null,
    bathroomsTotal: d.bathroomsTotal ?? null,
    bathroomsPartial: d.bathroomsPartial ?? null,
    flooring: d.flooring ?? null,
    basementType: d.basementType ?? null,
    features: d.features ?? null,
    foundationType: d.foundationType ?? null,
    style: d.style ?? null,
    rentalEquipment: d.rentalEquipment ?? null,
    heatingType: d.heatingType ?? null,
    utilityType: d.utilityType ?? null,
    utilitySewer: d.utilitySewer ?? null,
    water: d.water ?? null,
    exteriorFinish: d.exteriorFinish ?? null,
    rooms: Array.isArray(d.rooms) ? d.rooms : undefined,
    unitsPreferenceDefault: d.unitsPreferenceDefault ?? null,
    lotFrontage: d.lotFrontage ?? null,
    lotDepth: d.lotDepth ?? null,
    media: d.media ?? null,
  };
}

/** Create a new listing (returns id). Slug is computed from city, street, listingType, id. */
export async function createListing(input: ListingCreateInput): Promise<string> {
  if (!db) throw new Error("Firestore not initialized");
  const ref = await addDoc(collection(db, COLLECTION), {
    ...input,
    status: input.status ?? "draft",
    slug: "", // set below
    createdAt: Timestamp.fromDate(new Date()),
    updatedAt: Timestamp.fromDate(new Date()),
    publishedAt: input.status === "published" ? Timestamp.fromDate(new Date()) : null,
  });
  const slug = generateListingSlug(
    input.address.city,
    input.address.street,
    input.listingType,
    ref.id
  );
  await updateDoc(ref, { slug, updatedAt: Timestamp.fromDate(new Date()) });
  return ref.id;
}

/** Update an existing listing */
export async function updateListing(id: string, input: ListingUpdateInput): Promise<void> {
  if (!db) throw new Error("Firestore not initialized");
  const ref = doc(db, COLLECTION, id);
  const payload: Record<string, unknown> = { ...input, updatedAt: Timestamp.fromDate(new Date()) };
  if (input.status === "published") {
    payload.publishedAt = Timestamp.fromDate(new Date());
  } else if (input.status === "draft") {
    payload.publishedAt = null;
  }
  await updateDoc(ref, payload);
}

/** Get listing by id (admin can read draft; public fetches via API/server) */
export async function getListingById(id: string): Promise<Listing | null> {
  if (!db) throw new Error("Firestore not initialized");
  const ref = doc(db, COLLECTION, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return listingFromDoc({ id: snap.id, data: snap.data.bind(snap) });
}

/** Get listing by slug (public - published only via rules; admin can read via getListingById) */
export async function getListingBySlug(slug: string): Promise<Listing | null> {
  if (!db) throw new Error("Firestore not initialized");
  const q = query(
    collection(db, COLLECTION),
    where("slug", "==", slug),
    where("status", "==", "published"),
    limit(1)
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return listingFromDoc(snap.docs[0]);
}

/** List published listings with optional filters (for public). Filter in-memory to avoid composite indexes. */
export async function listPublishedListings(filters?: {
  listingType?: ListingType;
  propertyCategory?: PropertyCategory;
  limitCount?: number;
}): Promise<Listing[]> {
  if (!db) throw new Error("Firestore not initialized");
  const q = query(
    collection(db, COLLECTION),
    where("status", "==", "published"),
    orderBy("publishedAt", "desc"),
    limit(200)
  );
  const snap = await getDocs(q);
  let list = snap.docs.map((d) => listingFromDoc(d));
  if (filters?.listingType) {
    list = list.filter((l) => l.listingType === filters.listingType);
  }
  if (filters?.propertyCategory) {
    list = list.filter((l) => l.propertyCategory === filters.propertyCategory);
  }
  return list.slice(0, filters?.limitCount ?? 100);
}

/** List listings for admin (draft + published), filter in-memory. */
export async function listAdminListings(filters?: {
  listingType?: ListingType;
  propertyCategory?: PropertyCategory;
  status?: ListingStatus;
  limitCount?: number;
}): Promise<Listing[]> {
  if (!db) throw new Error("Firestore not initialized");
  const q = query(
    collection(db, COLLECTION),
    orderBy("updatedAt", "desc"),
    limit(200)
  );
  const snap = await getDocs(q);
  let list = snap.docs.map((d) => listingFromDoc(d));
  if (filters?.status) {
    list = list.filter((l) => l.status === filters.status);
  }
  if (filters?.listingType) {
    list = list.filter((l) => l.listingType === filters.listingType);
  }
  if (filters?.propertyCategory) {
    list = list.filter((l) => l.propertyCategory === filters.propertyCategory);
  }
  return list.slice(0, filters?.limitCount ?? 100);
}
