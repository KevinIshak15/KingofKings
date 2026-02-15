import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { CheckCircle2 } from "lucide-react";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Property Management GTA | Landlord Solutions | King Of Kings",
  description: "Worry-free property management for GTA landlords. Tenant placement, 24/7 maintenance, financial reporting. Zero vacancy marketing, rent collection guarantee, LTB support.",
  path: "/management",
});

export default function ManagementPage() {
  const features = [
    { title: "Tenant Placement", desc: "Rigorous screening including credit checks, employment verification, and past landlord references to ensure quality tenants." },
    { title: "Maintenance", desc: "24/7 response to issues using our network of trusted, licensed contractors at preferred pricing rates." },
    { title: "Financial Reporting", desc: "Detailed monthly statements and year-end tax documentation accessible through our owner portal." },
  ];
  const benefits = ["Zero vacancy marketing strategy", "Rent collection guarantee", "Regular property inspections", "Paralegal support for LTB matters", "Transparent fee structure"];

  return (
    <>
      <Hero
        image="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop"
        title="Property Management"
        subtitle="Worry-Free Ownership"
        large={false}
      />

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Maximize Returns</h2>
            <h3 className="font-serif text-4xl md:text-5xl text-secondary mb-6">Complete Landlord Solutions</h3>
            <p className="text-gray-500 leading-relaxed">Stop dealing with late night calls and tenant issues. We handle everything from tenant screening to maintenance, ensuring your investment performs at its peak potential.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((item, i) => (
              <div key={i} className="bg-muted p-8 border-t-4 border-primary">
                <h4 className="font-serif text-xl text-secondary mb-4">{item.title}</h4>
                <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-secondary text-white p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="font-serif text-3xl mb-6">Why Choose King Of Kings?</h3>
                <div className="space-y-4">
                  {benefits.map((feat, i) => (
                    <div key={i} className="flex items-center">
                      <CheckCircle2 className="text-primary w-5 h-5 mr-4 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center lg:text-left">
                <h3 className="font-serif text-2xl mb-4 text-primary">Get Your Free Rental Analysis</h3>
                <p className="text-gray-400 mb-8">Find out exactly how much your property should be renting for in today&apos;s market.</p>
                <Link href="/services" className="inline-block w-full lg:w-auto bg-white text-secondary px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-primary transition-colors">
                  Request Analysis
                </Link>
                <p className="mt-6 text-sm text-gray-400">
                  Serving <Link href="/management/toronto" className="text-primary hover:underline">Toronto</Link>, <Link href="/management/mississauga" className="text-primary hover:underline">Mississauga</Link>, <Link href="/management/brampton" className="text-primary hover:underline">Brampton</Link>, and the rest of the GTA.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
