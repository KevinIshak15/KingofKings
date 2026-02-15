/**
 * Mississauga Property Management Landing Page - under Management tab.
 * CONTENT: All copy/wording is verbatim from original. Only layout/section structure changed.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { FaqAccordion } from "./FaqAccordion";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE_PHONE, SITE_PHONE_TEL } from "@/lib/site";
import { JsonLd } from "@/lib/seo/schema";
import { buildLocalBusinessSchema, buildServiceSchema, buildFAQSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "Property Management Mississauga | King of Kings Group",
  description: "Professional property management in Mississauga. Tenant screening, rent collection, maintenance coordination, and investor-focused rental oversight.",
  path: "/management/mississauga",
});

const faqs = [
  {
    question: "How much does property management cost in Mississauga?",
    answer: "Property management fees in Mississauga typically run as a percentage of monthly rent collected, plus setup fees for new clients. Exact rates depend on property type, unit count, and service level. King of Kings Group provides customized quotes. Contact us for a rental evaluation and transparent fee breakdown based on your Mississauga property.",
  },
  {
    question: "What is included in full-service property management?",
    answer: "Full-service property management in Mississauga includes tenant placement and screening, rent collection, maintenance coordination, financial reporting, and compliance support. We handle leasing, move-in coordination, vendor management, and provide monthly owner statements. Our service is designed for landlords who want complete operational oversight.",
  },
  {
    question: "Do you manage condos in Mississauga?",
    answer: "Yes. We manage condominium rental units across Mississauga, including buildings in Square One, City Centre, Port Credit, and Erin Mills. We work within condo corporation rules, coordinate with property managers when required, and ensure tenant compliance with bylaws. Contact us to discuss your condo property.",
  },
  {
    question: "How do you screen tenants?",
    answer: "We conduct thorough tenant screening including credit checks, employment and income verification, and landlord references. Our process is designed to place qualified tenants who pay on time and respect your property. We use market-based rental pricing to minimize vacancy and ensure lease terms protect your investment.",
  },
  {
    question: "How do maintenance requests work?",
    answer: "Tenants submit requests through our system. We triage urgency, coordinate with vetted contractors across the GTA, and manage repairs from start to finish. Emergency issues receive 24/7 response. You receive updates and approve non-routine expenses as needed. We maintain strong vendor relationships in Mississauga and surrounding areas.",
  },
  {
    question: "Do you help with Ontario landlord compliance?",
    answer: "Yes. We maintain RTA-aware processes for entries, notices, and terminations. We provide paralegal support for LTB matters when required and keep organized lease and communication archives. Ontario landlord compliance is built into our operational procedures so you stay protected.",
  },
  {
    question: "How quickly can you place a tenant?",
    answer: "Typical time to lease varies by property condition, pricing, and market demand. In Mississauga's competitive rental market, well-priced properties often secure tenants within two to four weeks. We use data-driven pricing and proactive marketing to minimize vacancy. Contact us for a market analysis for your property.",
  },
];

const highlights = [
  "Tenant Placement & Leasing",
  "Rent Collection & Financial Reporting",
  "Maintenance & Vendor Coordination",
  "Compliance & Documentation",
];

export default function ManagementMississaugaPage() {
  return (
    <>
      <JsonLd data={buildLocalBusinessSchema("Mississauga")} />
      <JsonLd data={buildServiceSchema("Mississauga")} />
      <JsonLd data={buildFAQSchema(faqs)} />

      <Hero
        image="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop"
        title="Property Management in Mississauga"
        subtitle="Professional oversight for landlords and investors in Ontario's third-largest city"
        primaryCta={{ label: "Request a Rental Evaluation", href: "/contact" }}
        secondaryCta={{ label: SITE_PHONE, href: SITE_PHONE_TEL }}
        large={true}
      />

      <article className="section-padding bg-white">
        <div className="container-wide">
          <div className="max-w-3xl mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-8">Professional Rental Property Management in Mississauga</h2>
            <div className="space-y-6 text-gray-600 leading-relaxed text-lg max-w-prose">
              <p>King of Kings Group provides professional property management services for landlords and investors in Mississauga who want asset protection, operational discipline, and hands-off oversight. As Ontario&apos;s third-largest city, Mississauga offers a diverse rental market—from condos in Square One and City Centre to single-family homes in Meadowvale and Port Credit. Our investor mindset ensures every property we manage is treated as a long-term asset.</p>
              <p>We combine thorough tenant placement with proactive maintenance planning, structured financial reporting, and transparent communication. Whether you own a condo in Erin Mills, a townhouse in Clarkson, or a multi-unit property in Cooksville, our approach is consistent: reduce friction, strengthen returns, and provide clarity at every stage of ownership.</p>
              <p>Our full-service <Link href="/services" className="text-primary hover:underline font-medium">property management</Link> covers tenant screening, rent collection, maintenance coordination, and compliance support. We serve out-of-town investors and local landlords alike. Ready to discuss your Mississauga property? <Link href="/contact" className="text-primary hover:underline font-medium">Contact us</Link> for a consultation.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((label) => (
              <div key={label} className="bg-muted p-10 border border-transparent hover:border-primary/20 transition-all duration-300 h-full">
                <p className="text-primary font-bold tracking-widest uppercase text-sm mb-2">What We Include</p>
                <p className="font-serif text-xl text-secondary">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </article>

      <section className="section-padding bg-muted">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-6">Tenant Placement & Leasing</h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">Quality tenants are the foundation of stress-free ownership in Mississauga. Our tenant screening and leasing process place responsible occupants who pay on time and care for your asset.</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Market-based rental pricing to minimize vacancy</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Credit, background, and income verification</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Lease drafting and execution</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Move-in coordination and documentation</li>
              </ul>
            </div>
            <div className="bg-white p-10 border border-gray-200">
              <p className="font-serif text-xl text-secondary mb-4">Quality Tenants</p>
              <p className="text-gray-600 leading-relaxed">Our tenant screening and leasing process place responsible occupants who pay on time and care for your asset.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-6">Rent Collection & Financial Reporting</h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">Our rent collection services ensure predictable cash flow for Mississauga landlords. We handle payment processing, late notices, and arrears management while keeping you informed.</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Structured rent collection and deposit handling</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Late payment enforcement and LTB escalation when needed</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Monthly owner statements with income and expenses</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Year-end summaries for tax preparation</li>
              </ul>
            </div>
            <div className="bg-muted p-10 border border-transparent">
              <p className="font-serif text-xl text-secondary mb-4">Predictable Cash Flow</p>
              <p className="text-gray-600 leading-relaxed">We handle payment processing, late notices, and arrears management while keeping you informed.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary via-secondary to-secondary" />
        <div className="container-wide relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl mb-6">Maintenance & Vendor Coordination</h2>
              <p className="text-gray-300 leading-relaxed text-lg mb-4">Effective maintenance management protects your asset value and tenant satisfaction. We coordinate repairs and manage a vetted contractor network across the GTA.</p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Preventative maintenance planning</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />24/7 emergency response protocols</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Cost control and approval workflows</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Vendor relationship management</li>
              </ul>
            </div>
            <div className="bg-white/5 p-10 border border-white/10">
              <p className="font-serif text-xl text-primary mb-4">Asset Protection</p>
              <p className="text-gray-300 leading-relaxed">Effective maintenance management protects your asset value and tenant satisfaction.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-6">Compliance & Documentation</h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">Ontario landlord responsibilities require RTA awareness. We support compliance through proper notice handling and organized record keeping.</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />RTA-aware processes for entries, notices, and terminations</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Paralegal support for LTB matters when required</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Organized lease and communication archives</li>
              </ul>
            </div>
            <div className="bg-white p-10 border border-gray-200">
              <p className="font-serif text-xl text-secondary mb-4">Ontario Compliance</p>
              <p className="text-gray-600 leading-relaxed">We support compliance through proper notice handling and organized record keeping.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-8">Neighborhoods & Communities We Serve in Mississauga</h2>
          <p className="text-gray-700 leading-relaxed text-lg mb-10 max-w-prose">
            We provide property management across Mississauga, from the urban core to established suburban communities. Our team knows the local rental market and serves landlords throughout the city.
          </p>
          <div className="flex flex-wrap gap-3">
            {["Square One", "Port Credit", "Erin Mills", "Meadowvale", "Clarkson", "Cooksville", "City Centre"].map((area) => (
              <span key={area} className="inline-block bg-muted px-5 py-2.5 border border-gray-200 text-secondary font-medium">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="container-wide">
          <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-12">Property Owners We Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Single-Property Landlords", desc: "Professional management so you can focus on your primary career while your Mississauga rental works for you." },
              { title: "Condo Investors", desc: "Full oversight for condo rentals in Square One, City Centre, Port Credit, and across Mississauga." },
              { title: "Multi-Unit Owners", desc: "Scalable operations for duplexes, triplexes, and small multi-family properties in Mississauga." },
              { title: "Out-of-Town Investors", desc: "Remote management with local presence. We handle everything so you can invest from anywhere." },
            ].map((item) => (
              <div key={item.title} className="bg-white p-10 border border-transparent hover:border-primary/20 transition-all duration-300 h-full">
                <h3 className="font-serif text-xl text-secondary mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary text-white text-center">
        <div className="container-wide">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Ready to discuss your Mississauga property?</h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto">Contact us for a consultation and let&apos;s talk about how we can support your goals.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="bg-primary text-white hover:bg-white hover:text-secondary transition-all duration-300 px-10 py-4 font-bold uppercase tracking-widest text-sm border border-primary">Request a Rental Evaluation</button>
            </Link>
            <Link href="/contact">
              <button className="bg-white text-secondary hover:bg-primary hover:text-white transition-all duration-300 px-10 py-4 font-bold uppercase tracking-widest text-sm">Book a Consultation</button>
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-8">Why Property Owners Choose King of Kings Group</h2>
            <div className="space-y-6 text-gray-600 leading-relaxed mb-10 max-w-prose">
              <p>Property owners in Mississauga choose King of Kings Group for transparency, proactive communication, and an investor mindset. We don&apos;t treat your property as a file—we steward it as a long-term asset. Our leadership brings broker-level market insight from years of experience in the Greater Toronto Area, giving you access to disciplined operations and data-driven decisions.</p>
              <p>We deliver structured reporting, no hidden fees, and direct access when you need it. Whether you&apos;re scaling a portfolio or managing your first rental, we tailor our approach to your goals.</p>
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
          <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-12">Frequently Asked Questions About Property Management in Mississauga</h2>
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      <section className="py-24 bg-secondary text-white text-center">
        <div className="container-wide">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Request a Rental Evaluation for Your Mississauga Property</h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
            Find out what your property could earn in today&apos;s Mississauga market. We&apos;ll provide a market analysis and recommended rent range—no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
