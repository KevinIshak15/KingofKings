import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { ListingGallery } from "@/components/listings/ListingGallery";
import { EditListingLink } from "@/components/admin/EditListingLink";
import { getPublishedListingBySlug } from "@/lib/listings/server";
import { SITE_PHONE, SITE_PHONE_TEL } from "@/lib/site";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kingofkings.com";

interface ListingPageProps {
  params: Promise<{ slug: string }>;
}

function formatPrice(price: number): string {
  if (!price) return "—";
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(price);
}

function formatAddress(addr: { street?: string; unit?: string | null; city?: string; province?: string; postalCode?: string }) {
  const parts = [addr.street, addr.unit, addr.city, addr.province, addr.postalCode].filter(Boolean);
  return parts.join(", ");
}

export async function generateMetadata({ params }: ListingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getPublishedListingBySlug(slug);
  if (!listing) return { title: "Listing Not Found" };

  const price = formatPrice(listing.price);
  const title = listing.seoTitle || `${price} - ${listing.address?.city || ""} | King of Kings Group`;
  const desc = listing.seoDescription || String(listing.description || "").slice(0, 155);
  const image = listing.images?.[0]?.url;
  const url = `${SITE_URL}/listings/${slug}`;

  return {
    title: title.length <= 60 ? title : title.slice(0, 57) + "...",
    description: desc.length <= 160 ? desc : desc.slice(0, 157) + "...",
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      title,
      description: desc,
      url,
      siteName: "King Of Kings Real Estate Services",
      images: image ? [{ url: image, width: 1200, height: 630, alt: listing.title }] : undefined,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
    },
  };
}

export default async function ListingDetailPage({ params }: ListingPageProps) {
  const { slug } = await params;
  const listing = await getPublishedListingBySlug(slug);
  if (!listing) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: listing.title,
    description: listing.description,
    url: `${SITE_URL}/listings/${listing.slug}`,
    image: listing.images?.map((i: { url: string }) => i.url) ?? [],
    datePosted: listing.publishedAt || listing.createdAt,
    offers: {
      "@type": "Offer",
      price: listing.price,
      priceCurrency: "CAD",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: [listing.address?.street, listing.address?.unit].filter(Boolean).join(" "),
      addressLocality: listing.address?.city,
      addressRegion: listing.address?.province,
      postalCode: listing.address?.postalCode,
      addressCountry: listing.address?.country || "CA",
    },
    numberOfRooms: listing.beds,
    numberOfBathroomsTotal: listing.baths,
    floorSize: listing.sqft ? { "@type": "QuantitativeValue", value: listing.sqft, unitCode: "FTK" } : undefined,
  };

  const heroImage = listing.images?.[0]?.url || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero
        image={heroImage}
        title={listing.title}
        subtitle={formatAddress(listing.address)}
        primaryCta={{ label: "Book a Consultation", href: "/contact" }}
        secondaryCta={{ label: SITE_PHONE, href: SITE_PHONE_TEL }}
        large={false}
      />

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <ListingGallery images={listing.images || []} alt={listing.title} />
              <div className="mt-8">
                <h2 className="font-serif text-2xl text-secondary mb-4">Description</h2>
                <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {listing.description}
                </div>
              </div>
            </div>
            <div>
              <div className="sticky top-8 space-y-6">
                <div>
                  <p className="text-primary font-bold text-2xl">{formatPrice(listing.price)}</p>
                  <h1 className="font-serif text-2xl text-secondary mt-1">{listing.title}</h1>
                  <p className="text-muted-foreground mt-2">{formatAddress(listing.address)}</p>
                  <EditListingLink listingId={listing.id} />
                </div>
                <div className="flex gap-6 py-4 border-y border-gray-200">
                  <span>{listing.beds} Beds</span>
                  <span>{listing.baths} Baths</span>
                  {listing.sqft && <span>{listing.sqft} sqft</span>}
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-secondary">Details</h3>
                  <dl className="space-y-1 text-sm text-muted-foreground">
                    {listing.propertyType && (
                      <div className="flex justify-between"><dt>Type</dt><dd>{listing.propertyType}</dd></div>
                    )}
                    {listing.yearBuilt && (
                      <div className="flex justify-between"><dt>Year built</dt><dd>{listing.yearBuilt}</dd></div>
                    )}
                    {listing.taxesAnnual != null && (
                      <div className="flex justify-between"><dt>Taxes</dt><dd>${listing.taxesAnnual}/yr</dd></div>
                    )}
                    {listing.condoFeesMonthly != null && (
                      <div className="flex justify-between"><dt>Condo fees</dt><dd>${listing.condoFeesMonthly}/mo</dd></div>
                    )}
                    {listing.heating && (
                      <div className="flex justify-between"><dt>Heating</dt><dd>{listing.heating}</dd></div>
                    )}
                    {listing.cooling && (
                      <div className="flex justify-between"><dt>Cooling</dt><dd>{listing.cooling}</dd></div>
                    )}
                  </dl>
                </div>
                {Array.isArray(listing.amenities) && listing.amenities.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-secondary mb-2">Amenities</h3>
                    <ul className="flex flex-wrap gap-2">
                      {listing.amenities.map((a: string) => (
                        <li key={a} className="px-2 py-1 bg-muted rounded text-sm">{a}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {Array.isArray(listing.openHouses) && listing.openHouses.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-secondary mb-2">Open Houses</h3>
                    <ul className="space-y-1 text-sm">
                      {listing.openHouses.map((oh: { start: string; end: string; notes?: string }) => (
                        <li key={oh.start}>
                          {oh.start} – {oh.end} {oh.notes && `(${oh.notes})`}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {(listing.virtualTourUrl || listing.videoUrl) && (
                  <div className="flex gap-2">
                    {listing.virtualTourUrl && (
                      <a
                        href={listing.virtualTourUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline-gold inline-block text-center"
                      >
                        Virtual Tour
                      </a>
                    )}
                    {listing.videoUrl && (
                      <a
                        href={listing.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline-gold inline-block text-center"
                      >
                        Video
                      </a>
                    )}
                  </div>
                )}
                <a href={SITE_PHONE_TEL} className="btn-gold w-full block text-center">
                  Call {SITE_PHONE}
                </a>
                <Link href="/contact" className="btn-outline-gold w-full block text-center">
                  Book a Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
