/** Firestore listing document shape */
export type ListingStatus = "draft" | "published" | "archived";
export type ListingType = "sale" | "rent" | "commercial";
export type PropertyCategory = "home" | "condo" | "commercial";

export interface ListingAddress {
  street: string;
  unit?: string | null;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

export interface ListingLot {
  frontage?: number | null;
  depth?: number | null;
  acres?: number | null;
}

export interface ListingParking {
  spots?: number | null;
  type?: string | null;
  garage?: boolean | null;
}

export interface ListingImage {
  url: string;
  alt: string;
  sortOrder: number;
}

export interface OpenHouse {
  start: string;
  end: string;
  notes?: string;
}

export interface Listing {
  id: string;
  status: ListingStatus;
  listingType: ListingType;
  propertyCategory: PropertyCategory;
  propertyType: string;
  mlsNumber?: string | null;
  title: string;
  description: string;
  price: number;
  address: ListingAddress;
  beds: number;
  baths: number;
  sqft?: number | null;
  lot?: ListingLot | null;
  yearBuilt?: number | null;
  parking?: ListingParking | null;
  taxesAnnual?: number | null;
  condoFeesMonthly?: number | null;
  heating?: string | null;
  cooling?: string | null;
  basement?: string | null;
  exterior?: string | null;
  amenities?: string[];
  appliancesIncluded?: string[];
  virtualTourUrl?: string | null;
  videoUrl?: string | null;
  openHouses?: OpenHouse[];
  images: ListingImage[];
  slug: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string | null;
}

export interface ListingCreateInput
  extends Omit<Listing, "id" | "createdAt" | "updatedAt" | "slug" | "publishedAt"> {
  slug?: string;
}

export interface ListingUpdateInput
  extends Partial<Omit<Listing, "id" | "createdAt" | "updatedAt" | "slug">> {
  publishedAt?: string | null;
}
