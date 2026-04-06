import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE_EMAIL, SITE_PHONE, SITE_PHONE_TEL } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service | King of Kings Real Estate",
  description: "Terms of service for King of Kings Group. Terms and conditions for using our website and services.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <Hero
        image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop"
        title="Terms of Service"
        subtitle="King of Kings Group"
        primaryCta={{ label: "Book a Consultation", href: "/contact" }}
        secondaryCta={{ label: SITE_PHONE, href: SITE_PHONE_TEL }}
        large={false}
      />
      <section className="section-padding bg-white">
        <div className="container-wide max-w-3xl">
          <div className="prose prose-gray max-w-none space-y-6 text-gray-600 leading-relaxed">
            <p>By accessing or using the King of Kings Group website and services, you agree to these Terms of Service. Please read them carefully.</p>

            <h2 className="font-serif text-xl text-secondary mt-10 mb-4">Use of Website</h2>
            <p>This website is for informational purposes regarding our real estate, property management, and investment services in the Greater Toronto Area. Content is provided &quot;as is&quot; and may be updated without notice. You agree to use the website only for lawful purposes.</p>

            <h2 className="font-serif text-xl text-secondary mt-10 mb-4">Services</h2>
            <p>Engagement of our services—including real estate transactions, property management, and investment advisory—is subject to separate written agreements. The information on this website does not constitute professional advice; consult us directly for personalized guidance.</p>

            <h2 className="font-serif text-xl text-secondary mt-10 mb-4">Intellectual Property</h2>
            <p>All content on this website, including text, logos, and images, is the property of King of Kings Group or its licensors. You may not reproduce, distribute, or use our content without written permission.</p>

            <h2 className="font-serif text-xl text-secondary mt-10 mb-4">Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, King of Kings Group is not liable for any indirect, incidental, or consequential damages arising from your use of this website or reliance on its content.</p>

            <h2 className="font-serif text-xl text-secondary mt-10 mb-4">Governing Law</h2>
            <p>These terms are governed by the laws of the Province of Ontario and the laws of Canada applicable therein.</p>

            <h2 className="font-serif text-xl text-secondary mt-10 mb-4">Contact</h2>
            <p>For questions about these Terms of Service, contact us at{" "}
              <a href={`mailto:${SITE_EMAIL}`} className="text-primary hover:underline">{SITE_EMAIL}</a> or{" "}
              <a href={SITE_PHONE_TEL} className="text-primary hover:underline">{SITE_PHONE}</a>.
            </p>
          </div>
          <Link href="/contact" className="inline-block mt-10 text-primary font-medium hover:underline">
            Contact Us
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
