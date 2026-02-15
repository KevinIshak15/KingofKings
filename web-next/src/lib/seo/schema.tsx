const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kingofkings.com";

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
      streetAddress: "123 Luxury Lane, Suite 100",
      addressLocality: "Toronto",
      addressRegion: "ON",
      postalCode: "M5V 2T6",
      addressCountry: "CA",
    },
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

const SITE_URL_FALLBACK = process.env.NEXT_PUBLIC_SITE_URL || "https://kingofkings.com";

export function buildBlogPostingSchema(options: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL_FALLBACK;
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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL_FALLBACK;
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
