"use client";

import Link from "next/link";
import { AdminOnly } from "./AdminOnly";

export function AddListingButton() {
  return (
    <AdminOnly>
      <Link href="/listings/new">
        <button className="border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 px-8 py-4 font-bold uppercase tracking-widest text-sm min-w-[200px] rounded-md">
          Add Listing
        </button>
      </Link>
    </AdminOnly>
  );
}
