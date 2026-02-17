"use client";

import Link from "next/link";
import { AdminOnly } from "./AdminOnly";

export function EditListingLink({ listingId }: { listingId: string }) {
  return (
    <AdminOnly>
      <Link
        href={`/listings/edit/${listingId}`}
        className="text-sm text-primary hover:underline font-medium"
      >
        Edit listing
      </Link>
    </AdminOnly>
  );
}
