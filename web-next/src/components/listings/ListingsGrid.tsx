"use client";

import { useAdmin } from "@/context/AdminContext";
import { ListingCard } from "./ListingCard";
import type { Listing } from "@/lib/listings/types";

interface ListingsGridProps {
  listings: Listing[];
  showDraftBadge?: boolean;
}

export function ListingsGrid({ listings, showDraftBadge }: ListingsGridProps) {
  const { isAdmin } = useAdmin();
  const showBadge = showDraftBadge ?? isAdmin;

  if (listings.length === 0) {
    return (
      <p className="text-center text-gray-500 py-12">
        No listings yet. Check back soon.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          listing={listing}
          showDraftBadge={showBadge}
        />
      ))}
    </div>
  );
}
