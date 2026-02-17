"use client";

import Link from "next/link";
import type { Listing } from "@/lib/listings/types";
import { OptimizedListingImage } from "./OptimizedListingImage";

interface ListingCardProps {
  listing: Listing;
  showDraftBadge?: boolean;
}

function formatPrice(price: number): string {
  if (!price) return "—";
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(price);
}

export function ListingCard({ listing, showDraftBadge }: ListingCardProps) {
  const img = listing.images?.[0]?.url;
  const address = listing.address;
  const addrStr = address
    ? [address.street, address.unit, address.city].filter(Boolean).join(", ")
    : "";

  const href = listing.status === "draft" ? `/listings/edit/${listing.id}` : `/listings/${listing.slug}`;

  return (
    <Link href={href}>
      <div className="bg-white border border-gray-200 overflow-hidden transition-all duration-300 hover:border-primary/20 group h-full flex flex-col">
        <div className="aspect-[4/3] bg-muted relative overflow-hidden">
          {img ? (
            <OptimizedListingImage
              src={img}
              alt={listing.images?.[0]?.alt || listing.title || ""}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
              No image
            </div>
          )}
          {showDraftBadge && listing.status === "draft" && (
            <span className="absolute top-2 left-2 px-2 py-0.5 text-xs font-medium bg-amber-600 text-white rounded">
              Draft
            </span>
          )}
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <p className="text-primary font-bold text-lg">{formatPrice(listing.price)}</p>
          <h3 className="font-serif text-xl text-secondary mt-1 line-clamp-1 group-hover:text-primary transition-colors">
            {listing.title || "Untitled"}
          </h3>
          {addrStr && (
            <p className="text-sm text-muted-foreground mt-1">{addrStr}</p>
          )}
          <div className="flex gap-4 mt-4 mb-6 text-sm text-muted-foreground">
            <span>{listing.beds} beds</span>
            <span>{listing.baths} baths</span>
            {listing.sqft && <span>{listing.sqft} sqft</span>}
          </div>
          <button
            type="button"
            className="mt-auto w-full py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-bold uppercase tracking-widest"
          >
            {listing.status === "draft" ? "Edit" : "View Details"}
          </button>
        </div>
      </div>
    </Link>
  );
}
