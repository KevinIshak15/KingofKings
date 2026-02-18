"use client";

import Link from "next/link";
import { Pencil } from "lucide-react";
import { AdminOnly } from "./AdminOnly";

export function EditListingLink({
  listingId,
  variant = "link",
}: {
  listingId: string;
  variant?: "link" | "button";
}) {
  const href = `/listings/edit/${listingId}`;
  const content = (
    <>
      <Pencil className="w-4 h-4" />
      Edit listing
    </>
  );

  return (
    <AdminOnly>
      {variant === "button" ? (
        <Link
          href={href}
          className="inline-flex items-center gap-2 border border-white text-white hover:bg-white hover:text-secondary transition-all duration-300 px-6 py-3 font-bold uppercase tracking-widest text-sm rounded-md"
        >
          {content}
        </Link>
      ) : (
        <Link
          href={href}
          className="text-sm text-primary hover:underline font-medium inline-flex items-center gap-1.5"
        >
          {content}
        </Link>
      )}
    </AdminOnly>
  );
}
