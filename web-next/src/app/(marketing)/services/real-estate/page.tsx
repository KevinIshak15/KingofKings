import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/lib/seo/schema";
import { buildLocalBusinessSchema, buildServiceSchemaFor } from "@/lib/seo/schema";
import { SITE_PHONE, SITE_PHONE_TEL } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Real Estate Services Mississauga | King of Kings Group",
  description: "Buying, selling, luxury and pre-construction real estate services across Mississauga and the GTA. Strategic guidance from acquisition to closing.",
  path: "/services/real-estate",
});

export default function RealEstateServicesPage() {
  return (
    <>
      <JsonLd data={buildLocalBusinessSchema()} />
      <JsonLd data={buildServiceSchemaFor({
        name: "Real Estate Services",
        description: "Buying, selling, luxury, pre-construction, and assignment real estate services in Mississauga and the Greater Toronto Area.",
        cityName: "Mississauga",
      })} />

      <Hero
        image="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop"
        title="Real Estate Services in Mississauga & the GTA"
        subtitle="Buy · Sell · Luxury · Pre-Construction · Assignments"
        primaryCta={{ label: "Book a Consultation", href: "/contact" }}
        secondaryCta={{ label: SITE_PHONE, href: SITE_PHONE_TEL }}
        large={false}
      />

      <article className="section-padding bg-white">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Full-Service Representation</p>
            <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-8">Strategic Real Estate Across Mississauga and the GTA</h2>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>King of Kings Group provides end-to-end real estate services in Mississauga and the Greater Toronto Area. Whether you&apos;re buying your first home, selling a luxury property, or navigating pre-construction and assignment sales, we combine local market expertise with disciplined execution to help you move with clarity.</p>
              <p>Our approach is built on data-driven pricing, strategic positioning, and transparent communication. We treat every transaction as a long-term decision—not a quick close—and work alongside you from initial planning through closing day.</p>
            </div>
          </div>
        </div>
      </article>

      <section className="section-padding bg-muted">
        <div className="container-wide">
          <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-12 text-center">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div id="buying" className="bg-white p-8 border border-transparent hover:border-primary/20 transition-all duration-300 scroll-mt-24">
              <h3 className="font-serif text-xl text-secondary mb-4">Buying</h3>
              <p className="text-gray-600 leading-relaxed mb-4">Strategic guidance from search to closing. We help you identify the right properties, negotiate confidently, and navigate inspections, financing, and legal due diligence across Mississauga and the GTA.</p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-3 rounded-full mt-2 shrink-0" />Market analysis and neighbourhood insights</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-3 rounded-full mt-2 shrink-0" />Pro forma and investment evaluation</li>
              </ul>
            </div>
            <div id="selling" className="bg-white p-8 border border-transparent hover:border-primary/20 transition-all duration-300 scroll-mt-24">
              <h3 className="font-serif text-xl text-secondary mb-4">Selling</h3>
              <p className="text-gray-600 leading-relaxed mb-4">We position your property for maximum exposure and value. Data-backed pricing, professional marketing, and skilled negotiation help you achieve the best outcome in Mississauga&apos;s dynamic real estate market.</p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-3 rounded-full mt-2 shrink-0" />Pricing strategy and market positioning</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-3 rounded-full mt-2 shrink-0" />Staging and presentation guidance</li>
              </ul>
            </div>
            <div id="luxury" className="bg-white p-8 border border-transparent hover:border-primary/20 transition-all duration-300 scroll-mt-24">
              <h3 className="font-serif text-xl text-secondary mb-4">Luxury Real Estate</h3>
              <p className="text-gray-600 leading-relaxed mb-4">Discrete, high-touch representation for premium properties in Mississauga and the GTA. We market luxury homes to a qualified audience with tailored strategies that respect your privacy and timeline.</p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-3 rounded-full mt-2 shrink-0" />Private and off-market marketing</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-3 rounded-full mt-2 shrink-0" />Qualified buyer and investor network</li>
              </ul>
            </div>
            <div id="pre-construction" className="bg-white p-8 border border-transparent hover:border-primary/20 transition-all duration-300 scroll-mt-24">
              <h3 className="font-serif text-xl text-secondary mb-4">Pre-Construction</h3>
              <p className="text-gray-600 leading-relaxed mb-4">Access to pre-construction inventory across the GTA. We help you evaluate developer track records, unit selection, deposit structures, and projected timelines before you commit.</p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-3 rounded-full mt-2 shrink-0" />Developer due diligence</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-3 rounded-full mt-2 shrink-0" />Contract review and risk assessment</li>
              </ul>
            </div>
            <div id="assignments" className="bg-white p-8 border border-transparent hover:border-primary/20 transition-all duration-300 scroll-mt-24">
              <h3 className="font-serif text-xl text-secondary mb-4">Assignments</h3>
              <p className="text-gray-600 leading-relaxed mb-4">Assignment sales require specialized knowledge. We guide buyers and sellers through pricing, developer approval, legal documentation, and closing logistics to ensure a smooth transaction.</p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-3 rounded-full mt-2 shrink-0" />Assignment-specific valuation</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-3 rounded-full mt-2 shrink-0" />Developer and legal coordination</li>
              </ul>
            </div>
            <div className="bg-white p-8 border border-transparent hover:border-primary/20 flex flex-col justify-center">
              <p className="text-primary font-bold tracking-widest uppercase text-sm mb-2">Also Need Management?</p>
              <p className="text-gray-600 mb-4">If you&apos;re adding to a rental portfolio, we offer full-service property management across Mississauga and the GTA.</p>
              <Link href="/services/property-management" className="inline-flex items-center text-secondary font-bold text-xs uppercase tracking-widest hover:text-primary transition-colors group">
                Explore Property Management
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary text-white">
        <div className="container-wide max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl mb-8">Our Process</h2>
          <div className="space-y-8">
            <div>
              <h3 className="font-serif text-xl text-primary mb-2">1. Strategy & Planning</h3>
              <p className="text-gray-400 leading-relaxed">We clarify your goals, timeline, and budget. Whether buying or selling, we build a plan tailored to your situation in the Mississauga and GTA market.</p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-primary mb-2">2. Execution</h3>
              <p className="text-gray-400 leading-relaxed">For buyers: targeted search, viewings, and offer strategy. For sellers: pricing, marketing, showings, and negotiation. We manage every step with clear communication.</p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-primary mb-2">3. Due Diligence & Closing</h3>
              <p className="text-gray-400 leading-relaxed">Inspections, financing conditions, legal review, and closing coordination. We ensure nothing falls through the cracks before possession.</p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-primary mb-2">4. Post-Close Support</h3>
              <p className="text-gray-400 leading-relaxed">Referrals to property management, renovation contacts, or ongoing investment strategy. We remain a resource long after the deal closes.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary text-white text-center border-t border-white/10">
        <div className="container-wide">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Let&apos;s Build a Clear Plan for Your Next Move</h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
            Buying or selling in Mississauga or the GTA? Get strategic guidance tailored to your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="bg-primary text-white hover:bg-white hover:text-secondary transition-all duration-300 px-10 py-4 font-bold uppercase tracking-widest text-sm border border-primary">Book a Consultation</button>
            </Link>
            <Link href="/services/investments">
              <button className="bg-white text-secondary hover:bg-primary hover:text-white transition-all duration-300 px-10 py-4 font-bold uppercase tracking-widest text-sm">Explore Investments</button>
            </Link>
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
