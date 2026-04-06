import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { FaqAccordion } from "../FaqAccordion";
import { propertyManagementCities } from "@/lib/property-management-cities";
import { getCityFaqs } from "@/lib/property-management-city-content";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE_EMAIL, SITE_PHONE, SITE_PHONE_TEL } from "@/lib/site";
import { JsonLd } from "@/lib/seo/schema";
import { buildLocalBusinessSchema, buildServiceSchema, buildFAQSchema } from "@/lib/seo/schema";

type CitySlug = (typeof propertyManagementCities)[number]["slug"];

const cityMetadata: Record<CitySlug, { title: string; description: string }> = {
  mississauga: {
    title: "Property Management Mississauga | King of Kings Group",
    description: "Professional property management in Mississauga—tenant screening, rent collection, maintenance coordination, and transparent reporting.",
  },
  toronto: {
    title: "Property Management Toronto | King of Kings Group",
    description: "Investor-focused property management in Toronto with tenant screening, rent collection, maintenance coordination, and reliable reporting.",
  },
  milton: {
    title: "Property Management Milton | King of Kings Group",
    description: "Full-service property management in Milton for landlords and investors—leasing, maintenance coordination, rent collection, and reporting.",
  },
  oakville: {
    title: "Property Management Oakville | King of Kings Group",
    description: "Professional property management in Oakville—tenant placement, rent collection, maintenance coordination, and transparent reporting.",
  },
};

export async function generateStaticParams() {
  return propertyManagementCities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: slug } = await params;
  const meta = cityMetadata[slug as CitySlug];
  if (!meta) return {};
  return buildMetadata({
    ...meta,
    path: `/property-management/${slug}`,
  });
}

export default async function PropertyManagementCityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await params;
  const cityData = propertyManagementCities.find((c) => c.slug === slug);
  if (!cityData) notFound();

  const faqs = getCityFaqs(slug as CitySlug);
  const { name: cityName, neighborhoods } = cityData;

  const whoWeServe = [
    { title: "Single-Property Landlords", desc: `Professional management so you can focus on your primary career while your ${cityName} rental works for you.` },
    { title: "Condo Investors", desc: `Full oversight for condo rentals in ${cityName} and surrounding areas.` },
    { title: "Multi-Unit Owners", desc: `Scalable operations for duplexes, triplexes, and small multi-family properties in ${cityName}.` },
    { title: "Out-of-Town Investors", desc: "Remote management with local presence. We handle everything so you can invest from anywhere." },
  ];

  return (
    <>
      <JsonLd data={buildLocalBusinessSchema(cityName)} />
      <JsonLd data={buildServiceSchema(cityName)} />
      <JsonLd data={buildFAQSchema(faqs)} />

      <Hero
        image="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop"
        title={`Property Management in ${cityName}`}
        subtitle={`Professional oversight for landlords and investors in ${cityName}`}
        primaryCta={{ label: "Request a Rental Evaluation", href: "/contact" }}
        secondaryCta={{ label: SITE_PHONE, href: SITE_PHONE_TEL }}
        large={false}
      />

      <article className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-8">
                Professional Rental Property Management in {cityName}
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg max-w-prose">
                <p>
                  King of Kings Group provides professional property management services for landlords and investors in {cityName} who want asset protection, operational discipline, and hands-off oversight. Our investor mindset ensures every property we manage is treated as a long-term asset—with thorough tenant placement, proactive maintenance planning, structured financial reporting, and transparent communication.
                </p>
                <p>
                  Whether you own a single condo, a townhouse, or a multi-unit property in {cityName}, our approach is consistent: reduce friction, strengthen returns, and provide clarity at every stage of ownership. We combine rigorous tenant screening with market-based rental pricing to minimize vacancy, and we maintain RTA-aware processes so you stay compliant with Ontario landlord responsibilities.
                </p>
                <p>
                  Our full-service <Link href="/services/property-management" className="text-primary hover:underline font-medium">property management</Link> covers tenant screening, rent collection, maintenance coordination, and compliance support. We serve out-of-town investors and local landlords alike. Ready to discuss your {cityName} property? <Link href="/contact" className="text-primary hover:underline font-medium">Contact us</Link> for a consultation.
                </p>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="bg-muted p-10 border border-transparent hover:border-primary/20 transition-all duration-300 h-full">
                <p className="text-primary font-bold tracking-widest uppercase text-sm mb-6">What We Include</p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Tenant Screening & Leasing</li>
                  <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Proactive Maintenance</li>
                  <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Transparent Reporting</li>
                  <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Ontario Compliance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </article>

      <section className="section-padding bg-muted">
        <div className="container-wide">
          <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-8">
            Neighborhoods & Communities We Serve in {cityName}
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg mb-8 max-w-prose">
            We provide property management across {cityName}, from the urban core to established suburban communities. Our team knows the local rental market and serves landlords throughout the area.
          </p>
          <div className="flex flex-wrap gap-3">
            {neighborhoods.map((area) => (
              <span key={area} className="inline-block bg-white px-5 py-2.5 border border-gray-200 text-secondary font-medium">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-12">
            What Our {cityName} Property Management Includes
          </h2>
          <div className="space-y-12">
            <div>
              <h3 className="font-serif text-xl text-secondary mb-4">Tenant Placement & Leasing</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Quality tenants are the foundation of stress-free ownership in {cityName}. Our tenant screening and leasing process place responsible occupants who pay on time and care for your asset.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Market-based rental pricing to minimize vacancy</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Credit, background, and income verification</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Lease drafting and execution</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Move-in coordination and documentation</li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-xl text-secondary mb-4">Rent Collection & Financial Reporting</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our rent collection services ensure predictable cash flow for {cityName} landlords. We handle payment processing, late notices, and arrears management while keeping you informed.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Structured rent collection and deposit handling</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Late payment enforcement and LTB escalation when needed</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Monthly owner statements with income and expenses</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Year-end summaries for tax preparation</li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-xl text-secondary mb-4">Maintenance & Vendor Coordination</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Effective maintenance management protects your asset value and tenant satisfaction. We coordinate repairs and manage a vetted contractor network across the GTA.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Preventative maintenance planning</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />24/7 emergency response protocols</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Cost control and approval workflows</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Vendor relationship management</li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-xl text-secondary mb-4">Compliance & Documentation</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Ontario landlord responsibilities require RTA awareness. We support compliance through proper notice handling and organized record keeping.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />RTA-aware processes for entries, notices, and terminations</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Paralegal support for LTB matters when required</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Organized lease and communication archives</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="container-wide">
          <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-12">Property Owners We Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whoWeServe.map((item) => (
              <div key={item.title} className="bg-white p-10 border border-transparent hover:border-primary/20 transition-all duration-300 h-full">
                <h3 className="font-serif text-xl text-secondary mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-8">
              Why Property Owners Choose King of Kings Group in {cityName}
            </h2>
            <div className="space-y-6 text-gray-600 leading-relaxed mb-10 max-w-prose">
              <p>
                Property owners in {cityName} choose King of Kings Group for transparency, proactive communication, and an investor mindset. We don&apos;t treat your property as a file—we steward it as a long-term asset. Our leadership brings broker-level market insight from years of experience in the Greater Toronto Area, giving you access to disciplined operations and data-driven decisions.
              </p>
              <p>
                We deliver structured reporting, no hidden fees, and direct access when you need it. Whether you&apos;re scaling a portfolio or managing your first rental, we tailor our approach to your goals.
              </p>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Transparent reporting with clear monthly statements</li>
              <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Proactive communication—no surprises</li>
              <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Investor mindset focused on long-term value</li>
              <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Broker-level market insight and local expertise</li>
              <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Ontario compliance built into every process</li>
              <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Flexible service levels to match your needs</li>
            </ul>
            <p className="mt-8 text-gray-600 leading-relaxed">
              <Link href="/about" className="text-primary hover:underline font-medium">Learn more about our team and approach</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="container-wide max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-12">
            Frequently Asked Questions About Property Management in {cityName}
          </h2>
          <FaqAccordion faqs={faqs} />
          <p className="mt-8 text-gray-600">
            <Link href="/property-management" className="text-primary hover:underline font-medium">← Back to Property Management</Link>
            {" · "}
            <Link href="/services" className="text-primary hover:underline font-medium">Services</Link>
            {" · "}
            <Link href="/contact" className="text-primary hover:underline font-medium">Contact</Link>
          </p>
        </div>
      </section>

      <section className="py-24 bg-secondary text-white text-center">
        <div className="container-wide">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">
            Request a Rental Evaluation for Your {cityName} Property
          </h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
            Find out what your property could earn in today&apos;s {cityName} market. We&apos;ll provide a market analysis and recommended rent range—no obligation.
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
          <p className="mt-6 text-gray-500 text-sm">
            <Link href="/property-management" className="text-primary hover:underline">Property Management hub</Link>
            {" · "}
            <Link href="/services" className="text-primary hover:underline">Services</Link>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
