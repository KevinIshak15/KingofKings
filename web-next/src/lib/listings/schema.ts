import { z } from "zod";

const addressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  unit: z.string().nullable().optional(),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province is required"),
  postalCode: z.string(),
  country: z.string().default("Canada"),
});

const lotSchema = z.object({
  frontage: z.number().nullable().optional(),
  depth: z.number().nullable().optional(),
  acres: z.number().nullable().optional(),
}).nullable().optional();

const parkingSchema = z.object({
  spots: z.number().nullable().optional(),
  type: z.string().nullable().optional(),
  garage: z.boolean().nullable().optional(),
}).nullable().optional();

const imageSchema = z.object({
  url: z.string().url(),
  alt: z.string(),
  sortOrder: z.number(),
});

const openHouseSchema = z.object({
  start: z.string(),
  end: z.string(),
  notes: z.string().optional(),
});

const roomSchema = z.object({
  level: z.string(),
  name: z.string(),
  dimensionsImperial: z.string().optional(),
  dimensionsMetric: z.string().optional(),
});

const bathsObjSchema = z.object({
  total: z.number(),
  partial: z.number().optional(),
}).nullable().optional();

const squareFeetSchema = z.object({
  min: z.number().optional(),
  max: z.number().optional(),
  display: z.string().optional(),
}).nullable().optional();

const urlOptional = z.string().optional().refine((v) => !v || v === "" || /^https?:\/\//.test(v), "Invalid URL");

export const listingFormSchema = z.object({
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  listingType: z.enum(["sale", "rent", "commercial"]),
  propertyCategory: z.enum(["home", "condo", "commercial"]),
  propertyType: z.string(),
  mlsNumber: z.string().nullable().optional(),
  title: z.string(),
  description: z.string(),
  price: z.coerce.number().min(0),
  address: addressSchema,
  beds: z.coerce.number().min(0),
  baths: z.coerce.number().min(0),
  sqft: z.coerce.number().nullable().optional(),
  lot: lotSchema,
  yearBuilt: z.coerce.number().nullable().optional(),
  parking: parkingSchema,
  taxesAnnual: z.coerce.number().nullable().optional(),
  condoFeesMonthly: z.coerce.number().nullable().optional(),
  heating: z.string().nullable().optional(),
  cooling: z.string().nullable().optional(),
  basement: z.string().nullable().optional(),
  exterior: z.string().nullable().optional(),
  amenities: z.array(z.string()).optional(),
  appliancesIncluded: z.array(z.string()).optional(),
  virtualTourUrl: urlOptional,
  videoUrl: urlOptional,
  openHouses: z.array(openHouseSchema).optional(),
  images: z.array(imageSchema),
  seoTitle: z.string().nullable().optional(),
  seoDescription: z.string().nullable().optional(),

  // Extended fields
  listingDescription: z.string().nullable().optional(),
  locationDescription: z.string().nullable().optional(),
  timeOnSite: z.string().nullable().optional(),
  communityName: z.string().nullable().optional(),
  areaName: z.string().nullable().optional(),
  bathsObj: bathsObjSchema,
  squareFeet: squareFeetSchema,
  squareFootageDisplay: z.string().nullable().optional(),
  buildingType: z.string().nullable().optional(),
  storeys: z.union([z.number(), z.string()]).nullable().optional(),
  titleType: z.string().nullable().optional(),
  landSize: z.string().nullable().optional(),
  ageOfBuilding: z.string().nullable().optional(),
  annualPropertyTaxes: z.union([z.number(), z.string()]).nullable().optional(),
  parkingType: z.string().nullable().optional(),
  totalParkingSpaces: z.number().nullable().optional(),
  bedroomsAboveGrade: z.number().nullable().optional(),
  bathroomsTotal: z.number().nullable().optional(),
  bathroomsPartial: z.number().nullable().optional(),
  flooring: z.string().nullable().optional(),
  basementType: z.string().nullable().optional(),
  features: z.string().nullable().optional(),
  foundationType: z.string().nullable().optional(),
  style: z.string().nullable().optional(),
  rentalEquipment: z.string().nullable().optional(),
  heatingType: z.string().nullable().optional(),
  utilityType: z.string().nullable().optional(),
  utilitySewer: z.string().nullable().optional(),
  water: z.string().nullable().optional(),
  exteriorFinish: z.string().nullable().optional(),
  rooms: z.array(roomSchema).optional(),
  unitsPreferenceDefault: z.enum(["imperial", "metric"]).nullable().optional(),
  lotFrontage: z.string().nullable().optional(),
  lotDepth: z.string().nullable().optional(),
}).refine((data) => {
  if (data.status !== "published") return true;
  return !!(
    data.title?.trim() &&
    data.price >= 0 &&
    data.address?.city?.trim() &&
    data.listingType &&
    data.propertyCategory &&
    data.description?.trim() &&
    Array.isArray(data.images) &&
    data.images.length >= 1 &&
    data.beds >= 0 &&
    data.baths >= 0
  );
}, {
  message: "To publish: title, price, city, listing type, property category, description, at least 1 image, beds and baths are required.",
  path: ["status"],
});

export type ListingFormValues = z.infer<typeof listingFormSchema>;

export const defaultListingFormValues: ListingFormValues = {
  status: "draft",
  listingType: "sale",
  propertyCategory: "home",
  propertyType: "",
  mlsNumber: null,
  title: "",
  description: "",
  price: 0,
  address: {
    street: "",
    unit: null,
    city: "",
    province: "Ontario",
    postalCode: "",
    country: "Canada",
  },
  beds: 0,
  baths: 0,
  sqft: null,
  lot: null,
  yearBuilt: null,
  parking: null,
  taxesAnnual: null,
  condoFeesMonthly: null,
  heating: null,
  cooling: null,
  basement: null,
  exterior: null,
  amenities: [],
  appliancesIncluded: [],
  virtualTourUrl: undefined,
  videoUrl: undefined,
  openHouses: [],
  images: [],
  seoTitle: null,
  seoDescription: null,
  listingDescription: null,
  locationDescription: null,
  timeOnSite: null,
  communityName: null,
  areaName: null,
  bathsObj: null,
  squareFeet: null,
  squareFootageDisplay: null,
  buildingType: null,
  storeys: null,
  titleType: null,
  landSize: null,
  ageOfBuilding: null,
  annualPropertyTaxes: null,
  parkingType: null,
  totalParkingSpaces: null,
  bedroomsAboveGrade: null,
  bathroomsTotal: null,
  bathroomsPartial: null,
  flooring: null,
  basementType: null,
  features: null,
  foundationType: null,
  style: null,
  rentalEquipment: null,
  heatingType: null,
  utilityType: null,
  utilitySewer: null,
  water: null,
  exteriorFinish: null,
  rooms: [],
  unitsPreferenceDefault: "imperial",
  lotFrontage: null,
  lotDepth: null,
};
