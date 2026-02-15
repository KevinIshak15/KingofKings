import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE_PHONE, SITE_PHONE_TEL } from "@/lib/site";
import { JsonLd } from "@/lib/seo/schema";
import { buildLocalBusinessSchema, buildServiceSchemaFor } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "Property Management Mississauga | King of Kings Group",
  description: "Professional property management in Mississauga—tenant screening, rent collection, maintenance coordination, and transparent reporting for landlords.",
  path: "/services/property-management",
});

export default function PropertyManagementServicesPage() {
  return (
    <>
      <JsonLd data={buildLocalBusinessSchema("Mississauga")} />
      <JsonLd data={buildServiceSchemaFor({
        name: "Property Management",
        description: "Full-service rental property management in Mississauga and the GTA: tenant screening, rent collection, maintenance coordination, and transparent reporting for landlords and investors.",
        cityName: "Mississauga",
      })} />

      <Hero
        image="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop"
        title="Property Management in Mississauga"
        subtitle="Professional oversight for landlords and investors"
        primaryCta={{ label: "Request a Rental Evaluation", href: "/contact" }}
        secondaryCta={{ label: SITE_PHONE, href: SITE_PHONE_TEL }}
        large={false}
      />

      <article className="section-padding bg-white">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Rental Property Management</p>
            <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-8">Professional Property Management in Mississauga and the GTA</h2>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>King of Kings Group provides professional rental property management in Mississauga and the Greater Toronto Area. We serve landlords and investors who want hands-off oversight without sacrificing control. Our investor mindset ensures every property we manage is treated as a long-term asset—with thorough tenant placement, proactive maintenance, structured reporting, and transparent communication.</p>
              <p>Whether you own a single condo in Square One or a portfolio of units across Mississauga, Brampton, Toronto, and the wider GTA, we deliver the same disciplined approach: reduce friction, strengthen returns, and provide clarity at every stage of ownership. Many of our clients live out of town; we handle tenant communication, maintenance coordination, inspections, and monthly reporting so you can focus on your life while your properties work for you.</p>
            </div>
          </div>
        </div>
      </article>

      <section id="tenant-screening" className="section-padding bg-muted scroll-mt-24">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-6">Tenant Screening</h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">Quality tenants are the foundation of stress-free ownership. Our tenant screening and placement process is designed to place responsible occupants who pay on time and care for your property. We use credit checks, employment and income verification, and landlord references—and we price rents based on market data to minimize vacancy while protecting your investment.</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Credit and background verification</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Employment and income confirmation</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Landlord reference checks</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Market-based rental pricing</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Lease drafting and move-in coordination</li>
              </ul>
            </div>
            <div className="bg-white p-10 border border-transparent hover:border-primary/20 transition-all duration-300">
              <p className="font-serif text-xl text-secondary mb-4">Placement That Protects Your Asset</p>
              <p className="text-gray-600 leading-relaxed">Our tenant screening and leasing process is built to place qualified tenants who respect your property and meet their obligations. We minimize vacancy through data-driven pricing and proactive marketing.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="rent-collection" className="section-padding bg-white scroll-mt-24">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="order-2 lg:order-1 bg-muted p-10 border border-transparent">
              <p className="font-serif text-xl text-secondary mb-4">Predictable Cash Flow</p>
              <p className="text-gray-600 leading-relaxed">We handle payment processing, late notices, and arrears management while keeping you informed with clear monthly statements and year-end summaries.</p>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-6">Rent Collection</h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">Our rent collection services ensure predictable cash flow for Mississauga and GTA landlords. We process payments, manage deposits, enforce late-payment protocols, and escalate to the Landlord and Tenant Board when necessary. You receive monthly owner statements with income, expenses, and reserves—plus year-end summaries to simplify tax preparation.</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Structured rent collection and deposit handling</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Late payment notices and arrears management</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />LTB escalation support when required</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Monthly owner statements</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Year-end summaries for tax filing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="maintenance" className="section-padding bg-secondary text-white relative overflow-hidden scroll-mt-24">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary via-secondary to-secondary" />
        <div className="container-wide relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl mb-6">Maintenance</h2>
              <p className="text-gray-300 leading-relaxed text-lg mb-4">Effective maintenance protects your asset value and keeps tenants satisfied. We coordinate repairs through a vetted contractor network across Mississauga and the GTA. Tenants submit requests through our system; we triage urgency, obtain approvals for non-routine expenses, and manage the work from start to finish. Emergency issues receive 24/7 response.</p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />24/7 emergency response protocols</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Preventative maintenance planning</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Vetted contractor network in Mississauga and GTA</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Cost control and approval workflows</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Tenant communication and follow-up</li>
              </ul>
            </div>
            <div className="bg-white/5 p-10 border border-white/10">
              <p className="font-serif text-xl text-primary mb-4">Asset Protection</p>
              <p className="text-gray-300 leading-relaxed">Proactive and responsive maintenance keeps your property in top condition and protects long-term value. We manage the full lifecycle of every repair.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="reporting" className="section-padding bg-muted scroll-mt-24">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-6">Reporting & Compliance</h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">Transparency is non-negotiable. We provide monthly owner statements, organized documentation, and direct access to performance data. Ontario landlord responsibilities require RTA awareness—we maintain proper notice handling, entry protocols, and paralegal support for LTB matters when needed. Lease and communication archives stay organized so you always have a clear record.</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Monthly income and expense statements</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Organized lease and communication archives</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />RTA-aware entries, notices, and terminations</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Paralegal support for LTB matters</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Portfolio-level reporting for multi-property owners</li>
              </ul>
            </div>
            <div className="bg-white p-10 border border-transparent hover:border-primary/20 transition-all duration-300">
              <p className="font-serif text-xl text-secondary mb-4">Clarity at Every Step</p>
              <p className="text-gray-600 leading-relaxed">You receive clear reporting and direct access when you need it. Ontario compliance is built into our processes so you stay protected.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-8">Areas We Serve</h2>
          <p className="text-gray-700 leading-relaxed text-lg mb-6 max-w-prose">
            We provide property management across Mississauga and the Greater Toronto Area. Our primary focus is Mississauga—Ontario&apos;s third-largest city—with service extending to Toronto, Brampton, Markham, Vaughan, Oakville, and surrounding municipalities. We know the local rental markets, zoning considerations, and tenant demographics in these communities.
          </p>
          <p className="text-gray-600 mb-6">
            For Mississauga-specific details on neighborhoods, pricing, and market conditions, see our <Link href="/management/mississauga" className="text-primary hover:underline font-medium">Property Management Mississauga</Link> page.
          </p>
          <div className="flex flex-wrap gap-3">
            {["Mississauga", "Toronto", "Brampton", "Markham", "Vaughan", "Oakville", "Greater Toronto Area"].map((area) => (
              <span key={area} className="inline-block bg-muted px-5 py-2.5 border border-gray-200 text-secondary font-medium">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-6">Why Landlords Choose King of Kings Group</h2>
              <p className="text-gray-700 leading-relaxed mb-6">Property owners choose us for transparency, proactive communication, and an investor mindset. We steward your asset—not just manage a file. Our leadership brings broker-level market insight from years of experience in the GTA, giving you access to disciplined operations and data-driven decisions.</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Transparent reporting with clear monthly statements</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Investor mindset focused on long-term value</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Ontario RTA compliance built into every process</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Out-of-town investor support with full remote oversight</li>
              </ul>
            </div>
            <div className="bg-white p-10 border border-transparent hover:border-primary/20 transition-all duration-300">
              <p className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Ready to Add Real Estate?</p>
              <p className="text-gray-600 leading-relaxed mb-4">If you&apos;re expanding your portfolio, we also offer buying, selling, and investment services across Mississauga and the GTA.</p>
              <Link href="/services/real-estate" className="inline-flex items-center text-secondary font-bold text-xs uppercase tracking-widest hover:text-primary transition-colors">
                Explore Real Estate Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary text-white text-center">
        <div className="container-wide">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Let&apos;s Build a Clear Plan for Your Next Move</h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
            Request a rental evaluation or book a consultation. We&apos;ll discuss your property and how we can support your goals in Mississauga and the GTA.
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
          <p className="mt-6 text-gray-500 text-sm">
            Learn more: <Link href="/management/mississauga" className="text-primary hover:underline">Property Management Mississauga</Link>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
