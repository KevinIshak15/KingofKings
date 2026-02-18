export function ListingsSectionSkeleton() {
  return (
    <section className="section-padding bg-muted">
      <div className="container-wide">
        <div className="h-10 w-64 mx-auto mb-12 bg-gray-200 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white border border-gray-200 overflow-hidden rounded">
              <div className="aspect-[4/3] bg-gray-200 animate-pulse" />
              <div className="p-6 space-y-3">
                <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                <div className="flex gap-4 mt-4">
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse mt-6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
