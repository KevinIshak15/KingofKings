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
  title: "Commercial Real Estate Listings GTA | King of Kings Group",
  description: "Explore commercial real estate listings across the GTA. Book a consultation to discuss your goals and opportunities.",
  path: "/listings/commercial",
});

export default async function CommercialListingsPage() {
  const listings = await listPublishedListingsServer({ listingType: "commercial", propertyCategory: "commercial" });
  return (
    <>
      <Hero
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
        title="Commercial Real Estate Listings"
        subtitle="Mississauga · Toronto · Milton · Oakville"
        primaryCta={{ label: "Book a Consultation", href: "/contact" }}
        secondaryCta={{ label: SITE_PHONE, href: SITE_PHONE_TEL }}
        adminSlot={<AddListingButton />}
        large={false}
      />

      <ListingsSection
        initialListings={listings}
        listingType="commercial"
        propertyCategory="commercial"
        title="Available Listings"
      />

      <section className="section-padding bg-white">
        <div className="container-wide max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-6">About Commercial Listings in the GTA</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Browse commercial real estate listings across Mississauga, Toronto, Milton, Oakville, and the Greater Toronto Area. Our commercial listings cover retail, office, industrial, and mixed-use opportunities for business owners and investors. Each listing provides key details to support your evaluation.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Whether you are acquiring, leasing, or divesting commercial space, our team can help you assess opportunities and structure transactions. <Link href="/services/real-estate" className="text-primary hover:underline font-medium">Real estate services</Link> include acquisition strategy and tenant representation. <Link href="/contact" className="text-primary hover:underline font-medium">Contact us</Link> to discuss your goals and view available properties.
          </p>
        </div>
      </section>

      <section className="py-24 bg-secondary text-white text-center">
        <div className="container-wide">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Ready to Explore Commercial Opportunities?</h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
            Book a consultation to discuss your commercial real estate goals and view available properties.
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
