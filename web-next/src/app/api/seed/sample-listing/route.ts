import { NextResponse } from "next/server";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { getAdminApp } from "@/lib/firebase-admin";

/** One-time seed: GET /api/seed/sample-listing to create a sample published listing (development only) */
export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not available" }, { status: 404 });
  }
  try {
    const app = getAdminApp();
    if (!app) {
      return NextResponse.json({ error: "Firebase not configured" }, { status: 500 });
    }

    const db = getFirestore(app);

    // Check if sample already exists
    const existing = await db
      .collection("listings")
      .where("slug", "==", "mississauga-123-main-st-sale")
      .limit(1)
      .get();

    if (!existing.empty) {
      const doc = existing.docs[0];
      return NextResponse.json({
        success: true,
        message: "Sample listing already exists",
        id: doc.id,
        slug: "mississauga-123-main-st-sale",
        url: `/listings/mississauga-123-main-st-sale`,
      });
    }

    const ref = await db.collection("listings").add({
      status: "published",
      listingType: "sale",
      propertyCategory: "home",
      propertyType: "Single Family",
      mlsNumber: "W1234567",
      title: "Spacious Family Home in Central Mississauga",
      description: `This beautifully maintained 4-bedroom home offers over 2,500 sqft of living space on a quiet, family-friendly street. The main floor features an open-concept living and dining area, a modern kitchen with granite countertops and stainless steel appliances, and a cozy family room with a gas fireplace.

Upstairs you'll find four generous bedrooms including a primary suite with walk-in closet and ensuite bath. The finished basement provides additional recreation space and storage.

Located in a sought-after neighborhood with excellent schools, parks, and transit access. Don't miss this opportunity to make this house your home.`,
      price: 1299000,
      address: {
        street: "123 Main Street",
        unit: null,
        city: "Mississauga",
        province: "Ontario",
        postalCode: "L5B 1A1",
        country: "Canada",
      },
      beds: 4,
      baths: 3,
      sqft: 2500,
      lot: { frontage: 50, depth: 120, acres: null },
      yearBuilt: 2015,
      parking: { spots: 2, type: "Driveway + Garage", garage: true },
      taxesAnnual: 8500,
      condoFeesMonthly: null,
      heating: "Forced Air, Gas",
      cooling: "Central Air",
      basement: "Finished",
      exterior: "Brick, Siding",
      amenities: ["Backyard", "Deck", "Garden", "Hardwood Floors", "Walk-in Closet"],
      appliancesIncluded: ["Dishwasher", "Dryer", "Microwave", "Range", "Refrigerator", "Washer"],
      virtualTourUrl: null,
      videoUrl: null,
      openHouses: [
        { start: "2025-02-15", end: "2025-02-15", notes: "2-4 PM" },
        { start: "2025-02-16", end: "2025-02-16", notes: "1-3 PM" },
      ],
      images: [
        {
          url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200",
          alt: "Front exterior",
          sortOrder: 0,
        },
        {
          url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
          alt: "Living room",
          sortOrder: 1,
        },
        {
          url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
          alt: "Kitchen",
          sortOrder: 2,
        },
      ],
      slug: "mississauga-123-main-st-sale",
      seoTitle: "$1,299,000 - 123 Main Street Mississauga | King of Kings Group",
      seoDescription: "4 bed, 3 bath single family home for sale in Mississauga. 2,500 sqft, finished basement, double garage. Open houses Feb 15-16.",
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      publishedAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({
      success: true,
      message: "Sample listing created",
      id: ref.id,
      slug: "mississauga-123-main-st-sale",
      url: "/listings/mississauga-123-main-st-sale",
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Seed failed" },
      { status: 500 }
    );
  }
}
