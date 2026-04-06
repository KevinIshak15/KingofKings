import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { Home, BarChart3, Building2, Layers, ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/lib/seo/schema";
import { buildLocalBusinessSchema, buildFAQSchema } from "@/lib/seo/schema";
import { SERVICES_MENU } from "@/lib/services-menu";
import { ContactForm } from "@/app/(marketing)/contact/ContactForm";
import { FaqAccordion } from "@/components/FaqAccordion";
import { getAllPosts } from "@/lib/blog";
import { SITE_PHONE, SITE_PHONE_TEL } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "King Of Kings | Luxury Real Estate & Property Management GTA",
  description: "Experience the royal standard in real estate. $250M+ in transactions managed, 15+ years experience. Property management, luxury sales, and investment strategy in the Greater Toronto Area.",
  path: "/",
});

const PROPERTY_CITIES = [
  { name: "Mississauga", href: "/property-management/mississauga" },
  { name: "Toronto", href: "/property-management/toronto" },
  { name: "Milton", href: "/property-management/milton" },
  { name: "Oakville", href: "/property-management/oakville" },
];

const WHY_CHOOSE = [
  { title: "Investor Mindset", desc: "Every property is treated as a long-term asset with strategic oversight and value preservation." },
  { title: "Transparent Reporting", desc: "Clear monthly statements and documentation so you stay informed on performance." },
  { title: "Proactive Maintenance", desc: "Preventative planning and responsive coordination with vetted contractors." },
  { title: "Ontario Compliance Awareness", desc: "RTA compliance and LTB support built into our processes." },
  { title: "Responsive Communication", desc: "Direct access to your dedicated team when you need answers." },
  { title: "Market Insight", desc: "Broker-level guidance on pricing, positioning, and portfolio decisions." },
];

const HOMEPAGE_FAQS = [
  { question: "What areas do you serve?", answer: "We serve Mississauga and the Greater Toronto Area, including Toronto, Brampton, Markham, Vaughan, Oakville, Milton, and surrounding municipalities. Our property management and real estate services cover the full GTA." },
  { question: "Do you offer property management for out-of-town owners?", answer: "Yes. Many of our clients own rental properties in the GTA while living elsewhere. We provide full remote management including tenant communication, maintenance coordination, inspections, and monthly reporting." },
  { question: "How do I get started?", answer: "Contact us to book a consultation. We'll discuss your goals—whether buying, selling, managing, or investing—and outline how we can support you. Request a rental evaluation if you're a landlord considering property management." },
  { question: "Do you work with investors?", answer: "Yes. We offer off-market deals, joint venture opportunities, and portfolio strategy for qualified investors. Contact us to discuss your investment goals." },
];

const HOW_WE_WORK = [
  { step: 1, title: "Consultation & Property Review", desc: "We assess your property, goals, and current setup to build a clear picture." },
  { step: 2, title: "Strategy & Plan", desc: "A tailored approach for leasing, management, or investment—aligned with your objectives." },
  { step: 3, title: "Execution", desc: "Leasing, management, or investment action with disciplined follow-through." },
  { step: 4, title: "Reporting & Ongoing Optimization", desc: "Regular updates, performance tracking, and continuous improvement." },
];

export default function HomePage() {
  const serviceIcons = { "real-estate": Home, "property-management": Building2, investments: BarChart3, developments: Layers } as const;
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <JsonLd data={buildLocalBusinessSchema()} />
      <JsonLd data={buildFAQSchema(HOMEPAGE_FAQS)} />
      <Hero
        image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"
        title="Real Estate, Property Management & Investments in the GTA"
        subtitle="Investor mindset · Asset protection · Clarity at every step"
        primaryCta={{ label: "Book a Consultation", href: "/contact" }}
        secondaryCta={{ label: SITE_PHONE, href: SITE_PHONE_TEL }}
        large={true}
      />

      <section className="bg-black text-white py-4">
        <div className="container-wide">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm uppercase tracking-wider text-gray-300">
            <span>Investor Mindset</span>
            <span className="text-primary">·</span>
            <span>Transparent Reporting</span>
            <span className="text-primary">·</span>
            <span>Proactive Maintenance</span>
            <span className="text-primary">·</span>
            <span>Strategic Guidance</span>
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-14 bg-secondary text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl text-white mb-6">Contact Us</h2>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 lg:mb-16">
            <h2 className="text-primary font-bold tracking-widest uppercase text-xs sm:text-sm mb-3 sm:mb-4">Our Expertise</h2>
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-secondary mb-4 sm:mb-6 leading-tight">Comprehensive Wealth Solutions</h3>
            <p className="text-gray-500 leading-relaxed">
              We provide a holistic approach to real estate, combining market expertise with strategic investment planning to build and preserve your legacy.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {SERVICES_MENU.map((service) => {
              const Icon = serviceIcons[service.id];
              const isPropertyMgmt = service.id === "property-management";
              return (
                <div key={service.id} className="bg-muted p-6 sm:p-8 lg:p-10 border border-transparent hover:border-primary/20 transition-all duration-300 h-full flex flex-col min-w-0">
                  <Icon className="w-12 h-12 text-primary mb-6 shrink-0" />
                  <h4 className="font-serif text-2xl text-secondary mb-4">{service.label}</h4>
                  <p className="text-gray-500 mb-6 leading-relaxed break-words min-w-0 flex-grow">{service.description}</p>
                  {isPropertyMgmt && (
                    <div className="mb-6">
                      <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Quick Links</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1">
                        {PROPERTY_CITIES.map((c) => (
                          <Link key={c.href} href={c.href} className="text-sm text-gray-600 hover:text-primary transition-colors">
                            {c.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  <ul className="space-y-2 mb-6">
                    {service.subItems.slice(0, 4).map((sub) => (
                      <li key={sub.href}>
                        <Link href={sub.href} className="text-sm text-gray-600 hover:text-primary transition-colors">
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href={service.href} className="inline-flex items-center text-secondary font-bold text-xs uppercase tracking-widest hover:text-primary transition-colors group mt-auto">
                    Explore <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="container-wide">
          <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4 lg:hidden">About Us</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
            <div className="relative">
              <Image
                src="/ragymoussa.jpg"
                alt="Ragy Moussa, Partner at King of Kings Group"
                width={600}
                height={600}
                className="w-full h-[min(78vw,22rem)] xs:h-[min(82vw,26rem)] sm:h-[min(85vw,28rem)] md:h-[28rem] lg:h-[500px] object-cover object-top lg:object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary p-8 hidden md:block">
                <p className="text-secondary font-bold text-xl uppercase tracking-widest leading-tight">Expertise <br /> Driven</p>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4 hidden lg:block">About Us</h2>
              <h3 className="font-serif text-3xl md:text-4xl text-secondary mb-6">Built to Protect and Grow Real Estate Assets</h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>King of Kings Group is a Greater Toronto Area company built to protect and enhance the long-term value of residential real estate assets. We serve landlords and investors who want professional oversight, disciplined operations, and performance-driven management.</p>
                <p>Our approach is rooted in an investor mindset. Every property we manage is treated as a long-term asset—with strong tenant placement, proactive maintenance planning, structured financial reporting, and transparent communication.</p>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Strong tenants and rigorous screening</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Proactive maintenance planning</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Clear reporting and documentation</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0" />Portfolio-minded decisions</li>
              </ul>
              <Link href="/about" className="inline-flex items-center text-secondary font-bold text-xs uppercase tracking-widest hover:text-primary transition-colors group">
                Learn More About Us <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4 text-center">Trust</h2>
          <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-secondary mb-10 sm:mb-14 lg:mb-16 text-center leading-tight px-1">Why Owners Choose King of Kings Group</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {WHY_CHOOSE.map((item, i) => (
              <div key={i} className="bg-muted p-6 sm:p-8 border border-transparent hover:border-primary/20 transition-all duration-300 h-full flex flex-col">
                <h4 className="font-serif text-xl text-secondary mb-3">{item.title}</h4>
                <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="container-wide">
          <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4 text-center">Process</h2>
          <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-secondary mb-10 sm:mb-14 lg:mb-16 text-center leading-tight px-1">How We Work</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {HOW_WE_WORK.map((item) => (
              <div key={item.step} className="bg-white p-6 sm:p-8 border border-transparent hover:border-primary/20 transition-all duration-300 h-full flex flex-col">
                <span className="text-primary font-serif text-4xl font-bold mb-4">{item.step}</span>
                <h4 className="font-serif text-xl text-secondary mb-3">{item.title}</h4>
                <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="container-wide max-w-3xl">
          <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4 text-center">FAQ</h2>
          <h3 className="font-serif text-3xl md:text-4xl text-secondary mb-12 text-center">Frequently Asked Questions</h3>
          <FaqAccordion faqs={HOMEPAGE_FAQS} />
          <div className="text-center mt-12">
            <Link href="/contact" className="inline-flex items-center text-secondary font-bold text-xs uppercase tracking-widest hover:text-primary transition-colors">
              Have more questions? Contact us <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4 text-center">Insights</h2>
          <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-secondary mb-10 sm:mb-14 lg:mb-16 text-center leading-tight px-1">Market Insights & Investor Education</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {latestPosts.length > 0
              ? latestPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <div className="bg-muted p-6 sm:p-8 border border-transparent hover:border-primary/20 transition-all duration-300 h-full flex flex-col">
                      <span className="text-primary font-bold tracking-widest uppercase text-xs mb-3 block">{post.category}</span>
                      <h4 className="font-serif text-xl text-secondary mb-4 line-clamp-2">{post.title}</h4>
                      <p className="text-gray-600 leading-relaxed text-sm mb-4 flex-grow line-clamp-3">{post.excerpt}</p>
                      <time className="text-gray-500 text-sm" dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}
                      </time>
                    </div>
                  </Link>
                ))
              : Array.from({ length: 3 }).map((_, i) => (
                  <Link key={i} href="/blog">
                    <div className="bg-muted p-6 sm:p-8 border border-transparent hover:border-primary/20 transition-all duration-300 h-full flex flex-col">
                      <span className="text-primary font-bold tracking-widest uppercase text-xs mb-3 block">Insights</span>
                      <h4 className="font-serif text-xl text-secondary mb-4">Market Insights</h4>
                      <p className="text-gray-600 leading-relaxed text-sm">Explore our blog for market updates and investor education.</p>
                    </div>
                  </Link>
                ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/blog">
              <button className="bg-secondary text-white hover:bg-primary hover:text-secondary transition-all duration-300 px-10 py-4 font-bold uppercase tracking-widest text-sm">Read the Blog</button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-secondary text-white text-center">
        <div className="container-wide">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-4 px-2 leading-tight">Let&apos;s Build a Clear Plan for Your Next Move</h2>
          <p className="text-gray-400 mb-8 sm:mb-10 max-w-2xl mx-auto text-sm sm:text-base px-2">
            Whether you&apos;re buying, selling, managing, or investing—we provide strategic guidance tailored to your goals in Mississauga and the GTA.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-md sm:max-w-none mx-auto px-2">
            <Link href="/contact" className="w-full sm:w-auto">
              <button type="button" className="w-full sm:w-auto bg-primary text-white hover:bg-white hover:text-secondary transition-all duration-300 px-6 sm:px-10 py-3.5 sm:py-4 font-bold uppercase tracking-wider sm:tracking-widest text-xs sm:text-sm border border-primary">Book a Consultation</button>
            </Link>
            <a href={SITE_PHONE_TEL} className="w-full sm:w-auto">
              <button type="button" className="w-full sm:w-auto bg-white text-secondary hover:bg-primary hover:text-white transition-all duration-300 px-6 sm:px-10 py-3.5 sm:py-4 font-bold uppercase tracking-wider sm:tracking-widest text-xs sm:text-sm">{SITE_PHONE}</button>
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
