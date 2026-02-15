import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/lib/seo/schema";
import { buildLocalBusinessSchema, buildServiceSchemaFor } from "@/lib/seo/schema";
import { SITE_PHONE, SITE_PHONE_TEL } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Real Estate Investments GTA | King of Kings Group",
  description: "Investor-focused real estate services across Mississauga and the GTA, including off-market opportunities, JV structures, and portfolio strategy.",
  path: "/services/investments",
});

export default function InvestmentsServicesPage() {
  return (
    <>
      <JsonLd data={buildLocalBusinessSchema()} />
      <JsonLd data={buildServiceSchemaFor({
        name: "Real Estate Investment Services",
        description: "Investor-focused real estate services in Mississauga and the GTA: off-market deals, joint venture opportunities, and portfolio strategy.",
      })} />

      <Hero
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
        title="Real Estate Investment Services in Mississauga & the GTA"
        subtitle="Off-Market · Joint Ventures · Portfolio Strategy"
        primaryCta={{ label: "Book a Consultation", href: "/contact" }}
        secondaryCta={{ label: SITE_PHONE, href: SITE_PHONE_TEL }}
        large={false}
      />

      <article className="section-padding bg-white">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Investor-Focused</p>
            <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-8">Strategic Real Estate Investment Across Mississauga and the GTA</h2>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>King of Kings Group provides investor-focused real estate services in Mississauga and the Greater Toronto Area. We connect qualified investors with off-market and pre-market opportunities, joint venture structures, and portfolio strategy. Our approach combines data-driven analysis with disciplined execution—we do not offer guarantees or promise specific returns; we provide strategic guidance, due diligence support, and access to opportunities that align with your risk tolerance and goals.</p>
              <p>Whether you&apos;re acquiring your first investment property, scaling a portfolio, or exploring joint venture structures in Ontario, we work alongside you to evaluate deals, structure transactions, and plan acquisition and exit strategies. Real estate investing carries risk; past performance does not predict future results. We help you make informed decisions based on market data, pro-forma analysis, and long-term planning—not hype.</p>
            </div>
          </div>
        </div>
      </article>

      <section className="section-padding bg-muted">
        <div className="container-wide">
          <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-12 text-center">What We Offer Investors</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div id="off-market-deals" className="bg-white p-10 border border-transparent hover:border-primary/20 transition-all duration-300 h-full flex flex-col scroll-mt-24">
              <h3 className="font-serif text-xl text-secondary mb-4">Off-Market and Pre-Market Deals</h3>
              <p className="text-gray-600 leading-relaxed mb-4 flex-grow">Access to opportunities that never reach the public market. Through our network of developers, owners, and brokers, we connect qualified investors with pre-market and off-market real estate deals across Mississauga and the GTA. These opportunities require due diligence and disciplined evaluation—we provide pro-forma analysis, comparable research, and risk assessment to help you decide.</p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-3 rounded-full mt-2 shrink-0" />Pre-market and off-market deal flow</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-3 rounded-full mt-2 shrink-0" />Pro-forma and valuation support</li>
              </ul>
            </div>
            <div id="jv-opportunities" className="bg-white p-10 border border-transparent hover:border-primary/20 transition-all duration-300 h-full flex flex-col scroll-mt-24">
              <h3 className="font-serif text-xl text-secondary mb-4">Joint Venture Opportunities</h3>
              <p className="text-gray-600 leading-relaxed mb-4 flex-grow">For qualified investors seeking JV structures in Ontario and the GTA, we facilitate joint venture arrangements that align capital with execution. JV deals involve shared risk and shared upside—we help structure terms, define roles, and ensure clear documentation. Not all investors are suited to JV investing; we work with those who understand the risks and are prepared for the commitment.</p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-3 rounded-full mt-2 shrink-0" />JV structuring and term negotiation</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-3 rounded-full mt-2 shrink-0" />Documentation and compliance support</li>
              </ul>
            </div>
            <div id="portfolio-strategy" className="bg-white p-10 border border-transparent hover:border-primary/20 transition-all duration-300 h-full flex flex-col scroll-mt-24">
              <h3 className="font-serif text-xl text-secondary mb-4">Portfolio Strategy</h3>
              <p className="text-gray-600 leading-relaxed mb-4 flex-grow">Scaling a real estate portfolio requires a plan. We help investors evaluate acquisition targets, analyze cash flow and appreciation potential, and plan exits. Our portfolio-level guidance includes market positioning, asset mix, and long-term wealth-building strategy. We do not provide financial advice or guarantee returns—we provide real estate expertise to support your investment decisions.</p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-3 rounded-full mt-2 shrink-0" />Acquisition and exit planning</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-3 rounded-full mt-2 shrink-0" />Portfolio optimization guidance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary via-secondary to-secondary" />
        <div className="container-wide relative z-10 max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl mb-8">Important Disclosures</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            Real estate investing involves risk. Past performance is not indicative of future results. No investment strategy—including real estate, off-market deals, or joint ventures—can guarantee returns or protect against loss. Market conditions, interest rates, and property-specific factors can impact outcomes.
          </p>
          <p className="text-gray-300 leading-relaxed">
            King of Kings Group provides real estate services and strategic guidance. We do not provide legal, tax, or financial advice. Consult qualified professionals before making investment decisions. JV structures and off-market opportunities require independent due diligence and professional review.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-6">How We Work With Investors</h2>
              <p className="text-gray-700 leading-relaxed mb-6">We begin with a consultation to understand your goals, experience, and risk tolerance. From there, we tailor our approach: some investors need acquisition support and due diligence; others seek JV introductions or portfolio strategy. We maintain a disciplined process—no pressure, no hype—and connect you with opportunities that fit your criteria.</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Goal alignment and risk assessment</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Pro-forma and due diligence support</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Acquisition and closing coordination</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Ongoing portfolio and property management referrals</li>
              </ul>
            </div>
            <div className="bg-muted p-10 border border-transparent hover:border-primary/20 transition-all duration-300">
              <p className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Adding Management?</p>
              <p className="text-gray-600 leading-relaxed mb-4">If you&apos;re acquiring rental properties, we offer full-service property management across Mississauga and the GTA. Tenants, maintenance, reporting—handled.</p>
              <Link href="/services/property-management" className="inline-flex items-center text-secondary font-bold text-xs uppercase tracking-widest hover:text-primary transition-colors">
                Explore Property Management
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary text-white text-center">
        <div className="container-wide">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Let&apos;s Build a Clear Plan for Your Next Move</h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
            Interested in off-market opportunities, JV structures, or portfolio strategy? Book a consultation to discuss your investment goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="bg-primary text-white hover:bg-white hover:text-secondary transition-all duration-300 px-10 py-4 font-bold uppercase tracking-widest text-sm border border-primary">Book a Consultation</button>
            </Link>
            <Link href="/services/real-estate">
              <button className="bg-white text-secondary hover:bg-primary hover:text-white transition-all duration-300 px-10 py-4 font-bold uppercase tracking-widest text-sm">Explore Real Estate</button>
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
