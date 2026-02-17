import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { SITE_PHONE, SITE_PHONE_TEL } from "@/lib/site";

export default function ListingsLoading() {
  return (
    <>
      <Hero
        image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop"
        title="Listings"
        subtitle="Mississauga · Toronto · Milton · Oakville"
        primaryCta={{ label: "Book a Consultation", href: "/contact" }}
        secondaryCta={{ label: SITE_PHONE, href: SITE_PHONE_TEL }}
        large={false}
      />

      <section className="section-padding bg-muted">
        <div className="container-wide">
          <div className="h-10 w-48 bg-muted-foreground/10 rounded animate-pulse mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white border border-gray-200 overflow-hidden">
                <div className="aspect-[4/3] bg-muted animate-pulse" />
                <div className="p-6">
                  <div className="h-6 bg-muted rounded mb-3 w-1/3 animate-pulse" />
                  <div className="h-5 bg-muted rounded mb-2 w-2/3 animate-pulse" />
                  <div className="flex gap-4 mt-4 mb-6">
                    <div className="h-4 bg-muted rounded w-16 animate-pulse" />
                    <div className="h-4 bg-muted rounded w-16 animate-pulse" />
                  </div>
                  <div className="h-12 bg-muted rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
