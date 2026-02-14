import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <Hero 
        image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop"
        title="About King of Kings Group"
        subtitle="A hands-on property management team in the Greater Toronto Area—built to protect your asset, strengthen performance, and simplify ownership."
        large={false}
      />

      {/* Company Overview */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Our Story</h2>
            <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
              <p>
                King of Kings Group is a Greater Toronto Area property management company built to protect the value of real estate and simplify ownership. We manage homes with an investor mindset—prioritizing strong tenants, proactive maintenance, clear communication, and disciplined financial oversight.
              </p>
              <p>
                Whether you own a single property or a growing portfolio, our focus is the same: reduce friction, improve performance, and help you make confident decisions with reliable reporting and a hands-on management approach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="section-padding bg-muted">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Our Approach</h2>
              <h3 className="font-serif text-4xl text-secondary mb-8">Asset Stewardship</h3>
              <ul className="space-y-4 mb-8">
                {[
                  "Tenant-first leasing standards and thorough screening",
                  "Proactive property care and responsive maintenance coordination",
                  "Clear, consistent communication with owners and tenants",
                  "Organized documentation, reporting, and operational transparency",
                  "Portfolio-minded guidance to support long-term asset growth"
                ].map((item, i) => (
                  <li key={i} className="flex items-start text-gray-700">
                    <span className="w-2 h-2 bg-primary mr-4 rounded-full mt-2 shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="italic text-gray-500 border-l-2 border-primary pl-4">
                We treat every home like a long-term asset—because that’s what it is.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070&auto=format&fit=crop" 
                alt="Modern Office" 
                className="w-full h-[400px] object-cover grayscale opacity-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop" 
                alt="Ragy Moussa" 
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary p-8 hidden md:block">
                <p className="text-secondary font-bold text-xl uppercase tracking-widest leading-tight">
                  Expertise <br /> Driven
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Meet Ragy Moussa</h2>
                <p className="text-secondary/60 text-sm font-bold uppercase tracking-widest mb-6">
                  Partner | CEO & Founder, Moussa Homes • Award-Winning Real Estate Broker
                </p>
                <div className="space-y-6 text-gray-600 leading-relaxed">
                  <p>
                    Ragy Moussa is a seasoned real estate broker and developer with over a decade of experience in the Greater Toronto Area. He is the CEO and Founder of Moussa Homes and an award-winning broker with Keller Williams Real Estate Associates, recognized for outstanding performance every year since 2015.
                  </p>
                  <p>
                    With a proven track record in residential sales, investment strategy, and new construction development, Ragy has guided countless clients and partners through high-return real estate ventures. His expertise spans market analysis, deal structuring, and exit planning—making him a strategic asset in maximizing investor value.
                  </p>
                  <p>
                    As a partner in this project, Ragy brings deep market insight, strong sales leadership, and hands-on experience in delivering profitable developments. His reputation, network, and results-driven approach help ensure success from acquisition to execution to sale.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-secondary text-white text-center">
        <div className="container-wide">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Ready for hands-on management?</h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
            Let’s talk about your property and how we can support your goals.
          </p>
          <Link href="/contact">
            <button className="bg-primary text-secondary hover:bg-white transition-all duration-300 px-10 py-4 font-bold uppercase tracking-widest text-sm">
              Contact Us
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
