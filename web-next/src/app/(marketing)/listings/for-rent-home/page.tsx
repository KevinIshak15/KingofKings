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
  title: "Homes for Rent GTA | King of Kings Group",
  description: "Browse homes for rent across the GTA. View listings and connect with our team for availability and next steps.",
  path: "/listings/for-rent-home",
});

export default async function ForRentHomePage() {
  const listings = await listPublishedListingsServer({ listingType: "rent", propertyCategory: "home" });
  return (
    <>
      <Hero
        image="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop"
        title="Homes for Rent"
        subtitle="Mississauga · Toronto · Milton · Oakville"
        primaryCta={{ label: "Book a Consultation", href: "/contact" }}
        secondaryCta={{ label: SITE_PHONE, href: SITE_PHONE_TEL }}
        adminSlot={<AddListingButton />}
        large={false}
      />

      <ListingsSection
        initialListings={listings}
        listingType="rent"
        propertyCategory="home"
        title="Available Listings"
      />

      <section className="section-padding bg-white">
        <div className="container-wide max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-6">About Homes for Rent Listings in the GTA</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Browse single-family homes and townhouses available for rent across Mississauga, Toronto, Milton, Oakville, and the Greater Toronto Area. Our rental listings provide key details to help you find a property that fits your needs. Many of these properties are managed by King of Kings Group, offering streamlined leasing and professional property management.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Whether you are relocating, upgrading, or seeking a longer-term rental, our team can help you schedule viewings and understand availability. <Link href="/services/real-estate" className="text-primary hover:underline font-medium">Real estate services</Link> include rental search support and lease coordination. <Link href="/contact" className="text-primary hover:underline font-medium">Contact us</Link> to discuss your criteria and next steps.
          </p>
        </div>
      </section>

      <section className="py-24 bg-secondary text-white text-center">
        <div className="container-wide">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Ready to Find Your Next Rental?</h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
            Connect with our team to view available homes and discuss lease terms.
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
