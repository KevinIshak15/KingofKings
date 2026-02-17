import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { getAdminApp } from "@/lib/firebase-admin";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || process.env.NEXT_PUBLIC_ADMIN_EMAIL || "md.ragy@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json();
    if (!idToken || typeof idToken !== "string") {
      return NextResponse.json({ error: "Missing idToken" }, { status: 400 });
    }

    const app = getAdminApp();
    if (!app) {
      return NextResponse.json({ error: "Server not configured" }, { status: 500 });
    }

    const auth = getAuth(app);
    const decoded = await auth.verifyIdToken(idToken);

    if (decoded.email?.toLowerCase().trim() !== ADMIN_EMAIL.toLowerCase().trim()) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    const db = getFirestore(app);
    await db.collection("users").doc(decoded.uid).set({
      email: decoded.email,
      role: "admin",
      createdAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Setup failed" }, { status: 500 });
  }
}
