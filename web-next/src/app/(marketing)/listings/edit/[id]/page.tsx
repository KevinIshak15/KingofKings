"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAdmin } from "@/context/AdminContext";
import { ListingEditorForm } from "@/components/listings/ListingEditorForm";
import { getListingById } from "@/lib/listings/crud";
import type { Listing } from "@/lib/listings/types";

export default function EditListingPage() {
  const { isAdmin, loading } = useAdmin();
  const router = useRouter();
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : null;
  const [listing, setListing] = useState<Listing | null | undefined>(undefined);

  useEffect(() => {
    if (loading) return;
    if (!isAdmin) {
      router.replace("/admin-login");
      return;
    }
    if (!id) {
      router.replace("/listings");
      return;
    }
    getListingById(id).then((l) => setListing(l ?? null));
  }, [isAdmin, loading, router, id]);

  if (loading || listing === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <p className="text-gray-500">Loading…</p>
      </div>
    );
  }

  if (!isAdmin || !id) {
    return null;
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <p className="text-gray-500">Listing not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted pt-24 pb-12 px-4">
      <div className="container-wide">
        <ListingEditorForm listing={listing} listingId={id} />
      </div>
    </div>
  );
}
