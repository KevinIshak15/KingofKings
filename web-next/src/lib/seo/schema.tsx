import { getSiteUrl } from "@/lib/site";

const SITE_URL = getSiteUrl();

export function buildLocalBusinessSchema(cityName?: string) {
  const name = cityName
    ? `King Of Kings Property Management - ${cityName}`
    : "King Of Kings Real Estate Services";

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    description: "Professional property management and real estate services in the Greater Toronto Area.",
    url: SITE_URL,
    telephone: "+1-647-408-5334",
    email: "concierge@kingofkings.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "7145 West Credit Ave, Building 1, Suite 100",
      addressLocality: "Mississauga",
      addressRegion: "ON",
      postalCode: "L5N 6J7",
      addressCountry: "CA",
    },
    openingHours: "Mo-Su 00:00-23:59",
    areaServed: cityName ? { "@type": "City", name: cityName } : undefined,
    priceRange: "$$",
  };
}

export function buildServiceSchema(cityName?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Property Management",
    serviceType: "Property Management",
    description: "Full-service property management for landlords and investors.",
    provider: buildLocalBusinessSchema(cityName),
    areaServed: cityName ? [{ "@type": "City", name: cityName }, { "@type": "State", name: "Ontario" }, { "@type": "Country", name: "Canada" }] : { "@type": "Place", name: "Greater Toronto Area" },
  };
}

export function buildServiceSchemaFor(options: {
  name: string;
  description: string;
  cityName?: string;
}) {
  const { name, description, cityName } = options;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: buildLocalBusinessSchema(cityName),
    areaServed: cityName
      ? { "@type": "City", name: cityName }
      : { "@type": "Place", name: "Greater Toronto Area" },
  };
}

export function buildBlogPostingSchema(options: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
}) {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/blog/${options.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: options.title,
    description: options.description,
    url,
    datePublished: options.datePublished,
    dateModified: options.dateModified || options.datePublished,
    author: {
      "@type": "Organization",
      name: options.author || "King of Kings Group",
    },
    publisher: {
      "@type": "Organization",
      name: "King of Kings Group",
      url: siteUrl,
    },
    ...(options.image && { image: options.image }),
  };
}

export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${siteUrl}${item.url}`,
    })),
  };
}

export function buildFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
