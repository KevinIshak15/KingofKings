"use client";

export function ListingPlaceholderCard() {
  return (
    <div className="bg-white border border-gray-200 overflow-hidden transition-all duration-300 hover:border-primary/20 group">
      <div className="aspect-[4/3] bg-muted animate-pulse" />
      <div className="p-6">
        <div className="h-6 bg-muted rounded mb-3 w-3/4 animate-pulse" />
        <div className="h-5 bg-muted rounded mb-2 w-1/3 animate-pulse" />
        <div className="flex gap-4 mt-4 mb-6">
          <div className="h-4 bg-muted rounded w-16 animate-pulse" />
          <div className="h-4 bg-muted rounded w-16 animate-pulse" />
        </div>
        <button
          disabled
          className="w-full py-3 bg-muted text-gray-400 text-sm font-bold uppercase tracking-widest cursor-not-allowed"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
