import { NextRequest, NextResponse } from "next/server";
import { getFirestore } from "firebase-admin/firestore";
import { getAdminApp } from "@/lib/firebase-admin";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  if (!slug) {
    return NextResponse.json({ error: "Slug required" }, { status: 400 });
  }

  const app = getAdminApp();
  if (!app) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  const db = getFirestore(app);
  const snap = await db
    .collection("listings")
    .where("slug", "==", slug)
    .where("status", "==", "published")
    .limit(1)
    .get();

  if (snap.empty) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const doc = snap.docs[0];
  const d = doc.data();
  const toDate = (v: unknown) => (v && typeof v === "object" && "toDate" in v && typeof (v as { toDate: () => Date }).toDate === "function")
    ? (v as { toDate: () => Date }).toDate().toISOString()
    : null;
  const listing = {
    id: doc.id,
    status: d.status,
    listingType: d.listingType,
    propertyCategory: d.propertyCategory,
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
    createdAt: toDate(d.createdAt) ?? null,
    updatedAt: toDate(d.updatedAt) ?? null,
    publishedAt: toDate(d.publishedAt) ?? null,
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
    rooms: d.rooms ?? undefined,
    unitsPreferenceDefault: d.unitsPreferenceDefault ?? null,
    lotFrontage: d.lotFrontage ?? null,
    lotDepth: d.lotDepth ?? null,
    media: d.media ?? null,
  };

  return NextResponse.json(listing);
}
