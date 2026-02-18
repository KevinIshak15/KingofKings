import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { ListingGallery } from "@/components/listings/ListingGallery";
import { RoomsTable } from "@/components/listings/RoomsTable";
import { EditListingLink } from "@/components/admin/EditListingLink";
import { getPublishedListingBySlug } from "@/lib/listings/server";
import { SITE_PHONE, SITE_PHONE_TEL } from "@/lib/site";
import { Bed, Bath, Square } from "lucide-react";

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

function formatArrayOrString(v: string[] | string | null | undefined): string {
  if (v == null) return "";
  return Array.isArray(v) ? v.join(", ") : String(v);
}

function formatLocation(listing: { address?: { city?: string; province?: string; postalCode?: string }; areaName?: string | null }) {
  const city = listing.address?.city ?? "";
  const area = listing.areaName ? ` (${listing.areaName})` : "";
  const prov = listing.address?.province ?? "";
  const postal = listing.address?.postalCode ?? "";
  return [city + area, prov, postal].filter(Boolean).join(", ");
}

function BoxCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border border-gray-200 bg-white p-6 ${className}`}>
      {children}
    </div>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-gray-100 pt-4 mt-4 first:border-t-0 first:pt-0 first:mt-0">
      <h4 className="font-semibold text-secondary mb-3 text-sm uppercase tracking-wider">{title}</h4>
      {children}
    </div>
  );
}

function SpecGridItem({ label, value }: { label: string; value: string | number | null | undefined }) {
  if (value == null || value === "") return null;
  return (
    <div>
      <p className="font-semibold text-secondary text-sm">{label}</p>
      <p className="text-muted-foreground text-sm mt-0.5">{String(value)}</p>
    </div>
  );
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

  const bathsVal = listing.bathroomsTotal ?? listing.bathsObj?.total ?? listing.baths;
  const floorSizeVal = listing.sqft ?? listing.squareFeet?.min ?? listing.squareFeet?.max;
  const sqftDisplay = listing.squareFootageDisplay ?? listing.squareFeet?.display ?? (listing.sqft != null ? `${listing.sqft} sqft` : null);
  const taxesDisplay = (listing.annualPropertyTaxes ?? listing.taxesAnnual) != null
    ? (typeof (listing.annualPropertyTaxes ?? listing.taxesAnnual) === "string" ? String(listing.annualPropertyTaxes ?? listing.taxesAnnual) : `$${listing.annualPropertyTaxes ?? listing.taxesAnnual}/yr`)
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    ...(listing.mlsNumber && { identifier: listing.mlsNumber }),
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
    numberOfBathroomsTotal: bathsVal,
    floorSize: floorSizeVal ? { "@type": "QuantitativeValue", value: floorSizeVal, unitCode: "FTK" } : undefined,
  };

  const heroImage = listing.images?.[0]?.url || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop";

  const hasBuildingDetails =
    listing.bedroomsAboveGrade != null ||
    listing.bathroomsTotal != null ||
    listing.bathroomsPartial != null ||
    formatArrayOrString(listing.flooring) ||
    listing.basementType ||
    formatArrayOrString(listing.features) ||
    listing.foundationType ||
    listing.style ||
    formatArrayOrString(listing.rentalEquipment) ||
    formatArrayOrString(listing.cooling) ||
    listing.heatingType ||
    formatArrayOrString(listing.utilityType) ||
    listing.utilitySewer ||
    listing.water ||
    formatArrayOrString(listing.exteriorFinish) ||
    listing.exterior;

  const hasExteriorParking = formatArrayOrString(listing.exteriorFinish) || listing.exterior || listing.parkingType || listing.totalParkingSpaces != null;

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
        adminSlot={<EditListingLink listingId={listing.id} variant="button" />}
        large={false}
      />

      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <ListingGallery images={listing.images || []} alt={listing.title} />

          <div className="mt-8 space-y-6">
            {/* 1. Property Summary box */}
            <BoxCard>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {listing.timeOnSite && (
                    <span className="inline-block px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-xs mb-4">
                      {listing.timeOnSite}
                    </span>
                  )}
                  <p className="text-primary font-bold text-3xl">{formatPrice(listing.price)}</p>
                  <p className="font-serif text-xl text-secondary mt-1">{listing.title}</p>
                  <p className="text-muted-foreground mt-1">{formatAddress(listing.address)}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{formatLocation(listing)}</p>
                  {listing.mlsNumber && (
                    <p className="text-sm text-muted-foreground mt-1">MLS® Number: {listing.mlsNumber}</p>
                  )}
                </div>
                <div className="flex gap-8 sm:gap-12">
                  <div className="flex flex-col items-center">
                    <Bed className="w-8 h-8 text-primary mb-1" />
                    <span className="font-bold text-secondary text-lg">{listing.beds}</span>
                    <span className="text-xs text-muted-foreground uppercase">Bedrooms</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Bath className="w-8 h-8 text-primary mb-1" />
                    <span className="font-bold text-secondary text-lg">{bathsVal}</span>
                    <span className="text-xs text-muted-foreground uppercase">Bathrooms</span>
                  </div>
                  {sqftDisplay && (
                    <div className="flex flex-col items-center">
                      <Square className="w-8 h-8 text-primary mb-1" />
                      <span className="font-bold text-secondary text-lg">{sqftDisplay.replace(/ sqft$/i, "")}</span>
                      <span className="text-xs text-muted-foreground uppercase">Square Feet</span>
                    </div>
                  )}
                </div>
              </div>
            </BoxCard>

            {/* 2. Listing Description */}
            <BoxCard>
              <h2 className="font-serif text-2xl text-secondary mb-4">Listing Description</h2>
              <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
                {(listing.listingDescription ?? listing.description) || "—"}
              </div>
            </BoxCard>

            {/* 3. Location Description */}
            {listing.locationDescription && (
              <BoxCard>
                <h2 className="font-serif text-2xl text-secondary mb-4">Location Description</h2>
                <p className="text-gray-600 leading-relaxed">{listing.locationDescription}</p>
              </BoxCard>
            )}

            {/* 4. Property Summary grid */}
            <BoxCard>
              <h2 className="font-serif text-2xl text-secondary mb-6">Property Summary</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <SpecGridItem label="Property Type" value={listing.propertyType} />
                <SpecGridItem label="Building Type" value={listing.buildingType} />
                <SpecGridItem label="Community Name" value={listing.communityName} />
                <SpecGridItem label="Title" value={listing.titleType} />
                <SpecGridItem label="Storeys" value={listing.storeys} />
                <SpecGridItem label="Square Footage" value={sqftDisplay} />
                <SpecGridItem label="Annual Property Taxes" value={taxesDisplay} />
                <SpecGridItem label="Parking Type" value={listing.parkingType ?? listing.parking?.type} />
                <SpecGridItem label="Land Size" value={listing.landSize} />
                <SpecGridItem label="Time on REALTOR.ca" value={listing.timeOnSite} />
                <SpecGridItem label="Age Of Building" value={listing.ageOfBuilding} />
              </div>
            </BoxCard>

            {/* 5. Building */}
            {hasBuildingDetails && (
              <BoxCard>
                <h2 className="font-serif text-2xl text-secondary mb-6">Building</h2>
                <div className="space-y-0">
                  {(listing.bedroomsAboveGrade != null) && (
                    <SubSection title="Bedrooms">
                      <div><p className="font-semibold text-secondary text-sm">Above Grade</p><p className="text-muted-foreground text-sm mt-0.5">{listing.bedroomsAboveGrade}</p></div>
                    </SubSection>
                  )}
                  {(listing.bathroomsTotal != null || listing.bathroomsPartial != null) && (
                    <SubSection title="Bathrooms">
                      <div className="grid grid-cols-2 gap-4">
                        {listing.bathroomsTotal != null && <div><p className="font-semibold text-secondary text-sm">Total</p><p className="text-muted-foreground text-sm mt-0.5">{listing.bathroomsTotal}</p></div>}
                        {listing.bathroomsPartial != null && <div><p className="font-semibold text-secondary text-sm">Partial</p><p className="text-muted-foreground text-sm mt-0.5">{listing.bathroomsPartial}</p></div>}
                      </div>
                    </SubSection>
                  )}
                  {(formatArrayOrString(listing.flooring) || listing.basementType) && (
                    <SubSection title="Interior Features">
                      <div className="grid grid-cols-2 gap-4">
                        {formatArrayOrString(listing.flooring) && <SpecGridItem label="Flooring" value={formatArrayOrString(listing.flooring)} />}
                        {listing.basementType && <SpecGridItem label="Basement Type" value={listing.basementType} />}
                      </div>
                    </SubSection>
                  )}
                  {(formatArrayOrString(listing.features) || listing.foundationType || listing.style || formatArrayOrString(listing.rentalEquipment)) && (
                    <SubSection title="Building Features">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <SpecGridItem label="Features" value={formatArrayOrString(listing.features)} />
                        <SpecGridItem label="Foundation Type" value={listing.foundationType} />
                        <SpecGridItem label="Style" value={listing.style} />
                        <SpecGridItem label="Rental Equipment" value={formatArrayOrString(listing.rentalEquipment)} />
                      </div>
                    </SubSection>
                  )}
                  {(formatArrayOrString(listing.cooling) || (listing.heatingType ?? listing.heating)) && (
                    <SubSection title="Heating & Cooling">
                      <div className="grid grid-cols-2 gap-4">
                        <SpecGridItem label="Cooling" value={formatArrayOrString(listing.cooling)} />
                        <SpecGridItem label="Heating Type" value={listing.heatingType ?? listing.heating} />
                      </div>
                    </SubSection>
                  )}
                  {(formatArrayOrString(listing.utilityType) || listing.utilitySewer || listing.water) && (
                    <SubSection title="Utilities">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <SpecGridItem label="Utility Type" value={formatArrayOrString(listing.utilityType)} />
                        <SpecGridItem label="Utility Sewer" value={listing.utilitySewer} />
                        <SpecGridItem label="Water" value={listing.water} />
                      </div>
                    </SubSection>
                  )}
                  {formatArrayOrString(listing.exteriorFinish) || listing.exterior ? (
                    <SubSection title="Exterior Features">
                      <SpecGridItem label="Exterior Finish" value={formatArrayOrString(listing.exteriorFinish) || listing.exterior} />
                    </SubSection>
                  ) : null}
                  {(formatArrayOrString(listing.exteriorFinish) || listing.exterior) && (
                    <SubSection title="Exterior Features">
                      <SpecGridItem label="Exterior Finish" value={formatArrayOrString(listing.exteriorFinish) || listing.exterior} />
                    </SubSection>
                  )}
                </div>
              </BoxCard>
            )}

            {/* 6. Exterior Features & Parking */}
            {hasExteriorParking && (
              <BoxCard>
                <h2 className="font-serif text-2xl text-secondary mb-4">Exterior Features</h2>
                {(formatArrayOrString(listing.exteriorFinish) || listing.exterior) && (
                  <div className="mb-4">
                    <p className="font-semibold text-secondary text-sm">Exterior Finish</p>
                    <p className="text-muted-foreground text-sm mt-0.5">{formatArrayOrString(listing.exteriorFinish) || listing.exterior}</p>
                  </div>
                )}
                {(listing.parkingType || listing.totalParkingSpaces != null) && (
                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <h4 className="font-semibold text-secondary mb-3 text-sm uppercase tracking-wider">Parking</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <SpecGridItem label="Parking Type" value={listing.parkingType ?? listing.parking?.type} />
                      <SpecGridItem label="Total Parking Spaces" value={listing.totalParkingSpaces} />
                    </div>
                  </div>
                )}
              </BoxCard>
            )}

            {/* 7. Measurements */}
            {sqftDisplay && (
              <BoxCard>
                <h2 className="font-serif text-2xl text-secondary mb-4">Measurements</h2>
                <div>
                  <p className="font-semibold text-secondary text-sm">Square Footage</p>
                  <p className="text-muted-foreground text-sm mt-0.5">{sqftDisplay}</p>
                </div>
              </BoxCard>
            )}

            {/* 8. Rooms */}
            {listing.rooms && listing.rooms.length > 0 && (
              <BoxCard>
                <RoomsTable rooms={listing.rooms} unitsPreferenceDefault={listing.unitsPreferenceDefault ?? "imperial"} />
              </BoxCard>
            )}

            {/* 9. Land */}
            {(listing.lotFrontage || listing.lotDepth) && (
              <BoxCard>
                <h2 className="font-serif text-2xl text-secondary mb-4">Land</h2>
                <div className="border-t border-gray-100 pt-4">
                  <h4 className="font-semibold text-secondary mb-3 text-sm uppercase tracking-wider">Lot Features</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <SpecGridItem label="Frontage" value={listing.lotFrontage} />
                    <SpecGridItem label="Land Depth" value={listing.lotDepth} />
                  </div>
                </div>
              </BoxCard>
            )}

            {/* 10. Amenities */}
            {Array.isArray(listing.amenities) && listing.amenities.length > 0 && (
              <BoxCard>
                <h2 className="font-serif text-2xl text-secondary mb-4">Amenities</h2>
                <ul className="flex flex-wrap gap-2">
                  {listing.amenities.map((a: string) => (
                    <li key={a} className="px-3 py-1.5 bg-muted rounded text-sm">{a}</li>
                  ))}
                </ul>
              </BoxCard>
            )}

            {/* 11. Open Houses */}
            {Array.isArray(listing.openHouses) && listing.openHouses.length > 0 && (
              <BoxCard>
                <h2 className="font-serif text-2xl text-secondary mb-4">Open Houses</h2>
                <ul className="space-y-2 text-sm">
                  {listing.openHouses.map((oh: { start: string; end: string; notes?: string }) => (
                    <li key={oh.start}>
                      {oh.start} – {oh.end} {oh.notes && `(${oh.notes})`}
                    </li>
                  ))}
                </ul>
              </BoxCard>
            )}

            {/* 12. Virtual Tour / Video / CTAs */}
            <BoxCard>
              <div className="flex flex-col sm:flex-row gap-4">
                {((listing.virtualTourUrl ?? listing.media?.virtualTourUrl) || (listing.videoUrl ?? listing.media?.videoUrl)) && (
                  <div className="flex gap-2">
                    {(listing.virtualTourUrl ?? listing.media?.virtualTourUrl) && (
                      <a
                        href={listing.virtualTourUrl ?? listing.media?.virtualTourUrl ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline-gold inline-block text-center"
                      >
                        Virtual Tour
                      </a>
                    )}
                    {(listing.videoUrl ?? listing.media?.videoUrl) && (
                      <a
                        href={listing.videoUrl ?? listing.media?.videoUrl ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline-gold inline-block text-center"
                      >
                        Video
                      </a>
                    )}
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-4 sm:ml-auto">
                  <a href={SITE_PHONE_TEL} className="btn-gold block text-center">
                    Call {SITE_PHONE}
                  </a>
                  <Link href="/contact" className="btn-outline-gold block text-center">
                    Book a Consultation
                  </Link>
                </div>
              </div>
            </BoxCard>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
