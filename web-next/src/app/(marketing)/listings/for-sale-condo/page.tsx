import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { AddListingButton } from "@/components/admin/AddListingButton";
import { ListingsSection } from "@/components/listings/ListingsSection";
import { listPublishedListingsServer } from "@/lib/listings/server";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE_PHONE, SITE_PHONE_TEL } from "@/lib/site";

export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  title: "Condos for Sale GTA | King of Kings Group",
  description: "Browse condos for sale across the GTA. View listings and book a consultation with our team.",
  path: "/listings/for-sale-condo",
});

export default async function ForSaleCondoPage() {
  const listings = await listPublishedListingsServer({ listingType: "sale", propertyCategory: "condo" });
  return (
    <>
      <Hero
        image="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop"
        title="Condos for Sale"
        subtitle="Mississauga · Toronto · Milton · Oakville"
        primaryCta={{ label: "Book a Consultation", href: "/contact" }}
        secondaryCta={{ label: SITE_PHONE, href: SITE_PHONE_TEL }}
        adminSlot={<AddListingButton />}
        large={false}
      />

      <ListingsSection
        initialListings={listings}
        listingType="sale"
        propertyCategory="condo"
        title="Available Listings"
      />

      <section className="section-padding bg-white">
        <div className="container-wide max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-6">About Condos for Sale Listings in the GTA</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Browse condominiums for sale across Mississauga, Toronto, Milton, Oakville, and the Greater Toronto Area. Our condo listings cover a range of buildings and price points, from first-time buyer units to luxury penthouses. Each listing provides key details to support your search.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Whether you are downsizing, upgrading, or investing, our team can help you navigate condo purchases—including status certificate review and common expense considerations. <Link href="/services/real-estate" className="text-primary hover:underline font-medium">Real estate services</Link> include acquisition strategy and closing support. <Link href="/contact" className="text-primary hover:underline font-medium">Contact us</Link> to discuss your criteria and schedule viewings.
          </p>
        </div>
      </section>

      <section className="py-24 bg-secondary text-white text-center">
        <div className="container-wide">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Ready to Find Your Next Condo?</h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
            Book a consultation to view condos that match your criteria and goals.
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
