import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { propertyManagementCities } from "@/lib/property-management-cities";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/lib/seo/schema";
import { buildLocalBusinessSchema, buildServiceSchemaFor } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "Property Management Services GTA | King of Kings Group",
  description: "Full-service property management across the GTA. Explore our city pages for Mississauga, Toronto, Milton, and Oakville.",
  path: "/property-management",
});

export default function PropertyManagementHubPage() {
  return (
    <>
      <JsonLd data={buildLocalBusinessSchema()} />
      <JsonLd data={buildServiceSchemaFor({
        name: "Property Management",
        description: "Full-service property management across the Greater Toronto Area for landlords and investors. Tenant screening, rent collection, maintenance coordination, and transparent reporting.",
      })} />

      <Hero
        image="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop"
        title="Property Management Across the Greater Toronto Area"
        subtitle="Mississauga · Toronto · Milton · Oakville"
        primaryCta={{ label: "Request a Rental Evaluation", href: "/contact" }}
        secondaryCta={{ label: SITE_PHONE, href: SITE_PHONE_TEL }}
        large={false}
      />

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto mb-6">
            <p className="text-gray-600 leading-relaxed text-lg">
              King of Kings Group provides full-service property management in Mississauga, Toronto, Milton, Oakville, and the wider GTA. We combine tenant screening, rent collection, maintenance coordination, and transparent reporting so landlords can focus on growing their portfolios. Explore our city pages below for local expertise in your area.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="container-wide">
          <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-12 text-center">Property Management by City</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {propertyManagementCities.map((city) => (
              <div key={city.slug} className="bg-white p-10 border border-transparent hover:border-primary/20 transition-all duration-300 h-full flex flex-col">
                <p className="text-primary font-bold tracking-widest uppercase text-sm mb-4">{city.name}</p>
                <h3 className="font-serif text-2xl md:text-3xl text-secondary mb-4">Property Management in {city.name}</h3>
                <p className="text-gray-600 leading-relaxed mb-6 flex-grow">{city.shortDesc}</p>
                <Link href={`/property-management/${city.slug}`} className="inline-flex items-center text-secondary font-bold text-xs uppercase tracking-widest hover:text-primary transition-colors group">
                  Explore {city.name} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-8 text-center">What Full-Service Management Includes</h2>
          <div className="max-w-3xl mx-auto space-y-6 text-gray-600 leading-relaxed mb-8">
            <p>Our property management services are designed for landlords and investors who want hands-off oversight without sacrificing control. We treat every property as a long-term asset—with rigorous tenant placement, proactive maintenance, structured financial reporting, and Ontario RTA compliance built into every process.</p>
          </div>
          <ul className="space-y-3 max-w-2xl mx-auto mb-10">
            <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Tenant Screening & Leasing</li>
            <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Rent Collection & Financial Reporting</li>
            <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Maintenance & Vendor Coordination</li>
            <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Compliance & Documentation</li>
          </ul>
          <p className="text-center">
            <Link href="/services/property-management" className="text-primary hover:underline font-medium">
              Learn more about our property management services →
            </Link>
          </p>
        </div>
      </section>

      <section className="py-24 bg-secondary text-white text-center">
        <div className="container-wide">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Ready for Professional Property Management?</h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
            Request a rental evaluation or book a consultation. We&apos;ll discuss your property and how we can support your goals across the GTA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="bg-primary text-white hover:bg-white hover:text-secondary transition-all duration-300 px-10 py-4 font-bold uppercase tracking-widest text-sm border border-primary">Request a Rental Evaluation</button>
            </Link>
            <Link href="/contact">
              <button className="bg-white text-secondary hover:bg-primary hover:text-white transition-all duration-300 px-10 py-4 font-bold uppercase tracking-widest text-sm">Book a Consultation</button>
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
