import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/lib/seo/schema";
import { buildLocalBusinessSchema, buildServiceSchemaFor, buildFAQSchema } from "@/lib/seo/schema";
import { FaqAccordion } from "@/components/FaqAccordion";
import { SITE_PHONE, SITE_PHONE_TEL } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Services | Real Estate, Property Management & Investments | King of Kings Group",
  description: "Real estate, property management, investments, and developments in Mississauga and the GTA. Buying, selling, luxury, pre-construction. Tenant screening, rent collection. Off-market deals and strategic partnerships.",
  path: "/services",
});

const faqs = [
  {
    question: "What areas do you serve?",
    answer: "We serve Mississauga and the Greater Toronto Area, including Toronto, Brampton, Markham, Vaughan, Oakville, and surrounding municipalities. Our property management and real estate services cover the full GTA.",
  },
  {
    question: "Do you offer property management for out-of-town owners?",
    answer: "Yes. Many of our clients own rental properties in Mississauga and the GTA while living elsewhere. We provide full remote management including tenant communication, maintenance coordination, inspections, and monthly reporting.",
  },
  {
    question: "What is included in your real estate services?",
    answer: "Our real estate services cover buying, selling, luxury listings, pre-construction purchases, and assignment sales. We provide strategic guidance from acquisition through closing.",
  },
  {
    question: "How do I get a rental evaluation for my property?",
    answer: "Contact us or visit our property management page to request a free rental evaluation. We analyze comparable rentals in your area and provide a recommended rent range and market insights.",
  },
  {
    question: "Do you work with investors on joint ventures?",
    answer: "Yes. We offer JV opportunities and portfolio strategy for qualified investors. Contact us to discuss your investment goals and how we can support them.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={buildLocalBusinessSchema()} />
      <JsonLd data={buildServiceSchemaFor({ name: "Real Estate", description: "Buying, selling, luxury, pre-construction, and assignment real estate services in Mississauga and the GTA." })} />
      <JsonLd data={buildServiceSchemaFor({ name: "Property Management", description: "Full-service property management including tenant screening, rent collection, maintenance, and reporting for landlords in Mississauga and the GTA." })} />
      <JsonLd data={buildServiceSchemaFor({ name: "Real Estate Investments", description: "Off-market deals, joint venture opportunities, and portfolio strategy for investors in the Greater Toronto Area." })} />
      <JsonLd data={buildServiceSchemaFor({ name: "Developments", description: "Current projects, upcoming pipeline, and strategic development partnerships in the GTA." })} />
      <JsonLd data={buildFAQSchema(faqs)} />

      <Hero
        image="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop"
        title="Services"
        subtitle="Real Estate · Property Management · Investments · Developments in Mississauga & the GTA"
        primaryCta={{ label: "Book a Consultation", href: "/contact" }}
        secondaryCta={{ label: SITE_PHONE, href: SITE_PHONE_TEL }}
        large={false}
      />

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            <div className="bg-muted p-10 border border-transparent hover:border-primary/20 transition-all duration-300 h-full flex flex-col min-w-0">
              <p className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Pillar One</p>
              <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-6">Real Estate</h2>
              <p className="text-gray-600 leading-relaxed mb-6 flex-grow break-words min-w-0">
                King of Kings Group provides real estate services across Mississauga and the Greater Toronto Area. From first-time buyers to luxury sellers, we guide clients through buying, selling, pre-construction, and assignment transactions. Our team combines local market expertise with strategic positioning to help you move with clarity and confidence.
              </p>
              <ul className="space-y-2 text-gray-600 mb-8">
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Residential buying and selling</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Luxury real estate marketing</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Pre-construction and assignments</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Strategic acquisition and exit planning</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Data-driven pricing and negotiation</li>
              </ul>
              <Link href="/services/real-estate" className="inline-flex items-center text-secondary font-bold text-xs uppercase tracking-widest hover:text-primary transition-colors group">
                Explore Real Estate Services <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="bg-muted p-10 border border-transparent hover:border-primary/20 transition-all duration-300 h-full flex flex-col min-w-0">
              <p className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Pillar Two</p>
              <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-6">Property Management</h2>
              <p className="text-gray-600 leading-relaxed mb-6 flex-grow break-words min-w-0">
                Professional rental property management in Mississauga and the GTA. We handle tenant screening, rent collection, maintenance coordination, and transparent financial reporting so landlords can focus on growing their portfolios. Our investor mindset ensures every property is treated as a long-term asset.
              </p>
              <ul className="space-y-2 text-gray-600 mb-8">
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Tenant screening and placement</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Rent collection and arrears management</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />24/7 maintenance coordination</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Monthly owner statements and reporting</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Ontario RTA compliance and LTB support</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Portfolio-level guidance</li>
              </ul>
              <Link href="/services/property-management" className="inline-flex items-center text-secondary font-bold text-xs uppercase tracking-widest hover:text-primary transition-colors group">
                Explore Property Management <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="bg-muted p-10 border border-transparent hover:border-primary/20 transition-all duration-300 h-full flex flex-col min-w-0">
              <p className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Pillar Three</p>
              <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-6">Investments</h2>
              <p className="text-gray-600 leading-relaxed mb-6 flex-grow break-words min-w-0">
                Investor-focused real estate services in Mississauga and the GTA. We connect qualified investors with off-market deals, joint venture structures, and portfolio strategy. Our approach combines data-driven analysis with disciplined execution to support long-term wealth building through real estate.
              </p>
              <ul className="space-y-2 text-gray-600 mb-8">
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Off-market and pre-market opportunities</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Joint venture structuring</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Portfolio strategy and scaling</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Pro-forma and due diligence support</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Acquisition and exit planning</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Investor network access</li>
              </ul>
              <Link href="/services/investments" className="inline-flex items-center text-secondary font-bold text-xs uppercase tracking-widest hover:text-primary transition-colors group">
                Explore Investments <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="bg-muted p-10 border border-transparent hover:border-primary/20 transition-all duration-300 h-full flex flex-col min-w-0">
              <p className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Pillar Four</p>
              <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-6">Developments</h2>
              <p className="text-gray-600 leading-relaxed mb-6 flex-grow break-words min-w-0">
                Strategic development and partnership opportunities in the GTA. We work on current projects, evaluate the upcoming pipeline, and pursue vision-aligned partnerships. Our approach is disciplined—no exaggerated claims, compliance-safe language, and clear communication with qualified partners.
              </p>
              <ul className="space-y-2 text-gray-600 mb-8">
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Current projects and pipeline</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Strategic vision and planning</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Partnership inquiries and due diligence</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Disciplined execution and reporting</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Compliance and transparency</li>
              </ul>
              <Link href="/services/developments" className="inline-flex items-center text-secondary font-bold text-xs uppercase tracking-widest hover:text-primary transition-colors group">
                Explore Developments <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary via-secondary to-secondary" />
        <div className="container-wide relative z-10">
          <h2 className="font-serif text-3xl md:text-4xl mb-8 text-center">Who We Work With</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <p className="text-primary font-bold text-sm uppercase tracking-widest mb-2">Owners</p>
              <p className="text-gray-400 text-sm">Residential and investment property owners seeking professional oversight</p>
            </div>
            <div>
              <p className="text-primary font-bold text-sm uppercase tracking-widest mb-2">Landlords</p>
              <p className="text-gray-400 text-sm">Single-property and multi-unit landlords in Mississauga and the GTA</p>
            </div>
            <div>
              <p className="text-primary font-bold text-sm uppercase tracking-widest mb-2">Investors</p>
              <p className="text-gray-400 text-sm">Individuals building wealth through real estate in Ontario</p>
            </div>
            <div>
              <p className="text-primary font-bold text-sm uppercase tracking-widest mb-2">Buyers & Sellers</p>
              <p className="text-gray-400 text-sm">Clients navigating purchase, sale, or assignment transactions</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="container-wide max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-12">Frequently Asked Questions</h2>
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      <section className="py-24 bg-secondary text-white text-center">
        <div className="container-wide">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Let&apos;s Build a Clear Plan for Your Next Move</h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
            Whether you&apos;re buying, selling, managing, or investing—we provide strategic guidance tailored to your goals in Mississauga and the GTA.
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
