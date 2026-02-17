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
  virtualTourUrl: z.string().optional().refine((v) => !v || v === "" || /^https?:\/\//.test(v), "Invalid URL"),
  videoUrl: z.string().optional().refine((v) => !v || v === "" || /^https?:\/\//.test(v), "Invalid URL"),
  openHouses: z.array(openHouseSchema).optional(),
  images: z.array(imageSchema),
  seoTitle: z.string().nullable().optional(),
  seoDescription: z.string().nullable().optional(),
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
};
