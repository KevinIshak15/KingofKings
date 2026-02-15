import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE_PHONE, SITE_PHONE_TEL } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | King of Kings Real Estate",
  description: "Privacy policy for King of Kings Group. How we collect, use, and protect your personal information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <Hero
        image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop"
        title="Privacy Policy"
        subtitle="King of Kings Group"
        primaryCta={{ label: "Book a Consultation", href: "/contact" }}
        secondaryCta={{ label: SITE_PHONE, href: SITE_PHONE_TEL }}
        large={false}
      />
      <section className="section-padding bg-white">
        <div className="container-wide max-w-3xl">
          <div className="prose prose-gray max-w-none space-y-6 text-gray-600 leading-relaxed">
            <p>King of Kings Group (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our real estate, property management, and investment services in the Greater Toronto Area.</p>

            <h2 className="font-serif text-xl text-secondary mt-10 mb-4">Information We Collect</h2>
            <p>We may collect information you provide directly, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name, email address, phone number, and mailing address</li>
              <li>Property details when you request evaluations, consultations, or management services</li>
              <li>Investment preferences and financial information relevant to our services</li>
              <li>Communications and correspondence with our team</li>
            </ul>
            <p>We may also collect information automatically, such as IP address, browser type, and pages visited, to improve our website and services.</p>

            <h2 className="font-serif text-xl text-secondary mt-10 mb-4">How We Use Your Information</h2>
            <p>We use your information to respond to inquiries, provide real estate and property management services, process transactions, and communicate with you about our offerings. We do not sell your personal information to third parties.</p>

            <h2 className="font-serif text-xl text-secondary mt-10 mb-4">Information Sharing</h2>
            <p>We may share information with service providers who assist our operations (e.g., property maintenance, legal, accounting) under confidentiality agreements. We may disclose information when required by law or to protect our rights.</p>

            <h2 className="font-serif text-xl text-secondary mt-10 mb-4">Security</h2>
            <p>We implement reasonable measures to protect your personal information. However, no method of transmission over the internet is 100% secure.</p>

            <h2 className="font-serif text-xl text-secondary mt-10 mb-4">Updates</h2>
            <p>We may update this policy from time to time. Continued use of our website after changes constitutes acceptance of the updated policy.</p>

            <h2 className="font-serif text-xl text-secondary mt-10 mb-4">Contact</h2>
            <p>For questions about this Privacy Policy, contact us at{" "}
              <a href="mailto:concierge@kingofkings.com" className="text-primary hover:underline">concierge@kingofkings.com</a> or{" "}
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
