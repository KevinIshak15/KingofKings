"use client";

import { useQuery } from "@tanstack/react-query";
import { useAdmin } from "@/context/AdminContext";
import { ListingsGrid } from "./ListingsGrid";
import { listAdminListings } from "@/lib/listings/crud";
import type { Listing } from "@/lib/listings/types";
import type { ListingType } from "@/lib/listings/types";
import type { PropertyCategory } from "@/lib/listings/types";

interface ListingsSectionProps {
  initialListings: Listing[];
  listingType?: ListingType;
  propertyCategory?: PropertyCategory;
  title?: string;
}

export function ListingsSection({
  initialListings,
  listingType,
  propertyCategory,
  title = "Available Listings",
}: ListingsSectionProps) {
  const { isAdmin } = useAdmin();
  const { data: adminListings, isLoading } = useQuery({
    queryKey: ["admin-listings", listingType, propertyCategory],
    queryFn: () =>
      listAdminListings({
        listingType,
        propertyCategory,
        limitCount: 100,
      }),
    enabled: isAdmin,
  });

  const listings = isAdmin && adminListings ? adminListings : initialListings;

  return (
    <section className="section-padding bg-muted">
      <div className="container-wide">
        <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-12 text-center">
          {title}
        </h2>
        {isAdmin && isLoading ? (
          <p className="text-center text-gray-500 py-12">Loading…</p>
        ) : (
          <ListingsGrid listings={listings} showDraftBadge={isAdmin} />
        )}
      </div>
    </section>
  );
}
