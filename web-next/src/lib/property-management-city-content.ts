import type { PropertyManagementCitySlug } from "./property-management-cities";

export interface CityFaq {
  question: string;
  answer: string;
}

export function getCityFaqs(citySlug: PropertyManagementCitySlug): CityFaq[] {
  const baseFaqs: Record<PropertyManagementCitySlug, CityFaq[]> = {
    mississauga: [
      {
        question: "How much does property management cost in Mississauga?",
        answer: "Property management fees in Mississauga typically run as a percentage of monthly rent collected, plus setup fees for new clients. Exact rates depend on property type, unit count, and service level. King of Kings Group provides customized quotes. Contact us for a rental evaluation and transparent fee breakdown based on your Mississauga property.",
      },
      {
        question: "What is included in full-service property management?",
        answer: "Full-service property management in Mississauga includes tenant placement and screening, rent collection, maintenance coordination, financial reporting, and compliance support. We handle leasing, move-in coordination, vendor management, and provide monthly owner statements. Our service is designed for landlords who want complete operational oversight.",
      },
      {
        question: "Do you manage condos in Mississauga?",
        answer: "Yes. We manage condominium rental units across Mississauga, including buildings in Square One, City Centre, Port Credit, and Erin Mills. We work within condo corporation rules, coordinate with property managers when required, and ensure tenant compliance with bylaws. Contact us to discuss your condo property.",
      },
      {
        question: "How do you screen tenants?",
        answer: "We conduct thorough tenant screening including credit checks, employment and income verification, and landlord references. Our process is designed to place qualified tenants who pay on time and respect your property. We use market-based rental pricing to minimize vacancy and ensure lease terms protect your investment.",
      },
      {
        question: "How do maintenance requests work?",
        answer: "Tenants submit requests through our system. We triage urgency, coordinate with vetted contractors across the GTA, and manage repairs from start to finish. Emergency issues receive 24/7 response. You receive updates and approve non-routine expenses as needed. We maintain strong vendor relationships in Mississauga and surrounding areas.",
      },
      {
        question: "Do you help with Ontario landlord compliance?",
        answer: "Yes. We maintain RTA-aware processes for entries, notices, and terminations. We provide paralegal support for LTB matters when required and keep organized lease and communication archives. Ontario landlord compliance is built into our operational procedures so you stay protected.",
      },
      {
        question: "How quickly can you place a tenant?",
        answer: "Typical time to lease varies by property condition, pricing, and market demand. In Mississauga's competitive rental market, well-priced properties often secure tenants within two to four weeks. We use data-driven pricing and proactive marketing to minimize vacancy. Contact us for a market analysis for your property.",
      },
    ],
    toronto: [
      {
        question: "How much does property management cost in Toronto?",
        answer: "Property management fees in Toronto typically run as a percentage of monthly rent collected, plus setup fees for new clients. Exact rates depend on property type, unit count, and service level. King of Kings Group provides customized quotes. Contact us for a rental evaluation and transparent fee breakdown based on your Toronto property.",
      },
      {
        question: "What is included in full-service property management?",
        answer: "Full-service property management in Toronto includes tenant placement and screening, rent collection, maintenance coordination, financial reporting, and compliance support. We handle leasing, move-in coordination, vendor management, and provide monthly owner statements. Our service is designed for landlords who want complete operational oversight.",
      },
      {
        question: "Do you manage condos in Toronto?",
        answer: "Yes. We manage condominium rental units across Toronto, including Downtown, North York, Scarborough, Etobicoke, and Midtown. We work within condo corporation rules, coordinate with property managers when required, and ensure tenant compliance with bylaws. Contact us to discuss your condo property.",
      },
      {
        question: "How do you screen tenants?",
        answer: "We conduct thorough tenant screening including credit checks, employment and income verification, and landlord references. Our process is designed to place qualified tenants who pay on time and respect your property. We use market-based rental pricing to minimize vacancy and ensure lease terms protect your investment.",
      },
      {
        question: "How do maintenance requests work?",
        answer: "Tenants submit requests through our system. We triage urgency, coordinate with vetted contractors across the GTA, and manage repairs from start to finish. Emergency issues receive 24/7 response. You receive updates and approve non-routine expenses as needed. We maintain strong vendor relationships in Toronto and surrounding areas.",
      },
      {
        question: "Do you help with Ontario landlord compliance?",
        answer: "Yes. We maintain RTA-aware processes for entries, notices, and terminations. We provide paralegal support for LTB matters when required and keep organized lease and communication archives. Ontario landlord compliance is built into our operational procedures so you stay protected.",
      },
      {
        question: "How quickly can you place a tenant?",
        answer: "Typical time to lease varies by property condition, pricing, and market demand. In Toronto's competitive rental market, well-priced properties often secure tenants within two to four weeks. We use data-driven pricing and proactive marketing to minimize vacancy. Contact us for a market analysis for your property.",
      },
    ],
    milton: [
      {
        question: "How much does property management cost in Milton?",
        answer: "Property management fees in Milton typically run as a percentage of monthly rent collected, plus setup fees for new clients. Exact rates depend on property type, unit count, and service level. King of Kings Group provides customized quotes. Contact us for a rental evaluation and transparent fee breakdown based on your Milton property.",
      },
      {
        question: "What is included in full-service property management?",
        answer: "Full-service property management in Milton includes tenant placement and screening, rent collection, maintenance coordination, financial reporting, and compliance support. We handle leasing, move-in coordination, vendor management, and provide monthly owner statements. Our service is designed for landlords who want complete operational oversight.",
      },
      {
        question: "Do you manage condos in Milton?",
        answer: "Yes. We manage condominium rental units across Milton, including in Beaty, Clarke, Derry Green, and Timberlea. We work within condo corporation rules, coordinate with property managers when required, and ensure tenant compliance with bylaws. Contact us to discuss your condo property.",
      },
      {
        question: "How do you screen tenants?",
        answer: "We conduct thorough tenant screening including credit checks, employment and income verification, and landlord references. Our process is designed to place qualified tenants who pay on time and respect your property. We use market-based rental pricing to minimize vacancy and ensure lease terms protect your investment.",
      },
      {
        question: "How do maintenance requests work?",
        answer: "Tenants submit requests through our system. We triage urgency, coordinate with vetted contractors across the GTA, and manage repairs from start to finish. Emergency issues receive 24/7 response. You receive updates and approve non-routine expenses as needed. We maintain strong vendor relationships in Milton and surrounding areas.",
      },
      {
        question: "Do you help with Ontario landlord compliance?",
        answer: "Yes. We maintain RTA-aware processes for entries, notices, and terminations. We provide paralegal support for LTB matters when required and keep organized lease and communication archives. Ontario landlord compliance is built into our operational procedures so you stay protected.",
      },
      {
        question: "How quickly can you place a tenant?",
        answer: "Typical time to lease varies by property condition, pricing, and market demand. In Milton's growing rental market, well-priced properties often secure tenants within two to four weeks. We use data-driven pricing and proactive marketing to minimize vacancy. Contact us for a market analysis for your property.",
      },
    ],
    oakville: [
      {
        question: "How much does property management cost in Oakville?",
        answer: "Property management fees in Oakville typically run as a percentage of monthly rent collected, plus setup fees for new clients. Exact rates depend on property type, unit count, and service level. King of Kings Group provides customized quotes. Contact us for a rental evaluation and transparent fee breakdown based on your Oakville property.",
      },
      {
        question: "What is included in full-service property management?",
        answer: "Full-service property management in Oakville includes tenant placement and screening, rent collection, maintenance coordination, financial reporting, and compliance support. We handle leasing, move-in coordination, vendor management, and provide monthly owner statements. Our service is designed for landlords who want complete operational oversight.",
      },
      {
        question: "Do you manage condos in Oakville?",
        answer: "Yes. We manage condominium rental units across Oakville, including in Bronte, Glen Abbey, River Oaks, and Kerr Village. We work within condo corporation rules, coordinate with property managers when required, and ensure tenant compliance with bylaws. Contact us to discuss your condo property.",
      },
      {
        question: "How do you screen tenants?",
        answer: "We conduct thorough tenant screening including credit checks, employment and income verification, and landlord references. Our process is designed to place qualified tenants who pay on time and respect your property. We use market-based rental pricing to minimize vacancy and ensure lease terms protect your investment.",
      },
      {
        question: "How do maintenance requests work?",
        answer: "Tenants submit requests through our system. We triage urgency, coordinate with vetted contractors across the GTA, and manage repairs from start to finish. Emergency issues receive 24/7 response. You receive updates and approve non-routine expenses as needed. We maintain strong vendor relationships in Oakville and surrounding areas.",
      },
      {
        question: "Do you help with Ontario landlord compliance?",
        answer: "Yes. We maintain RTA-aware processes for entries, notices, and terminations. We provide paralegal support for LTB matters when required and keep organized lease and communication archives. Ontario landlord compliance is built into our operational procedures so you stay protected.",
      },
      {
        question: "How quickly can you place a tenant?",
        answer: "Typical time to lease varies by property condition, pricing, and market demand. In Oakville's rental market, well-priced properties often secure tenants within two to four weeks. We use data-driven pricing and proactive marketing to minimize vacancy. Contact us for a market analysis for your property.",
      },
    ],
  };
  return baseFaqs[citySlug];
}
