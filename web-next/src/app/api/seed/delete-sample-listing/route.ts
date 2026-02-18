import { NextResponse } from "next/server";
import { getFirestore } from "firebase-admin/firestore";
import { getAdminApp } from "@/lib/firebase-admin";

const SAMPLE_SLUG = "mississauga-123-main-st-sale";

/** Delete the sample listing "Spacious Family Home in Central Mississauga". GET /api/seed/delete-sample-listing (development only) */
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
    const snap = await db
      .collection("listings")
      .where("slug", "==", SAMPLE_SLUG)
      .limit(1)
      .get();

    if (snap.empty) {
      return NextResponse.json({
        success: true,
        message: "Sample listing not found (already deleted or never created)",
        slug: SAMPLE_SLUG,
      });
    }

    await snap.docs[0].ref.delete();

    return NextResponse.json({
      success: true,
      message: "Sample listing deleted",
      slug: SAMPLE_SLUG,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Delete failed" },
      { status: 500 }
    );
  }
}
