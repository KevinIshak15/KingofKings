"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import Link from "next/link";
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
import type { Listing } from "@/lib/listings/types";
import { useToast } from "@/hooks/use-toast";

interface ListingEditorFormProps {
  listing?: Listing | null;
  listingId?: string | null;
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
  };
}

export function ListingEditorForm({ listing, listingId }: ListingEditorFormProps) {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(listingId ?? listing?.id ?? null);

  const form = useForm<ListingFormValues>({
    resolver: zodResolver(listingFormSchema),
    defaultValues: listing ? formValuesFromListing(listing) : defaultListingFormValues,
  });

  const watchValues = form.watch();

  const onSaveDraft = useCallback(async () => {
    setSaving(true);
    try {
      const values = form.getValues();
      const payload = {
        ...values,
        status: "draft" as const,
        virtualTourUrl: values.virtualTourUrl || null,
        videoUrl: values.videoUrl || null,
      };
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
  }, [currentId, toast, form]);

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
      const payload = {
        ...values,
        status: "published" as const,
        virtualTourUrl: values.virtualTourUrl || null,
        videoUrl: values.videoUrl || null,
      };
      if (currentId) {
        await updateListing(currentId, payload);
        toast({ title: "Published" });
      } else {
        const id = await createListing({ ...payload, slug: "" });
        setCurrentId(id);
        toast({ title: "Published" });
      }
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Error",
        description: e instanceof Error ? e.message : "Failed to publish",
      });
    } finally {
      setSaving(false);
    }
  }, [currentId, toast, form]);

  const onUnpublish = useCallback(async () => {
    if (!currentId) return;
    setSaving(true);
    try {
      await updateListing(currentId, { ...form.getValues(), status: "draft", publishedAt: null });
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
  }, [currentId, toast, form]);

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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-2xl md:text-3xl text-secondary">
            {listing ? "Edit Listing" : "New Listing"}
          </h1>
          <Link
            href="/listings"
            className="text-sm text-primary hover:underline font-medium"
          >
            ← Back to Listings
          </Link>
        </div>

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
                    <Label>Sqft</Label>
                    <Input type="number" min={0} {...form.register("sqft")} />
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

            <AccordionItem value="details">
              <AccordionTrigger>5. Details</AccordionTrigger>
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
                </div>
                <div>
                  <Label>Heating</Label>
                  <Input {...form.register("heating")} />
                </div>
                <div>
                  <Label>Cooling</Label>
                  <Input {...form.register("cooling")} />
                </div>
                <div>
                  <Label>Basement</Label>
                  <Input {...form.register("basement")} />
                </div>
                <div>
                  <Label>Exterior</Label>
                  <Input {...form.register("exterior")} />
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
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="openhouses">
              <AccordionTrigger>6. Open Houses</AccordionTrigger>
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
  );
}
