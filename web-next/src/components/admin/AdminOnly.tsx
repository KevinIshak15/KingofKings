"use client";

import { useAdmin } from "@/context/AdminContext";

export function AdminOnly({ children }: { children: React.ReactNode }) {
  const { isAdmin } = useAdmin();
  if (!isAdmin) return null;
  return <>{children}</>;
}
