import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE_PHONE, SITE_PHONE_TEL } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "About King of Kings Group | Property Management GTA",
  description: "Strategic property management in the Greater Toronto Area. Built to protect and enhance long-term value. Professional oversight, disciplined operations, investor-focused.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Hero
        image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop"
        title="About King of Kings Group"
        subtitle="Strategic property management in the Greater Toronto Area"
        primaryCta={{ label: "Book a Consultation", href: "/contact" }}
        secondaryCta={{ label: SITE_PHONE, href: SITE_PHONE_TEL }}
        large={false}
      />

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20 px-0">
            <h2 className="text-primary font-bold tracking-widest uppercase text-xs sm:text-sm mb-4 sm:mb-6">Our Leadership</h2>
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-secondary mb-6 sm:mb-8 leading-tight">The Vision Behind King of Kings Group</h3>
            <p className="text-gray-600 leading-relaxed text-base sm:text-lg md:text-xl">
              Over a decade of experience in real estate, property management, and investment strategy across the Greater Toronto Area.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
            <div className="order-1 relative">
              <Image
                src="/ragymoussa.jpg"
                alt="Ragy Moussa, CEO and Founder of Moussa Homes"
                width={600}
                height={600}
                className="w-full h-[min(70vw,22rem)] xs:h-[min(75vw,26rem)] sm:h-[min(80vw,28rem)] md:h-[32rem] lg:h-[600px] object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary p-8 hidden md:block">
                <p className="text-secondary font-bold text-xl uppercase tracking-widest leading-tight">Expertise <br /> Driven</p>
              </div>
            </div>
            <div className="order-2 space-y-8">
              <div>
                <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Leadership</h2>
                <h3 className="font-serif text-3xl md:text-4xl text-secondary mb-4">Meet Ragy Moussa</h3>
                <p className="text-secondary/70 text-sm font-bold uppercase tracking-widest mb-6">Partner | CEO & Founder, Moussa Homes · Award-Winning Real Estate Broker</p>
                <div className="space-y-6 text-gray-600 leading-relaxed">
                  <p>Ragy Moussa is a seasoned real estate broker and developer with over a decade of experience in the Greater Toronto Area real estate market.</p>
                  <p>As CEO and Founder of Moussa Homes and an award-winning broker with Keller Williams Real Estate Associates, Ragy has consistently delivered top-tier performance since 2015.</p>
                  <p>His experience spans:</p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Residential sales strategy</li>
                    <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Investment acquisition analysis</li>
                    <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Deal structuring and negotiation</li>
                    <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />New construction development</li>
                    <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Exit planning and portfolio scaling</li>
                  </ul>
                  <p>Ragy has guided investors and homeowners through high-return real estate ventures across the GTA, making him a strategic partner in maximizing asset value.</p>
                  <p>His deep market insight, established network, and disciplined approach to execution strengthen King of Kings Group&apos;s ability to deliver reliable, performance-driven property management solutions.</p>
                </div>
                <div className="flex flex-wrap gap-4 mt-8">
                  <Link href="/services" className="inline-flex items-center text-secondary font-bold text-xs uppercase tracking-widest hover:text-primary transition-colors group">
                    View Services <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link href="/contact" className="inline-flex items-center text-secondary font-bold text-xs uppercase tracking-widest hover:text-primary transition-colors group">
                    Book a Consultation <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <article className="section-padding bg-muted">
        <div className="container-wide">
          <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Our Story</h2>
          <h3 className="font-serif text-3xl md:text-4xl text-secondary mb-8">Strategic Property Management in the Greater Toronto Area</h3>
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>King of Kings Group is a Greater Toronto Area property management company built to protect and enhance the long-term value of residential real estate assets. We serve landlords and investors across the GTA who want professional oversight, disciplined operations, and performance-driven management.</p>
            <p>Our approach is rooted in an investor mindset. Every property we manage is treated as a long-term asset requiring strong tenant placement, proactive maintenance planning, structured financial reporting, and transparent communication.</p>
            <p>Whether you own a single rental property or a growing investment portfolio in the Greater Toronto Area, our mission remains consistent: reduce friction, strengthen returns, and provide clarity at every stage of ownership.</p>
            <p className="font-semibold text-secondary">We do not simply manage properties. We steward assets.</p>
          </div>
          <div className="flex flex-wrap gap-4 mt-10">
            <Link href="/property-management" className="inline-flex items-center bg-secondary text-white hover:bg-primary hover:text-secondary transition-all duration-300 px-8 py-4 font-bold uppercase tracking-widest text-sm">
              Property Management <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link href="/services" className="inline-flex items-center border border-secondary text-secondary hover:bg-secondary hover:text-white transition-all duration-300 px-8 py-4 font-bold uppercase tracking-widest text-sm">
              Explore Services <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>

      <section className="section-padding bg-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary via-secondary to-secondary" />
        <div className="container-wide relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
            <div className="space-y-6">
              <div className="inline-block border-b border-primary pb-2 mb-4">
                <h2 className="text-primary font-bold tracking-widest uppercase text-sm">Our Mission</h2>
              </div>
              <h3 className="font-serif text-3xl md:text-4xl mb-6">Empowering Confidence Through Professional Property Management</h3>
              <p className="text-gray-300 leading-relaxed text-lg">King of Kings Group is committed to elevating the real estate experience through expert guidance, disciplined investment strategy, and professional property management services in the Greater Toronto Area.</p>
              <p className="text-gray-300 leading-relaxed">We protect and grow our clients&apos; assets by delivering:</p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Thorough tenant screening and strategic leasing</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Structured maintenance coordination</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Clear monthly financial reporting</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Transparent communication</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Data-informed decision-making</li>
              </ul>
              <p className="text-gray-300 leading-relaxed text-lg pt-4">Our mission is simple: provide property owners with the confidence that their real estate investments are being managed with precision, integrity, and accountability.</p>
              <Link href="/property-management" className="inline-flex items-center text-primary font-bold text-xs uppercase tracking-widest hover:text-white transition-colors group mt-6">
                Property Management <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="space-y-6">
              <div className="inline-block border-b border-primary pb-2 mb-4">
                <h2 className="text-primary font-bold tracking-widest uppercase text-sm">Our Vision</h2>
              </div>
              <h3 className="font-serif text-3xl md:text-4xl mb-6">Building a Legacy of High-Performance Real Estate Management</h3>
              <p className="text-gray-300 leading-relaxed text-lg">We envision King of Kings Group as a leading authority in property management and real estate investment strategy across the Greater Toronto Area.</p>
              <p className="text-gray-300 leading-relaxed">Our goal is to shape communities through:</p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Smart development planning</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Strategic acquisition and exit strategies</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />High-performance property management systems</li>
              </ul>
              <p className="text-gray-300 leading-relaxed text-lg pt-4">We are building more than a company.</p>
              <p className="text-gray-300 leading-relaxed text-lg font-semibold">We are building a legacy brand defined by stability, disciplined growth, and long-term wealth creation.</p>
              <div className="flex flex-wrap gap-4 mt-6">
                <Link href="/services/developments" className="inline-flex items-center text-primary font-bold text-xs uppercase tracking-widest hover:text-white transition-colors group">
                  Developments <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/services/investments" className="inline-flex items-center text-primary font-bold text-xs uppercase tracking-widest hover:text-white transition-colors group">
                  Investments <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
            <div>
              <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Our Approach</h2>
              <h3 className="font-serif text-4xl text-secondary mb-8">Asset Stewardship with an Investor Mindset</h3>
              <p className="text-gray-700 leading-relaxed mb-8">Every property requires structure, oversight, and strategic planning. Our approach focuses on protecting both operational performance and long-term asset value.</p>
              <div className="space-y-8">
                <div>
                  <h4 className="font-serif text-xl text-secondary mb-3">Tenant Placement & Leasing</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Rigorous screening standards</li>
                    <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Financial qualification and background checks</li>
                    <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Market-informed rental pricing strategies</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-serif text-xl text-secondary mb-3">Proactive Property Care</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Preventative maintenance planning</li>
                    <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Responsive coordination with vetted contractors</li>
                    <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Cost-control oversight</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-serif text-xl text-secondary mb-3">Transparent Communication</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Clear reporting cycles</li>
                    <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Organized documentation</li>
                    <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Direct owner access to performance updates</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-serif text-xl text-secondary mb-3">Portfolio-Level Strategy</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Guidance aligned with long-term growth</li>
                    <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Performance evaluation and repositioning insights</li>
                    <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Data-driven recommendations for optimization</li>
                  </ul>
                </div>
              </div>
              <p className="italic text-gray-600 border-l-2 border-primary pl-4 mt-8">We treat every property as a long-term investment—because that&apos;s what it is.</p>
              <Link href="/property-management" className="inline-flex items-center text-secondary font-bold text-xs uppercase tracking-widest hover:text-primary transition-colors group mt-8">
                Explore Property Management <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="relative w-full min-h-[400px] lg:h-full">
              <Image src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&h=1200&fit=crop&auto=format" alt="King of Kings property management — professional real estate asset stewardship in the GTA" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-top grayscale opacity-90" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary text-white text-center">
        <div className="container-wide">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Ready for professional property management?</h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto">Let&apos;s talk about your property and how we can support your goals across the Greater Toronto Area.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="bg-primary text-white hover:bg-white hover:text-secondary transition-all duration-300 px-10 py-4 font-bold uppercase tracking-widest text-sm border border-primary">Book a Consultation</button>
            </Link>
            <a href={SITE_PHONE_TEL}>
              <button className="bg-white text-secondary hover:bg-primary hover:text-white transition-all duration-300 px-10 py-4 font-bold uppercase tracking-widest text-sm">{SITE_PHONE}</button>
            </a>
          </div>
          <p className="mt-10 text-gray-500 text-sm">
            Explore our <Link href="/property-management/toronto" className="text-primary hover:underline">Toronto</Link>, <Link href="/property-management/mississauga" className="text-primary hover:underline">Mississauga</Link>, <Link href="/property-management/milton" className="text-primary hover:underline">Milton</Link>, and <Link href="/property-management/oakville" className="text-primary hover:underline">Oakville</Link> property management services.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
