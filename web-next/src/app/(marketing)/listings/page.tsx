import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { AddListingButton } from "@/components/admin/AddListingButton";
import { ListingsSection } from "@/components/listings/ListingsSection";
import { listPublishedListingsServer } from "@/lib/listings/server";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE_PHONE, SITE_PHONE_TEL } from "@/lib/site";
import { LISTINGS_HUB_CARDS } from "@/lib/listings-menu";

export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  title: "Listings in the GTA | King of Kings Group",
  description: "Explore real estate listings across the GTA, including homes, condos, rentals, and commercial opportunities.",
  path: "/listings",
});

export default async function ListingsHubPage() {
  const listings = await listPublishedListingsServer();
  return (
    <>
      <Hero
        image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop"
        title="Listings"
        subtitle="Mississauga · Toronto · Milton · Oakville"
        primaryCta={{ label: "Book a Consultation", href: "/contact" }}
        secondaryCta={{ label: SITE_PHONE, href: SITE_PHONE_TEL }}
        adminSlot={<AddListingButton />}
        large={false}
      />

      <ListingsSection initialListings={listings} title="Browse Listings" />

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-6">Browse Listings by Category</h2>
            <p className="text-gray-600 leading-relaxed">
              Explore homes for sale, condos for rent, and commercial opportunities across Mississauga, Toronto, Milton, Oakville, and the wider GTA.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {LISTINGS_HUB_CARDS.map((card) => (
              <div
                key={card.slug}
                className="bg-muted p-10 border border-transparent hover:border-primary/20 transition-all duration-300 h-full flex flex-col"
              >
                <h3 className="font-serif text-2xl md:text-3xl text-secondary mb-4">{card.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6 flex-grow">{card.shortDesc}</p>
                <Link
                  href={card.href}
                  className="inline-flex items-center text-secondary font-bold text-xs uppercase tracking-widest hover:text-primary transition-colors group"
                >
                  View Listings <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary text-white text-center">
        <div className="container-wide">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Let&apos;s Find Your Next Property</h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
            Whether you&apos;re buying, renting, or exploring commercial opportunities—we provide strategic guidance tailored to your goals in the GTA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="bg-primary text-white hover:bg-white hover:text-secondary transition-all duration-300 px-10 py-4 font-bold uppercase tracking-widest text-sm border border-primary">Book a Consultation</button>
            </Link>
            <a href={SITE_PHONE_TEL}>
              <button className="bg-white text-secondary hover:bg-primary hover:text-white transition-all duration-300 px-10 py-4 font-bold uppercase tracking-widest text-sm">{SITE_PHONE}</button>
            </a>
          </div>
          <p className="mt-10 text-gray-500 text-sm">
            <a href={SITE_PHONE_TEL} className="text-primary hover:underline">{SITE_PHONE}</a>
            {" · "}
            <a href="mailto:concierge@kingofkings.com" className="text-primary hover:underline">concierge@kingofkings.com</a>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
