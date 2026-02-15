/**
 * City property management page - under Management tab.
 * Content from getCityContent is verbatim; only layout/sections changed.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cities } from "@/lib/cities";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE_PHONE, SITE_PHONE_TEL } from "@/lib/site";
import { buildLocalBusinessSchema, buildServiceSchema, buildFAQSchema, JsonLd } from "@/lib/seo/schema";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { getCityContent } from "@/lib/city-content";
import { CityFaqAccordion } from "./CityFaqAccordion";

type Props = { params: Promise<{ city: string }> };

export async function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const cityData = cities.find((c) => c.slug === city);
  if (!cityData) return {};
  return buildMetadata({
    title: `Property Management ${cityData.name} | ${cityData.region} | King Of Kings`,
    description: `Professional property management in ${cityData.name}, ${cityData.region}. Tenant placement, maintenance, financial reporting. Trusted by landlords and investors. Free rental analysis.`,
    path: `/management/${city}`,
  });
}

const serviceHighlights = [
  "Tenant placement and screening",
  "Rent collection and arrears management",
  "24/7 maintenance coordination",
  "Monthly financial statements",
];

const servicesList = [
  "Full-service property management",
  "Tenant placement and screening",
  "Rent collection and arrears management",
  "24/7 maintenance coordination",
  "Regular property inspections",
  "Monthly financial statements",
  "LTB representation and paralegal support",
];

export default async function CityPage({ params }: Props) {
  const { city } = await params;
  const cityData = cities.find((c) => c.slug === city);
  if (!cityData) notFound();

  const content = getCityContent(cityData);
  const faqSchema = buildFAQSchema(content.faqs);

  return (
    <>
      <JsonLd data={buildLocalBusinessSchema(cityData.name)} />
      <JsonLd data={buildServiceSchema(cityData.name)} />
      <JsonLd data={faqSchema} />

      <Hero
        image="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop"
        title={`Property Management in ${cityData.name}`}
        subtitle={cityData.region}
        primaryCta={{ label: "Request Analysis", href: "/contact" }}
        secondaryCta={{ label: SITE_PHONE, href: SITE_PHONE_TEL }}
        large={false}
      />

      <article className="section-padding bg-white">
        <div className="container-wide">
          <div className="max-w-3xl mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-8">
              Professional Property Management for {cityData.name} Landlords
            </h2>
            <div className="space-y-6 text-gray-600 leading-relaxed text-lg max-w-prose">
              <p>{content.intro}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceHighlights.map((label) => (
              <div key={label} className="bg-muted p-10 border border-transparent hover:border-primary/20 transition-all duration-300 h-full">
                <p className="text-primary font-bold tracking-widest uppercase text-sm mb-2">What We Include</p>
                <p className="font-serif text-xl text-secondary">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </article>

      <section className="section-padding bg-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary via-secondary to-secondary" />
        <div className="container-wide relative z-10">
          <h2 className="font-serif text-3xl md:text-4xl mb-8">
            Why {cityData.name} Landlords Choose King Of Kings
          </h2>
          <p className="text-gray-300 leading-relaxed text-lg max-w-3xl">
            {content.whyUs}
          </p>
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-6">
                Tenant Screening & Placement
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">{content.tenantScreening}</p>
            </div>
            <div className="bg-white p-10 border border-gray-200">
              <p className="font-serif text-xl text-secondary mb-4">Quality Tenants</p>
              <p className="text-gray-600 leading-relaxed">
                Quality tenants are the foundation of stress-free ownership. In {cityData.name}, we use a multi-step screening process: credit checks, employment and income verification, and references from previous landlords.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-6">
                Maintenance & Repairs
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">{content.maintenance}</p>
            </div>
            <div className="bg-muted p-10 border border-transparent">
              <p className="font-serif text-xl text-secondary mb-4">Vetted Contractors</p>
              <p className="text-gray-600 leading-relaxed">
                We maintain a network of licensed, insured contractors across {cityData.name} and {cityData.region}, giving you access to preferred rates and reliable response times.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-6">
                Financial Oversight & Reporting
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">{content.financial}</p>
            </div>
            <div className="bg-white p-10 border border-gray-200">
              <p className="font-serif text-xl text-secondary mb-4">Transparent Reporting</p>
              <p className="text-gray-600 leading-relaxed">
                Every month you receive a clear statement of income, expenses, and reserves. Our transparent fee structure means you always know what you&apos;re paying—no hidden costs or surprise charges.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-8">
            The {cityData.name} Rental Market
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg max-w-prose">
            {content.market}
          </p>
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="container-wide">
          <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-12">
            Services We Offer in {cityData.name}
          </h2>
          <ul className="space-y-3 text-gray-700 leading-relaxed max-w-2xl">
            {servicesList.map((item) => (
              <li key={item} className="flex items-start">
                <span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-24 bg-secondary text-white text-center">
        <div className="container-wide">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">
            Ready to simplify your {cityData.name} investment?
          </h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
            Contact us for a free rental analysis, or explore our full range of services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="bg-primary text-white hover:bg-white hover:text-secondary transition-all duration-300 px-10 py-4 font-bold uppercase tracking-widest text-sm border border-primary">
                Contact Us
              </button>
            </Link>
            <a href={SITE_PHONE_TEL}>
              <button className="bg-white text-secondary hover:bg-primary hover:text-white transition-all duration-300 px-10 py-4 font-bold uppercase tracking-widest text-sm">
                {SITE_PHONE}
              </button>
            </a>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-12">
            Frequently Asked Questions
          </h2>
          <CityFaqAccordion faqs={content.faqs} />
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="container-wide">
          <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-8">
            Nearby Areas We Serve
          </h2>
          <div className="flex flex-wrap gap-3 mb-12">
            {content.relatedCities.map((slug) => {
              const c = cities.find((x) => x.slug === slug);
              if (!c) return null;
              return (
                <Link
                  key={c.slug}
                  href={`/management/${c.slug}`}
                  className="inline-block bg-white px-5 py-2.5 border border-gray-200 text-secondary font-medium hover:border-primary/30 transition-colors"
                >
                  {c.name}
                </Link>
              );
            })}
          </div>
          <p className="text-gray-600 leading-relaxed">
            Ready to simplify your {cityData.name} investment?{" "}
            <Link href="/contact" className="text-primary hover:underline font-medium">
              Contact us
            </Link>{" "}
            for a free rental analysis, or explore our{" "}
            <Link href="/services" className="text-primary hover:underline font-medium">
              full range of services
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="py-24 bg-secondary text-white text-center">
        <div className="container-wide">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">
            Get Your Free Rental Analysis in {cityData.name}
          </h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
            Find out exactly what your property could earn in today&apos;s market.
          </p>
          <Link href="/contact">
            <button className="bg-primary text-white hover:bg-white hover:text-secondary transition-all duration-300 px-10 py-4 font-bold uppercase tracking-widest text-sm border border-primary">
              Request Analysis
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
