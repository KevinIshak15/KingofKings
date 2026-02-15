import { cities } from "@/lib/cities";

type City = (typeof cities)[number];

export function getCityContent(city: City) {
  const related = cities.filter((c) => c.region === city.region && c.slug !== city.slug).slice(0, 4).map((c) => c.slug);

  return {
    intro: `Managing rental properties in ${city.name} requires local expertise, reliable systems, and a hands-on approach. King Of Kings Group provides full-service property management to landlords and investors across ${city.region}, helping you maximize returns while minimizing headaches. Whether you own a single-family home, a condo, or a small multi-unit building in ${city.name}, we treat your asset with the same care and discipline we apply to our own investments.`,
    whyUs: `Landlords in ${city.name} choose King Of Kings because we combine investor-grade oversight with responsive, personal service. We don't treat your property as a file—we treat it as a long-term asset that deserves proactive maintenance, quality tenants, and clear financial reporting. Our team understands the nuances of the ${city.name} market, from seasonal rental demand to local bylaws and LTB requirements. We screen tenants rigorously, coordinate maintenance through trusted contractors, and keep you informed with transparent monthly statements.`,
    tenantScreening: `Quality tenants are the foundation of stress-free ownership. In ${city.name}, we use a multi-step screening process: credit checks, employment and income verification, and references from previous landlords. We set clear leasing standards and avoid placing tenants who pose a risk to your property or your cash flow. Our goal is to fill vacancies quickly with responsible renters who pay on time and respect your asset.`,
    maintenance: `When something breaks, you need it fixed fast. We maintain a network of licensed, insured contractors across ${city.name} and ${city.region}, giving you access to preferred rates and reliable response times. From emergency repairs to scheduled maintenance, we coordinate the work, verify quality, and handle the paperwork. You stay informed without having to take late-night calls or hunt for contractors yourself.`,
    financial: `Every month you receive a clear statement of income, expenses, and reserves. We handle rent collection, track arrears, and work with our paralegal team when LTB action is required. At year-end, we provide documentation to support your tax filings. Our transparent fee structure means you always know what you're paying—no hidden costs or surprise charges.`,
    market: `${city.name} continues to attract renters due to its location, amenities, and quality of life. Whether you're investing in a condo near transit, a family home in the suburbs, or a cottage-country rental, understanding local demand and pricing is critical. We provide data-driven rental analysis to help you set competitive rents and position your property effectively in the ${city.name} market.`,
    faqs: [
      {
        question: `How much does property management cost in ${city.name}?`,
        answer: `Our fees are competitive and transparent. We typically charge a percentage of monthly rent collected, plus setup fees for new clients. The exact structure depends on the type and number of properties. Contact us for a customized quote based on your ${city.name} portfolio.`,
      },
      {
        question: `Do you handle tenant placement in ${city.name}?`,
        answer: `Yes. We handle advertising, showings, applications, and screening. We use credit checks, employment verification, and landlord references to place quality tenants. Our goal is to minimize vacancy while avoiding problematic renters.`,
      },
      {
        question: `What if my tenant stops paying rent?`,
        answer: `We follow a clear process: notice of arrears, payment plans when appropriate, and LTB applications when necessary. Our team works with paralegals to navigate hearings and evictions in accordance with Ontario law.`,
      },
      {
        question: `Can you manage my property if I live out of town?`,
        answer: `Absolutely. Many of our clients own properties in ${city.name} while living elsewhere. We handle everything remotely: tenant communication, maintenance, inspections, and reporting. You stay informed through our owner portal and monthly statements.`,
      },
      {
        question: `How do I get a free rental analysis for my ${city.name} property?`,
        answer: `Fill out our property evaluation form on the Services page with your address and contact details. We'll analyze comparable rentals in your area and provide a recommended rent range and market insights within a few days.`,
      },
      {
        question: `Do you manage condos in ${city.name}?`,
        answer: `Yes. We manage condos, townhouses, single-family homes, and small multi-unit buildings across ${city.name} and ${city.region}. We're familiar with condo bylaws and work with property managers when required.`,
      },
    ],
    relatedCities: related,
  };
}
