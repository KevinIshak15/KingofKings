"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  listingFormSchema,
  type ListingFormValues,
  defaultListingFormValues,
} from "@/lib/listings/schema";
import { ListingMediaUploader } from "./ListingMediaUploader";
import { ListingPreviewCard } from "./ListingPreviewCard";
import { createListing, updateListing } from "@/lib/listings/crud";
import { generateListingSlug } from "@/lib/listings/slug";
import type { Listing } from "@/lib/listings/types";
import { useToast } from "@/hooks/use-toast";

interface ListingEditorFormProps {
  listing?: Listing | null;
  listingId?: string | null;
}

function arrOrStrToStr(v: string[] | string | null | undefined): string | null {
  if (v == null) return null;
  return Array.isArray(v) ? v.join(", ") : String(v);
}

function formValuesFromListing(l: Listing): ListingFormValues {
  return {
    status: l.status,
    listingType: l.listingType,
    propertyCategory: l.propertyCategory,
    propertyType: l.propertyType,
    mlsNumber: l.mlsNumber ?? null,
    title: l.title,
    description: l.description,
    price: l.price,
    address: l.address,
    beds: l.beds,
    baths: l.baths,
    sqft: l.sqft ?? null,
    lot: l.lot ?? null,
    yearBuilt: l.yearBuilt ?? null,
    parking: l.parking ?? null,
    taxesAnnual: l.taxesAnnual ?? null,
    condoFeesMonthly: l.condoFeesMonthly ?? null,
    heating: l.heating ?? null,
    cooling: l.cooling ?? null,
    basement: l.basement ?? null,
    exterior: l.exterior ?? null,
    amenities: l.amenities ?? [],
    appliancesIncluded: l.appliancesIncluded ?? [],
    virtualTourUrl: l.virtualTourUrl ?? undefined,
    videoUrl: l.videoUrl ?? undefined,
    openHouses: l.openHouses ?? [],
    images: l.images ?? [],
    seoTitle: l.seoTitle ?? null,
    seoDescription: l.seoDescription ?? null,
    listingDescription: l.listingDescription ?? null,
    locationDescription: l.locationDescription ?? null,
    timeOnSite: l.timeOnSite ?? null,
    communityName: l.communityName ?? null,
    areaName: l.areaName ?? null,
    bathsObj: l.bathsObj ?? null,
    squareFeet: l.squareFeet ?? null,
    squareFootageDisplay: l.squareFootageDisplay ?? null,
    buildingType: l.buildingType ?? null,
    storeys: l.storeys ?? null,
    titleType: l.titleType ?? null,
    landSize: l.landSize ?? null,
    ageOfBuilding: l.ageOfBuilding ?? null,
    annualPropertyTaxes: l.annualPropertyTaxes ?? null,
    parkingType: l.parkingType ?? null,
    totalParkingSpaces: l.totalParkingSpaces ?? null,
    bedroomsAboveGrade: l.bedroomsAboveGrade ?? null,
    bathroomsTotal: l.bathroomsTotal ?? null,
    bathroomsPartial: l.bathroomsPartial ?? null,
    flooring: arrOrStrToStr(l.flooring),
    basementType: l.basementType ?? null,
    features: arrOrStrToStr(l.features),
    foundationType: l.foundationType ?? null,
    style: l.style ?? null,
    rentalEquipment: arrOrStrToStr(l.rentalEquipment),
    heatingType: l.heatingType ?? null,
    utilityType: arrOrStrToStr(l.utilityType),
    utilitySewer: l.utilitySewer ?? null,
    water: l.water ?? null,
    exteriorFinish: arrOrStrToStr(l.exteriorFinish),
    rooms: l.rooms ?? [],
    unitsPreferenceDefault: l.unitsPreferenceDefault ?? "imperial",
    lotFrontage: l.lotFrontage ?? null,
    lotDepth: l.lotDepth ?? null,
  };
}

export function ListingEditorForm({ listing, listingId }: ListingEditorFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(listingId ?? listing?.id ?? null);

  const form = useForm<ListingFormValues>({
    resolver: zodResolver(listingFormSchema),
    defaultValues: listing ? formValuesFromListing(listing) : defaultListingFormValues,
  });

  useEffect(() => {
    if (listing) {
      form.reset(formValuesFromListing(listing));
    } else {
      form.reset(defaultListingFormValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listing?.id, !!listing]);

  const watchValues = form.watch();

  const buildPayload = useCallback((values: ListingFormValues, status: "draft" | "published") => {
    const bathsTotal = values.bathroomsTotal ?? values.baths;
    const bathsObj =
      values.bathroomsTotal != null || values.bathroomsPartial != null
        ? { total: bathsTotal ?? 0, partial: values.bathroomsPartial ?? 0 }
        : null;
    const rooms = (values.rooms ?? []).filter((r) => (r.level?.trim() || r.name?.trim()));
    return {
      ...values,
      status,
      virtualTourUrl: values.virtualTourUrl || null,
      videoUrl: values.videoUrl || null,
      bathsObj,
      rooms,
    };
  }, []);

  const onSaveDraft = useCallback(async () => {
    setSaving(true);
    try {
      const values = form.getValues();
      const payload = buildPayload(values, "draft");
      if (currentId) {
        await updateListing(currentId, payload);
        toast({ title: "Draft saved" });
      } else {
        const id = await createListing({
          ...payload,
          slug: "",
        });
        setCurrentId(id);
        toast({ title: "Draft created. You can now add images." });
      }
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Error",
        description: e instanceof Error ? e.message : "Failed to save",
      });
    } finally {
      setSaving(false);
    }
  }, [currentId, toast, form, buildPayload]);

  const onPublish = useCallback(async () => {
    const ok = await form.trigger();
    if (!ok) {
      const err = form.formState.errors;
      const first = Object.values(err)[0];
      toast({
        variant: "destructive",
        title: "Validation error",
        description: first?.message?.toString() ?? "Please fix the form",
      });
      return;
    }
    setSaving(true);
    try {
      const values = form.getValues();
      const payload = buildPayload(values, "published");
      let slug: string;
      if (currentId) {
        await updateListing(currentId, payload);
        slug = listing?.slug ?? generateListingSlug(values.address.city, values.address.street, values.listingType, currentId);
        toast({ title: "Published" });
      } else {
        const id = await createListing({ ...payload, slug: "" });
        setCurrentId(id);
        slug = generateListingSlug(values.address.city, values.address.street, values.listingType, id);
        toast({ title: "Published" });
      }
      router.push(`/listings/${slug}`);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Error",
        description: e instanceof Error ? e.message : "Failed to publish",
      });
    } finally {
      setSaving(false);
    }
  }, [currentId, toast, form, buildPayload, listing?.slug, router]);

  const onUnpublish = useCallback(async () => {
    if (!currentId) return;
    setSaving(true);
    try {
      const payload = buildPayload(form.getValues(), "draft");
      await updateListing(currentId, { ...payload, publishedAt: null });
      form.setValue("status", "draft");
      toast({ title: "Unpublished" });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Error",
        description: e instanceof Error ? e.message : "Failed to unpublish",
      });
    } finally {
      setSaving(false);
    }
  }, [currentId, toast, form, buildPayload]);

  const onArchive = useCallback(async () => {
    if (!currentId) return;
    setSaving(true);
    try {
      await updateListing(currentId, { status: "archived" });
      form.setValue("status", "archived");
      toast({ title: "Archived" });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Error",
        description: e instanceof Error ? e.message : "Failed to archive",
      });
    } finally {
      setSaving(false);
    }
  }, [currentId, toast, form]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="font-serif text-2xl md:text-3xl text-secondary">
          {listing ? "Edit Listing" : "New Listing"}
        </h1>
        <Link
          href="/listings"
          className="text-sm text-primary hover:underline font-medium shrink-0"
        >
          ← Back to Listings
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-6">
        <form className="space-y-4">
          <Accordion type="multiple" defaultValue={["basics", "location", "description"]} className="w-full">
            <AccordionItem value="basics">
              <AccordionTrigger>1. Basics</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Listing type</Label>
                    <Select
                      value={watchValues.listingType}
                      onValueChange={(v) => form.setValue("listingType", v as "sale" | "rent" | "commercial")}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sale">Sale</SelectItem>
                        <SelectItem value="rent">Rent</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Property category</Label>
                    <Select
                      value={watchValues.propertyCategory}
                      onValueChange={(v) => form.setValue("propertyCategory", v as "home" | "condo" | "commercial")}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="home">Home</SelectItem>
                        <SelectItem value="condo">Condo</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Property type</Label>
                  <Input
                    {...form.register("propertyType")}
                    placeholder="e.g. Single Family, Townhouse"
                  />
                  {form.formState.errors.propertyType && (
                    <p className="text-sm text-destructive mt-1">{form.formState.errors.propertyType.message}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Price *</Label>
                    <Input type="number" {...form.register("price")} />
                    {form.formState.errors.price && (
                      <p className="text-sm text-destructive mt-1">{form.formState.errors.price.message}</p>
                    )}
                  </div>
                  <div>
                    <Label>MLS #</Label>
                    <Input {...form.register("mlsNumber")} placeholder="Optional" />
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <Label>Beds *</Label>
                    <Input type="number" min={0} {...form.register("beds")} />
                  </div>
                  <div>
                    <Label>Baths *</Label>
                    <Input type="number" min={0} {...form.register("baths")} />
                  </div>
                  <div>
                    <Label>Bathrooms Total</Label>
                    <Input
                      type="number"
                      min={0}
                      value={watchValues.bathroomsTotal ?? ""}
                      onChange={(e) => form.setValue("bathroomsTotal", e.target.value ? Number(e.target.value) : null)}
                      placeholder="Override"
                    />
                  </div>
                  <div>
                    <Label>Bathrooms Partial</Label>
                    <Input
                      type="number"
                      min={0}
                      value={watchValues.bathroomsPartial ?? ""}
                      onChange={(e) => form.setValue("bathroomsPartial", e.target.value ? Number(e.target.value) : null)}
                      placeholder="Optional"
                    />
                  </div>
                  <div>
                    <Label>Sqft</Label>
                    <Input type="number" min={0} {...form.register("sqft")} />
                  </div>
                  <div>
                    <Label>Square Footage Display</Label>
                    <Input
                      {...form.register("squareFootageDisplay")}
                      placeholder="e.g. 1500 - 2000 sqft"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label>Time on Site</Label>
                    <Input {...form.register("timeOnSite")} placeholder="e.g. 1 day" />
                  </div>
                  <div>
                    <Label>Community Name</Label>
                    <Input {...form.register("communityName")} placeholder="e.g. 1051 - Walker" />
                  </div>
                  <div>
                    <Label>Area Name</Label>
                    <Input {...form.register("areaName")} placeholder="e.g. Walker" />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="location">
              <AccordionTrigger>2. Location</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2">
                <div>
                  <Label>Street *</Label>
                  <Input {...form.register("address.street")} />
                  {form.formState.errors.address?.street && (
                    <p className="text-sm text-destructive mt-1">{form.formState.errors.address.street.message}</p>
                  )}
                </div>
                <div>
                  <Label>Unit</Label>
                  <Input {...form.register("address.unit")} placeholder="Optional" />
                </div>
                <div>
                  <Label>City *</Label>
                  <Input {...form.register("address.city")} />
                  {form.formState.errors.address?.city && (
                    <p className="text-sm text-destructive mt-1">{form.formState.errors.address.city.message}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Province</Label>
                    <Input {...form.register("address.province")} />
                  </div>
                  <div>
                    <Label>Postal code</Label>
                    <Input {...form.register("address.postalCode")} />
                  </div>
                </div>
                <div>
                  <Label>Country</Label>
                  <Input {...form.register("address.country")} />
                </div>
                <div>
                  <Label>Location Description</Label>
                  <Input {...form.register("locationDescription")} placeholder="e.g. Britannia Rd. and Tremaine Rd." />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="description">
              <AccordionTrigger>3. Description</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2">
                <div>
                  <Label>Title *</Label>
                  <Input {...form.register("title")} placeholder="Short headline" />
                  {form.formState.errors.title && (
                    <p className="text-sm text-destructive mt-1">{form.formState.errors.title.message}</p>
                  )}
                </div>
                <div>
                  <Label>Description *</Label>
                  <textarea
                    {...form.register("description")}
                    rows={6}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                  {form.formState.errors.description && (
                    <p className="text-sm text-destructive mt-1">{form.formState.errors.description.message}</p>
                  )}
                </div>
                <div>
                  <Label>Listing Description (full)</Label>
                  <textarea
                    {...form.register("listingDescription")}
                    rows={8}
                    placeholder="Extended description for detail page (optional)"
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="media">
              <AccordionTrigger>4. Media</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2">
                <ListingMediaUploader
                  images={watchValues.images}
                  onChange={(imgs) => form.setValue("images", imgs)}
                  disabled={saving}
                />
                <div>
                  <Label>Virtual tour URL</Label>
                  <Input
                    {...form.register("virtualTourUrl")}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <Label>Video URL</Label>
                  <Input {...form.register("videoUrl")} placeholder="https://..." />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="property-summary">
              <AccordionTrigger>5. Property Summary</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label>Building Type</Label>
                    <Input {...form.register("buildingType")} placeholder="e.g. House" />
                  </div>
                  <div>
                    <Label>Storeys</Label>
                    <Input
                      value={watchValues.storeys != null ? String(watchValues.storeys) : ""}
                      onChange={(e) => form.setValue("storeys", e.target.value || null)}
                      placeholder="e.g. 2"
                    />
                  </div>
                  <div>
                    <Label>Title Type</Label>
                    <Input {...form.register("titleType")} placeholder="e.g. Freehold" />
                  </div>
                  <div>
                    <Label>Land Size</Label>
                    <Input {...form.register("landSize")} placeholder="e.g. 26 x 90 FT" />
                  </div>
                  <div>
                    <Label>Age of Building</Label>
                    <Input {...form.register("ageOfBuilding")} placeholder="e.g. New building" />
                  </div>
                  <div>
                    <Label>Annual Property Taxes</Label>
                    <Input
                      value={watchValues.annualPropertyTaxes != null ? String(watchValues.annualPropertyTaxes) : ""}
                      onChange={(e) => form.setValue("annualPropertyTaxes", e.target.value ? e.target.value : null)}
                      placeholder="e.g. $0 or 8500"
                    />
                  </div>
                  <div>
                    <Label>Parking Type</Label>
                    <Input {...form.register("parkingType")} placeholder="e.g. Garage" />
                  </div>
                  <div>
                    <Label>Total Parking Spaces</Label>
                    <Input
                      type="number"
                      min={0}
                      value={watchValues.totalParkingSpaces ?? ""}
                      onChange={(e) => form.setValue("totalParkingSpaces", e.target.value ? Number(e.target.value) : null)}
                      placeholder="Optional"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="details">
              <AccordionTrigger>6. Details & Building</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Lot frontage (ft)</Label>
                    <Input
                      type="number"
                      value={watchValues.lot?.frontage ?? ""}
                      onChange={(e) =>
                        form.setValue("lot", {
                          ...watchValues.lot,
                          frontage: e.target.value ? Number(e.target.value) : null,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Lot depth (ft)</Label>
                    <Input
                      type="number"
                      value={watchValues.lot?.depth ?? ""}
                      onChange={(e) =>
                        form.setValue("lot", {
                          ...watchValues.lot,
                          depth: e.target.value ? Number(e.target.value) : null,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Lot Frontage (display)</Label>
                    <Input {...form.register("lotFrontage")} placeholder="e.g. 26 ft" />
                  </div>
                  <div>
                    <Label>Lot Depth (display)</Label>
                    <Input {...form.register("lotDepth")} placeholder="e.g. 90 ft" />
                  </div>
                  <div>
                    <Label>Acres</Label>
                    <Input
                      type="number"
                      value={watchValues.lot?.acres ?? ""}
                      onChange={(e) =>
                        form.setValue("lot", {
                          ...watchValues.lot,
                          acres: e.target.value ? Number(e.target.value) : null,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Year built</Label>
                    <Input
                      type="number"
                      value={watchValues.yearBuilt ?? ""}
                      onChange={(e) =>
                        form.setValue("yearBuilt", e.target.value ? Number(e.target.value) : null)
                      }
                    />
                  </div>
                  <div>
                    <Label>Taxes (annual)</Label>
                    <Input
                      type="number"
                      value={watchValues.taxesAnnual ?? ""}
                      onChange={(e) =>
                        form.setValue("taxesAnnual", e.target.value ? Number(e.target.value) : null)
                      }
                    />
                  </div>
                  <div>
                    <Label>Condo fees (monthly)</Label>
                    <Input
                      type="number"
                      value={watchValues.condoFeesMonthly ?? ""}
                      onChange={(e) =>
                        form.setValue("condoFeesMonthly", e.target.value ? Number(e.target.value) : null)
                      }
                    />
                  </div>
                  <div>
                    <Label>Bedrooms above grade</Label>
                    <Input
                      type="number"
                      min={0}
                      value={watchValues.bedroomsAboveGrade ?? ""}
                      onChange={(e) => form.setValue("bedroomsAboveGrade", e.target.value ? Number(e.target.value) : null)}
                      placeholder="Optional"
                    />
                  </div>
                  <div>
                    <Label>Parking spots</Label>
                    <Input
                      type="number"
                      value={watchValues.parking?.spots ?? ""}
                      onChange={(e) =>
                        form.setValue("parking", {
                          ...watchValues.parking,
                          spots: e.target.value ? Number(e.target.value) : null,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label>Heating</Label>
                  <Input {...form.register("heating")} />
                </div>
                <div>
                  <Label>Heating Type</Label>
                  <Input {...form.register("heatingType")} placeholder="e.g. Forced air (Natural gas)" />
                </div>
                <div>
                  <Label>Cooling</Label>
                  <Input {...form.register("cooling")} placeholder="Comma-separated" />
                </div>
                <div>
                  <Label>Flooring</Label>
                  <Input {...form.register("flooring")} placeholder="e.g. Hardwood, Ceramic" />
                </div>
                <div>
                  <Label>Basement</Label>
                  <Input {...form.register("basement")} />
                </div>
                <div>
                  <Label>Basement Type</Label>
                  <Input {...form.register("basementType")} placeholder="e.g. Unfinished" />
                </div>
                <div>
                  <Label>Features</Label>
                  <Input {...form.register("features")} placeholder="e.g. Carpet Free" />
                </div>
                <div>
                  <Label>Foundation Type</Label>
                  <Input {...form.register("foundationType")} placeholder="e.g. Concrete" />
                </div>
                <div>
                  <Label>Style</Label>
                  <Input {...form.register("style")} placeholder="e.g. Semi-detached" />
                </div>
                <div>
                  <Label>Rental Equipment</Label>
                  <Input {...form.register("rentalEquipment")} placeholder="e.g. Water Heater, Water Heater - Tankless" />
                </div>
                <div>
                  <Label>Utility Type</Label>
                  <Input {...form.register("utilityType")} placeholder="Comma-separated" />
                </div>
                <div>
                  <Label>Utility Sewer</Label>
                  <Input {...form.register("utilitySewer")} placeholder="e.g. Sanitary sewer" />
                </div>
                <div>
                  <Label>Water</Label>
                  <Input {...form.register("water")} placeholder="e.g. Municipal water" />
                </div>
                <div>
                  <Label>Exterior</Label>
                  <Input {...form.register("exterior")} />
                </div>
                <div>
                  <Label>Exterior Finish</Label>
                  <Input {...form.register("exteriorFinish")} placeholder="e.g. Brick, Stone" />
                </div>
                <div>
                  <Label>Amenities</Label>
                  <Input
                    value={(watchValues.amenities ?? []).join(", ")}
                    onChange={(e) =>
                      form.setValue(
                        "amenities",
                        e.target.value ? e.target.value.split(",").map((s) => s.trim()).filter(Boolean) : []
                      )
                    }
                    placeholder="Comma-separated: Backyard, Deck, Garden"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="rooms">
              <AccordionTrigger>7. Rooms</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2">
                <p className="text-sm text-muted-foreground">
                  Add room entries with level, name, and optional dimensions.
                </p>
                <div>
                  <Label>Units preference</Label>
                  <Select
                    value={watchValues.unitsPreferenceDefault ?? "imperial"}
                    onValueChange={(v) => form.setValue("unitsPreferenceDefault", v as "imperial" | "metric")}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="imperial">Imperial</SelectItem>
                      <SelectItem value="metric">Metric</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {(watchValues.rooms ?? []).map((room, i) => (
                  <div key={i} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 items-end border p-3 rounded">
                    <Input
                      placeholder="Level"
                      value={room.level}
                      onChange={(e) => {
                        const arr = [...(watchValues.rooms ?? [])];
                        arr[i] = { ...arr[i], level: e.target.value };
                        form.setValue("rooms", arr);
                      }}
                    />
                    <Input
                      placeholder="Room name"
                      value={room.name}
                      onChange={(e) => {
                        const arr = [...(watchValues.rooms ?? [])];
                        arr[i] = { ...arr[i], name: e.target.value };
                        form.setValue("rooms", arr);
                      }}
                    />
                    <Input
                      placeholder="Dimensions (Imperial)"
                      value={room.dimensionsImperial ?? ""}
                      onChange={(e) => {
                        const arr = [...(watchValues.rooms ?? [])];
                        arr[i] = { ...arr[i], dimensionsImperial: e.target.value };
                        form.setValue("rooms", arr);
                      }}
                    />
                    <Input
                      placeholder="Dimensions (Metric)"
                      value={room.dimensionsMetric ?? ""}
                      onChange={(e) => {
                        const arr = [...(watchValues.rooms ?? [])];
                        arr[i] = { ...arr[i], dimensionsMetric: e.target.value };
                        form.setValue("rooms", arr);
                      }}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="sm:col-span-4"
                      onClick={() => {
                        const arr = (watchValues.rooms ?? []).filter((_, j) => j !== i);
                        form.setValue("rooms", arr);
                      }}
                    >
                      Remove room
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    form.setValue("rooms", [
                      ...(watchValues.rooms ?? []),
                      { level: "", name: "" },
                    ])
                  }
                >
                  Add room
                </Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="openhouses">
              <AccordionTrigger>8. Open Houses</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2">
                <p className="text-sm text-muted-foreground">
                  Add open house dates. Format: YYYY-MM-DD for start/end.
                </p>
                {(watchValues.openHouses ?? []).map((oh, i) => (
                  <div key={i} className="flex gap-2 items-end">
                    <Input
                      placeholder="Start"
                      value={oh.start}
                      onChange={(e) => {
                        const arr = [...(watchValues.openHouses ?? [])];
                        arr[i] = { ...arr[i], start: e.target.value };
                        form.setValue("openHouses", arr);
                      }}
                    />
                    <Input
                      placeholder="End"
                      value={oh.end}
                      onChange={(e) => {
                        const arr = [...(watchValues.openHouses ?? [])];
                        arr[i] = { ...arr[i], end: e.target.value };
                        form.setValue("openHouses", arr);
                      }}
                    />
                    <Input
                      placeholder="Notes"
                      value={oh.notes ?? ""}
                      onChange={(e) => {
                        const arr = [...(watchValues.openHouses ?? [])];
                        arr[i] = { ...arr[i], notes: e.target.value };
                        form.setValue("openHouses", arr);
                      }}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const arr = (watchValues.openHouses ?? []).filter((_, j) => j !== i);
                        form.setValue("openHouses", arr);
                      }}
                    >
                      ×
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    form.setValue("openHouses", [
                      ...(watchValues.openHouses ?? []),
                      { start: "", end: "" },
                    ])
                  }
                >
                  Add open house
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </form>
        </div>

        <div className="lg:sticky lg:top-8 h-fit">
        <ListingPreviewCard listing={watchValues} status={watchValues.status} />
        <div className="mt-6 flex flex-col gap-2">
          <Button onClick={onSaveDraft} disabled={saving} variant="outline">
            Save Draft
          </Button>
          <Button onClick={onPublish} disabled={saving}>
            Publish
          </Button>
          {currentId && watchValues.status === "published" && (
            <Button onClick={onUnpublish} disabled={saving} variant="secondary">
              Unpublish
            </Button>
          )}
          {currentId && (
            <Button onClick={onArchive} disabled={saving} variant="destructive">
              Archive
            </Button>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
