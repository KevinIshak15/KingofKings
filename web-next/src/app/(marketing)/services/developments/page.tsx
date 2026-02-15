import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/lib/seo/schema";
import { buildLocalBusinessSchema, buildServiceSchemaFor } from "@/lib/seo/schema";
import { SITE_PHONE, SITE_PHONE_TEL } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Developments | Current Projects & Partnership Inquiries | King of Kings Group",
  description: "Strategic development and partnership opportunities in the GTA. Current projects, upcoming pipeline, vision, and partnership inquiries. Compliance-safe, professional approach.",
  path: "/services/developments",
});

export default function DevelopmentsServicesPage() {
  return (
    <>
      <JsonLd data={buildLocalBusinessSchema()} />
      <JsonLd data={buildServiceSchemaFor({
        name: "Developments",
        description: "Strategic development and partnership opportunities in the GTA: current projects, upcoming pipeline, vision, and partnership inquiries.",
      })} />

      <Hero
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070"
        title="Developments"
        subtitle="Current Projects · Pipeline · Vision · Partnership Inquiries"
        primaryCta={{ label: "Book a Consultation", href: "/contact" }}
        secondaryCta={{ label: SITE_PHONE, href: SITE_PHONE_TEL }}
        large={false}
      />

      <article className="section-padding bg-white">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Strategic Development</p>
            <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-8">Development and Partnership Opportunities in the GTA</h2>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>King of Kings Group pursues strategic development and partnership opportunities across the Greater Toronto Area. We focus on current projects, the upcoming pipeline, and vision-aligned collaborations. Our approach is disciplined: we do not make exaggerated claims or offer guarantees. We provide clear, compliance-safe communication and work with qualified partners who share our standards.</p>
              <p>Whether you&apos;re exploring partnership opportunities, evaluating the development pipeline, or seeking to understand our strategic direction, we invite a direct conversation. Contact us to discuss your objectives and how we might align.</p>
            </div>
          </div>
        </div>
      </article>

      <section id="current-projects" className="section-padding bg-muted">
        <div className="container-wide">
          <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-8">Current Projects</h2>
          <p className="text-gray-700 leading-relaxed max-w-3xl mb-6">
            We actively manage and participate in development projects across Mississauga and the GTA. Our focus is on residential and mixed-use opportunities that align with our strategic criteria. Project details, timelines, and partnership structures are discussed on a case-by-case basis with qualified parties.
          </p>
          <p className="text-gray-600 leading-relaxed">
            For current project information and eligibility, <Link href="/contact" className="text-primary hover:underline font-medium">contact us</Link> to begin a confidential conversation.
          </p>
        </div>
      </section>

      <section id="upcoming-pipeline" className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-8">Upcoming Pipeline</h2>
          <p className="text-gray-700 leading-relaxed max-w-3xl mb-6">
            Our pipeline includes pre-development and planning-stage opportunities in the GTA. We evaluate each opportunity against strict criteria: location, feasibility, risk profile, and alignment with our long-term vision. Not every project advances; we prioritize quality over volume.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Pipeline details are shared with qualified partners under confidentiality. <Link href="/contact" className="text-primary hover:underline font-medium">Reach out</Link> to express interest and discuss next steps.
          </p>
        </div>
      </section>

      <section id="vision" className="section-padding bg-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary via-secondary to-secondary" />
        <div className="container-wide relative z-10">
          <h2 className="font-serif text-3xl md:text-4xl mb-8">Vision</h2>
          <p className="text-gray-300 leading-relaxed max-w-3xl mb-6">
            We aim to build a development practice that combines disciplined execution with long-term thinking. Our vision is not about scale for its own sake—it is about creating projects that enhance communities, serve residents and investors well, and stand the test of time.
          </p>
          <p className="text-gray-300 leading-relaxed">
            We work with partners who share these values: transparency, compliance, and a commitment to quality. If that resonates with you, we welcome the conversation.
          </p>
        </div>
      </section>

      <section id="partnership-inquiries" className="section-padding bg-muted">
        <div className="container-wide">
          <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-8">Partnership Inquiries</h2>
          <p className="text-gray-700 leading-relaxed max-w-3xl mb-6">
            We consider partnership inquiries from qualified investors, developers, and strategic partners. Each inquiry is evaluated on its merits. We do not guarantee that every inquiry will result in a partnership; we are selective and focus on alignment of goals, capabilities, and risk tolerance.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            If you are interested in exploring a partnership, please <Link href="/contact" className="text-primary hover:underline font-medium">contact us</Link>. Provide a brief overview of your background, objectives, and what you are looking for. We will respond to inquiries that align with our current focus.
          </p>
          <Link href="/contact" className="inline-flex items-center text-secondary font-bold text-xs uppercase tracking-widest hover:text-primary transition-colors">
            Submit a Partnership Inquiry →
          </Link>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <p className="text-gray-600 mb-6">
            Explore our <Link href="/services/real-estate" className="text-primary hover:underline font-medium">real estate</Link> and <Link href="/services/property-management" className="text-primary hover:underline font-medium">property management</Link> services, or return to <Link href="/services" className="text-primary hover:underline font-medium">all services</Link>.
          </p>
        </div>
      </section>

      <section className="py-24 bg-secondary text-white text-center">
        <div className="container-wide">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Let&apos;s Build a Clear Plan for Your Next Move</h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
            Interested in development opportunities or partnership? Book a consultation to discuss your goals.
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
