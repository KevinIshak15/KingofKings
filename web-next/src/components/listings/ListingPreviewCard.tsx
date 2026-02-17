"use client";

import type { ListingFormValues } from "@/lib/listings/schema";
import type { ListingStatus } from "@/lib/listings/types";
import { OptimizedListingImage } from "./OptimizedListingImage";

interface ListingPreviewCardProps {
  listing: ListingFormValues;
  status: ListingStatus;
}

function formatPrice(price: number): string {
  if (!price) return "—";
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(price);
}

export function ListingPreviewCard({ listing, status }: ListingPreviewCardProps) {
  const img = listing.images?.[0]?.url;
  const address = listing.address;
  const addrStr = address
    ? [address.street, address.unit, address.city].filter(Boolean).join(", ")
    : "";

  return (
    <div className="bg-white border border-gray-200 overflow-hidden">
      <div className="aspect-[4/3] bg-muted relative overflow-hidden">
        {img ? (
          <OptimizedListingImage
            src={img}
            alt={listing.images?.[0]?.alt || listing.title || ""}
            fill
            sizes="400px"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
            No image
          </div>
        )}
        <span className="absolute top-2 left-2 px-2 py-0.5 text-xs font-medium bg-secondary text-white rounded">
          {status}
        </span>
      </div>
      <div className="p-6">
        <p className="text-primary font-bold text-lg">{formatPrice(listing.price)}</p>
        <h3 className="font-serif text-xl text-secondary mt-1 line-clamp-1">
          {listing.title || "Untitled"}
        </h3>
        {addrStr && (
          <p className="text-sm text-muted-foreground mt-1">{addrStr}</p>
        )}
        <div className="flex gap-4 mt-4 text-sm text-muted-foreground">
          <span>{listing.beds} beds</span>
          <span>{listing.baths} baths</span>
          {listing.sqft && <span>{listing.sqft} sqft</span>}
        </div>
        <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
          {listing.description || "No description."}
        </p>
      </div>
    </div>
  );
}
