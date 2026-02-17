import { NextRequest, NextResponse } from "next/server";
import { getFirestore } from "firebase-admin/firestore";
import { getAdminApp } from "@/lib/firebase-admin";

export async function GET(req: NextRequest) {
  const app = getAdminApp();
  if (!app) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const listingType = searchParams.get("listingType");
  const propertyCategory = searchParams.get("propertyCategory");
  const limitCount = Math.min(Number(searchParams.get("limit")) || 100, 100);

  const db = getFirestore(app);
  const q = db
    .collection("listings")
    .where("status", "==", "published")
    .orderBy("publishedAt", "desc")
    .limit(200);

  const snap = await q.get();
  let list = snap.docs.map((doc) => {
    const d = doc.data();
    return {
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
      createdAt: d.createdAt?.toDate?.()?.toISOString?.() ?? null,
      updatedAt: d.updatedAt?.toDate?.()?.toISOString?.() ?? null,
      publishedAt: d.publishedAt?.toDate?.()?.toISOString?.() ?? null,
    };
  });

  if (listingType) {
    list = list.filter((l) => l.listingType === listingType);
  }
  if (propertyCategory) {
    list = list.filter((l) => l.propertyCategory === propertyCategory);
  }
  list = list.slice(0, limitCount);

  return NextResponse.json(list);
}
