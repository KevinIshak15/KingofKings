import { NextResponse } from "next/server";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { getAdminApp } from "@/lib/firebase-admin";

const SLUG = "milton-286-foxglove-gate-sale";

/** Seed a listing with ALL fields populated. GET /api/seed/full-listing (development only) */
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

    const existing = await db
      .collection("listings")
      .where("slug", "==", SLUG)
      .limit(1)
      .get();

    if (!existing.empty) {
      const doc = existing.docs[0];
      return NextResponse.json({
        success: true,
        message: "Full-fields listing already exists",
        id: doc.id,
        slug: SLUG,
        url: `/listings/${SLUG}`,
      });
    }

    await db.collection("listings").add({
      status: "published",
      listingType: "sale",
      propertyCategory: "home",
      propertyType: "Single Family",
      mlsNumber: "W12790796",
      title: "286 Foxglove Gate",
      description: "Preconstruction luxury semi-detached home.",
      price: 1004990,
      address: {
        street: "286 Foxglove Gate",
        unit: null,
        city: "Milton",
        province: "Ontario",
        postalCode: "L9E 1T3",
        country: "Canada",
      },
      beds: 4,
      baths: 3,
      sqft: 1920,
      lot: { frontage: 26, depth: 90, acres: null },
      yearBuilt: null,
      parking: { spots: 2, type: "Garage", garage: true },
      taxesAnnual: 0,
      condoFeesMonthly: null,
      heating: "Forced air (Natural gas)",
      cooling: "None, Ventilation system",
      basement: "Unfinished",
      exterior: "Brick, Stone",
      amenities: ["Backyard", "Deck", "Garden", "Hardwood Floors", "Walk-in Closet", "Carpet Free"],
      appliancesIncluded: ["Dishwasher", "Dryer", "Range", "Refrigerator", "Washer"],
      virtualTourUrl: "https://example.com/virtual-tour",
      videoUrl: null,
      openHouses: [
        { start: "2025-02-22", end: "2025-02-22", notes: "2-4 PM" },
        { start: "2025-02-23", end: "2025-02-23", notes: "1-3 PM" },
      ],
      images: [
        { url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200", alt: "Front exterior", sortOrder: 0 },
        { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200", alt: "Exterior", sortOrder: 1 },
        { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200", alt: "Living room", sortOrder: 2 },
      ],
      slug: SLUG,
      seoTitle: "$1,004,990 - 286 Foxglove Gate Milton | King of Kings Group",
      seoDescription: "4 bed, 3 bath semi-detached home in Milton. Great Gulf Homes. 1,920 sqft. Energy Star certified.",
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      publishedAt: FieldValue.serverTimestamp(),

      // Extended fields (all populated)
      listingDescription: `Preconstruction luxury semi-detached home by Great Gulf Homes. The Knight model, approximately 1,920 sq. ft. with 9' ceilings, open-concept main floor, kitchen island, quartz countertops, upgraded cabinetry, tile and hardwood flooring, oak stairs. Primary suite with ensuite, second-floor laundry. Unfinished basement. Energy Star certified, H+ME Technology, Tarion Warranty. $15,000 Design Studio credit. Great schools, Milton GO Station, shops, dining, 401/407 access. Offers on builder forms. Milton Village Sales Office.`,
      locationDescription: "Britannia Rd. and Tremaine Rd.",
      timeOnSite: "1 day",
      communityName: "1051 - Walker",
      areaName: "Walker",
      bathsObj: { total: 3, partial: 1 },
      squareFeet: { min: 1500, max: 2000, display: "1500 - 2000 sqft" },
      squareFootageDisplay: "1500 - 2000 sqft",
      buildingType: "House",
      storeys: 2,
      titleType: "Freehold",
      landSize: "26 x 90 FT",
      ageOfBuilding: "New building",
      annualPropertyTaxes: "$0",
      parkingType: "Garage",
      totalParkingSpaces: 2,
      bedroomsAboveGrade: 4,
      bathroomsTotal: 3,
      bathroomsPartial: 1,
      flooring: ["Hardwood", "Ceramic"],
      basementType: "Unfinished",
      features: ["Carpet Free"],
      foundationType: "Concrete",
      style: "Semi-detached",
      rentalEquipment: ["Water Heater", "Water Heater - Tankless"],
      heatingType: "Forced air (Natural gas)",
      utilityType: ["Cable (Available)", "Electricity (Installed)", "Sewer (Installed)"],
      utilitySewer: "Sanitary sewer",
      water: "Municipal water",
      exteriorFinish: ["Brick", "Stone"],
      rooms: [
        { level: "Main level", name: "Great room", dimensionsImperial: "20 ft ,10 in x 12 ft", dimensionsMetric: "6.35 m x 3.66 m" },
        { level: "Main level", name: "Kitchen", dimensionsImperial: "8 ft ,5 in x 12 ft ,4 in", dimensionsMetric: "2.57 m x 3.76 m" },
        { level: "Main level", name: "Dining room", dimensionsImperial: "12 ft ,4 in x 12 ft ,4 in", dimensionsMetric: "3.76 m x 3.76 m" },
        { level: "Second level", name: "Laundry room", dimensionsImperial: "5 ft ,6 in x 6 ft", dimensionsMetric: "1.68 m x 1.83 m" },
        { level: "Second level", name: "Primary Bedroom", dimensionsImperial: "11 ft ,1 in x 14 ft ,7 in", dimensionsMetric: "3.38 m x 4.44 m" },
        { level: "Second level", name: "Bedroom 2", dimensionsImperial: "10 ft x 9 ft ,1 in", dimensionsMetric: "3.05 m x 2.77 m" },
        { level: "Second level", name: "Bedroom 3", dimensionsImperial: "10 ft ,2 in x 12 ft ,3 in", dimensionsMetric: "3.10 m x 3.73 m" },
        { level: "Second level", name: "Bedroom 4", dimensionsImperial: "10 ft ,2 in x 12 ft ,11 in", dimensionsMetric: "3.10 m x 3.94 m" },
      ],
      unitsPreferenceDefault: "imperial",
      lotFrontage: "26 ft",
      lotDepth: "90 ft",
      media: {
        photos: [
          { url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200", alt: "Front exterior", sortOrder: 0 },
        ],
        virtualTourUrl: "https://example.com/virtual-tour",
        videoUrl: null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Full-fields listing created",
      slug: SLUG,
      url: `/listings/${SLUG}`,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Seed failed" },
      { status: 500 }
    );
  }
}
