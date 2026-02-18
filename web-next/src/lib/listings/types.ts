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

export interface ListingBaths {
  total: number;
  partial?: number;
}

export interface ListingSquareFeet {
  min?: number;
  max?: number;
  display?: string;
}

export interface ListingRoom {
  level: string;
  name: string;
  dimensionsImperial?: string;
  dimensionsMetric?: string;
}

export interface ListingMediaPhoto {
  url: string;
  alt: string;
  sortOrder: number;
}

export interface ListingMedia {
  photos?: ListingMediaPhoto[];
  floorplans?: ListingMediaPhoto[];
  virtualTourUrl?: string | null;
  videoUrl?: string | null;
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

  // Extended fields (optional)
  listingDescription?: string | null;
  locationDescription?: string | null;
  timeOnSite?: string | null;
  communityName?: string | null;
  areaName?: string | null;
  bathsObj?: ListingBaths | null;
  squareFeet?: ListingSquareFeet | null;
  squareFootageDisplay?: string | null;
  buildingType?: string | null;
  storeys?: number | string | null;
  titleType?: string | null;
  landSize?: string | null;
  ageOfBuilding?: string | null;
  annualPropertyTaxes?: number | string | null;
  parkingType?: string | null;
  totalParkingSpaces?: number | null;
  bedroomsAboveGrade?: number | null;
  bathroomsTotal?: number | null;
  bathroomsPartial?: number | null;
  flooring?: string[] | string | null;
  basementType?: string | null;
  features?: string[] | string | null;
  foundationType?: string | null;
  style?: string | null;
  rentalEquipment?: string[] | string | null;
  heatingType?: string | null;
  utilityType?: string[] | string | null;
  utilitySewer?: string | null;
  water?: string | null;
  exteriorFinish?: string[] | string | null;
  rooms?: ListingRoom[];
  unitsPreferenceDefault?: "imperial" | "metric" | null;
  lotFrontage?: string | null;
  lotDepth?: string | null;
  media?: ListingMedia | null;
}

export interface ListingCreateInput
  extends Omit<Listing, "id" | "createdAt" | "updatedAt" | "slug" | "publishedAt"> {
  slug?: string;
}

export interface ListingUpdateInput
  extends Partial<Omit<Listing, "id" | "createdAt" | "updatedAt" | "slug">> {
  publishedAt?: string | null;
}
