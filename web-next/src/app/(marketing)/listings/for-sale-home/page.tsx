import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { AddListingButton } from "@/components/admin/AddListingButton";
import { ListingsSection } from "@/components/listings/ListingsSection";
import { listPublishedListingsServer } from "@/lib/listings/server";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE_EMAIL, SITE_PHONE, SITE_PHONE_TEL } from "@/lib/site";

export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  title: "Homes for Sale GTA | King of Kings Group",
  description: "Browse homes for sale across the GTA. View listings and book a consultation to find the right property.",
  path: "/listings/for-sale-home",
});

export default async function ForSaleHomePage() {
  const listings = await listPublishedListingsServer({ listingType: "sale", propertyCategory: "home" });
  return (
    <>
      <Hero
        image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop"
        title="Homes for Sale"
        subtitle="Mississauga · Toronto · Milton · Oakville"
        primaryCta={{ label: "Book a Consultation", href: "/contact" }}
        secondaryCta={{ label: SITE_PHONE, href: SITE_PHONE_TEL }}
        adminSlot={<AddListingButton />}
        large={false}
      />

      <ListingsSection
        initialListings={listings}
        listingType="sale"
        propertyCategory="home"
        title="Available Listings"
      />

      <section className="section-padding bg-white">
        <div className="container-wide max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-6">About Homes for Sale Listings in the GTA</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Browse single-family homes and townhouses for sale across Mississauga, Toronto, Milton, Oakville, and the Greater Toronto Area. Our listings include a range of properties suited to first-time buyers, families, and investors. Each listing provides key details to help you narrow your search before scheduling a viewing.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Whether you are looking for a primary residence or an investment property, our team at King of Kings Group can guide you through the process. <Link href="/services/real-estate" className="text-primary hover:underline font-medium">Real estate services</Link> include acquisition strategy, negotiation, and closing support. <Link href="/contact" className="text-primary hover:underline font-medium">Contact us</Link> to discuss your criteria and next steps.
          </p>
        </div>
      </section>

      <section className="py-24 bg-secondary text-white text-center">
        <div className="container-wide">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Ready to Find Your Next Home?</h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
            Book a consultation to discuss your criteria and view properties that match your goals.
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
            <a href={`mailto:${SITE_EMAIL}`} className="text-primary hover:underline">{SITE_EMAIL}</a>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
