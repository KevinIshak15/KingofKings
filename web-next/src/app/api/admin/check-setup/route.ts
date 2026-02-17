import { NextResponse } from "next/server";
import { getFirestore } from "firebase-admin/firestore";
import { getAdminApp } from "@/lib/firebase-admin";

export async function GET() {
  try {
    const app = getAdminApp();
    if (!app) {
      return NextResponse.json({ adminExists: false });
    }
    const db = getFirestore(app);
    const snapshot = await db.collection("users").where("role", "==", "admin").limit(1).get();
    return NextResponse.json({ adminExists: !snapshot.empty });
  } catch {
    return NextResponse.json({ adminExists: false });
  }
}
