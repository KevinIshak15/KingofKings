import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Crown, BarChart3, Building2, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      {/* luxury modern home at twilight */}
      <Hero 
        image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"
        title="Experience The Royal Standard"
        subtitle="Luxury Real Estate & Wealth Management"
        primaryCta={{ label: "View Services", href: "/services" }}
        secondaryCta={{ label: "Contact Us", href: "/contact" }}
        large={true}
      />

      {/* Trust Section */}
      <section className="bg-secondary text-white py-16 border-b border-white/5">
        <div className="container-wide grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <h3 className="text-primary text-4xl font-serif">$250M+</h3>
            <p className="text-gray-400 text-sm uppercase tracking-wider">Transactions Managed</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-primary text-4xl font-serif">15+</h3>
            <p className="text-gray-400 text-sm uppercase tracking-wider">Years Experience</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-primary text-4xl font-serif">500+</h3>
            <p className="text-gray-400 text-sm uppercase tracking-wider">Happy Families</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-primary text-4xl font-serif">24/7</h3>
            <p className="text-gray-400 text-sm uppercase tracking-wider">Concierge Service</p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Our Expertise</h2>
            <h3 className="font-serif text-4xl md:text-5xl text-secondary mb-6">Comprehensive Wealth Solutions</h3>
            <p className="text-gray-500 leading-relaxed">
              We provide a holistic approach to real estate, combining market expertise with strategic investment planning to build and preserve your legacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Crown,
                title: "Luxury Sales",
                desc: "Marketing the most prestigious properties with global reach and impeccable presentation.",
                link: "/services"
              },
              {
                icon: Building2,
                title: "Property Management",
                desc: "Full-service management for landlords who demand excellence and peace of mind.",
                link: "/management"
              },
              {
                icon: BarChart3,
                title: "Investment Strategy",
                desc: "Data-driven analysis to maximize ROI and build generational wealth through real estate.",
                link: "/investors"
              }
            ].map((service, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-muted p-10 group cursor-pointer border border-transparent hover:border-primary/20 transition-all duration-300"
              >
                <service.icon className="w-12 h-12 text-primary mb-6" />
                <h4 className="font-serif text-2xl text-secondary mb-4">{service.title}</h4>
                <p className="text-gray-500 mb-8 leading-relaxed">{service.desc}</p>
                <Link href={service.link}>
                  <div className="flex items-center text-secondary font-bold text-xs uppercase tracking-widest group-hover:text-primary transition-colors">
                    Learn More <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investor Lead Capture */}
      <section className="relative py-32 bg-secondary overflow-hidden">
        {/* Abstract gold pattern background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary via-secondary to-secondary"></div>
        
        <div className="container-wide relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Exclusive Access</h2>
            <h3 className="font-serif text-4xl md:text-5xl text-white mb-6">Join Our Investor Network</h3>
            <p className="text-gray-400 leading-relaxed mb-8 text-lg">
              Gain priority access to off-market deals, pre-construction opportunities, and high-yield investment properties before they hit the public market.
            </p>
            <ul className="space-y-4 mb-10">
              {['Off-market opportunities', 'Detailed pro-forma analysis', 'Joint venture partnerships'].map((item, i) => (
                <li key={i} className="flex items-center text-white">
                  <span className="w-2 h-2 bg-primary mr-4 rounded-full"></span>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/investors">
              <button className="bg-primary text-secondary hover:bg-white transition-all duration-300 px-8 py-4 font-bold uppercase tracking-widest text-sm">
                Apply for Membership
              </button>
            </Link>
          </div>
          <div className="relative">
            {/* modern office building abstract */}
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
              alt="Investment Property" 
              className="w-full h-[500px] object-cover grayscale opacity-80 hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute -bottom-8 -left-8 bg-white p-8 max-w-xs shadow-xl hidden md:block">
              <p className="font-serif text-2xl text-secondary mb-2">"The best investment on Earth is earth."</p>
              <p className="text-primary text-sm font-bold uppercase tracking-widest">— Louis Glickman</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
