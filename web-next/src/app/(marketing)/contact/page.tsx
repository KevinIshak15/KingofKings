import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { SITE_PHONE, SITE_PHONE_TEL, SITE_ADDRESS_LINE, SITE_CITY, SITE_POSTAL_CODE, SITE_EMAIL, SITE_HOURS, SITE_LOCATION } from "@/lib/site";
import { Footer } from "@/components/Footer";
import { buildMetadata } from "@/lib/seo/metadata";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us | King Of Kings Real Estate",
  description: "Get in touch with King Of Kings for property management, luxury sales, or investment advice. Mississauga office — Meadowvale Mews. Schedule a consultation today.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Hero
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
        title="Contact Us"
        subtitle="Let's Start a Conversation"
        primaryCta={{ label: "Book a Consultation", href: "/contact" }}
        secondaryCta={{ label: SITE_PHONE, href: SITE_PHONE_TEL }}
        large={false}
      />

      <section className="section-padding bg-white">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div>
              <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Get In Touch</h2>
              <h3 className="font-serif text-4xl text-secondary mb-6">We Are At Your Service</h3>
              <p className="text-gray-600 leading-relaxed">
                Whether you are ready to list your property, looking for your dream home, or seeking investment advice, our team is ready to assist you with the highest level of professionalism.
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-6 h-6 mr-4 mt-1 flex items-center justify-center text-primary"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></div>
                <div>
                  <h4 className="font-serif text-lg text-secondary">Office Location</h4>
                  <p className="text-gray-500">{SITE_LOCATION}<br />{SITE_ADDRESS_LINE}<br />{SITE_CITY}, ON {SITE_POSTAL_CODE}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 mr-4 mt-1 flex items-center justify-center text-primary"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>
                <div>
                  <h4 className="font-serif text-lg text-secondary">Phone</h4>
                  <a href={SITE_PHONE_TEL} className="text-gray-500 hover:text-primary transition-colors">{SITE_PHONE}</a>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 mr-4 mt-1 flex items-center justify-center text-primary"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></div>
                <div>
                  <h4 className="font-serif text-lg text-secondary">Email</h4>
                  <a href={`mailto:${SITE_EMAIL}`} className="text-gray-500 hover:text-primary transition-colors">{SITE_EMAIL}</a>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 mr-4 mt-1 flex items-center justify-center text-primary"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
                <div>
                  <h4 className="font-serif text-lg text-secondary">Hours</h4>
                  <p className="text-gray-500">{SITE_HOURS}</p>
                </div>
              </div>
            </div>
            <div className="h-64 bg-gray-100 w-full relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2884.496371755849!2d-79.717382!3d43.589892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b4163a424f38d%3A0x9e2e650237915782!2s7145%20West%20Credit%20Ave%2C%20Mississauga%2C%20ON%20L5N%206J7!5e0!3m2!1sen!2sca!4v1678901234567!5m2!1sen!2sca"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office location map"
              />
            </div>
          </div>
          <div className="bg-secondary p-8 md:p-12 text-white">
            <h3 className="font-serif text-2xl mb-8 text-primary">Send a Message</h3>
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
