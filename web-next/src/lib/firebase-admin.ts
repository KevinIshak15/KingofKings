import { initializeApp, getApps, cert, type App } from "firebase-admin/app";

let app: App | undefined;

export function getAdminApp(): App | undefined {
  if (app) return app;
  if (getApps().length > 0) return getApps()[0] as App;

  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  if (!privateKey || !clientEmail || !projectId) {
    return undefined;
  }

  try {
    app = initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
    return app;
  } catch {
    return undefined;
  }
}
