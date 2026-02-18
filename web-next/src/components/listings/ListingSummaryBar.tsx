"use client";

import { Bed, Bath, Square } from "lucide-react";
import { EditListingLink } from "@/components/admin/EditListingLink";
import type { Listing } from "@/lib/listings/types";

interface ListingSummaryBarProps {
  listing: Listing;
  formatPrice: (price: number) => string;
  showAdminControls?: boolean;
}

function formatAddressLine1(addr: Listing["address"]) {
  const parts = [addr.street, addr.unit].filter(Boolean);
  return parts.join(", ");
}

function formatAddressLine2(addr: Listing["address"], areaName?: string | null) {
  const cityPart = addr.city ? addr.city + (areaName ? ` (${areaName})` : "") : (areaName ?? "");
  const parts = [cityPart, addr.province, addr.postalCode].filter(Boolean);
  return parts.join(", ");
}

function getSqftDisplay(listing: Listing): string {
  if (listing.squareFootageDisplay) return listing.squareFootageDisplay;
  if (listing.sqft) return `${listing.sqft} sqft`;
  return "—";
}

export function ListingSummaryBar({
  listing,
  formatPrice,
  showAdminControls = false,
}: ListingSummaryBarProps) {
  const addr = listing.address || {};
  const sqftDisplay = getSqftDisplay(listing);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <p className="text-primary font-bold text-2xl md:text-3xl">{formatPrice(listing.price)}</p>
          {addr.street && (
            <p className="font-serif text-lg text-secondary mt-1">{formatAddressLine1(addr)}</p>
          )}
          {(addr.city || addr.province) && (
            <p className="text-muted-foreground text-sm mt-0.5">
              {formatAddressLine2(addr, listing.areaName)}
            </p>
          )}
          {listing.mlsNumber && (
            <p className="text-muted-foreground text-xs mt-1">MLS® {listing.mlsNumber}</p>
          )}
          {listing.timeOnSite && (
            <span className="inline-block mt-2 px-2 py-0.5 text-xs bg-muted rounded">
              {listing.timeOnSite}
            </span>
          )}
        </div>
        {showAdminControls && (
          <div className="flex items-center gap-2">
            {listing.status === "draft" && (
              <span className="px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded">
                Draft
              </span>
            )}
            <EditListingLink listingId={listing.id} />
          </div>
        )}
      </div>
      <div className="flex gap-6 py-4 border-y border-gray-200">
        <div className="flex items-center gap-2">
          <Bed className="w-5 h-5 text-primary" aria-hidden />
          <span className="text-secondary font-medium">{listing.beds} Beds</span>
        </div>
        <div className="flex items-center gap-2">
          <Bath className="w-5 h-5 text-primary" aria-hidden />
          <span className="text-secondary font-medium">
            {listing.bathroomsTotal ?? listing.baths} Baths
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Square className="w-5 h-5 text-primary" aria-hidden />
          <span className="text-secondary font-medium">{sqftDisplay}</span>
        </div>
      </div>
    </div>
  );
}
