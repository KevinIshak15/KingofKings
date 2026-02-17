"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { ListingImage } from "@/lib/listings/types";

interface ListingMediaUploaderProps {
  images: ListingImage[];
  onChange: (images: ListingImage[]) => void;
  disabled?: boolean;
}

function reorderImages(images: ListingImage[], fromIndex: number, toIndex: number): ListingImage[] {
  const arr = [...images];
  const [removed] = arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, removed);
  return arr.map((img, i) => ({ ...img, sortOrder: i }));
}

export function ListingMediaUploader({
  images,
  onChange,
  disabled,
}: ListingMediaUploaderProps) {
  const [newUrl, setNewUrl] = useState("");

  const handleAddUrl = () => {
    const url = newUrl.trim();
    if (!url || !/^https?:\/\//.test(url)) return;
    const maxOrder = images.length ? Math.max(...images.map((i) => i.sortOrder)) : -1;
    onChange([...images, { url, alt: "", sortOrder: maxOrder + 1 }]);
    setNewUrl("");
  };

  const handleRemove = (index: number) => {
    onChange(images.filter((_, i) => i !== index).map((img, i) => ({ ...img, sortOrder: i })));
  };

  const handleAltChange = (index: number, alt: string) => {
    const next = [...images];
    next[index] = { ...next[index], alt };
    onChange(next);
  };

  const moveUp = (index: number) => {
    if (index <= 0) return;
    onChange(reorderImages(images, index, index - 1));
  };

  const moveDown = (index: number) => {
    if (index >= images.length - 1) return;
    onChange(reorderImages(images, index, index + 1));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Images</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Paste image URL (https://...)"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddUrl())}
            disabled={disabled}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddUrl}
            disabled={disabled || !newUrl.trim()}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
      </div>

      {images.length === 0 && (
        <div className="border border-dashed border-gray-300 rounded-md p-8 text-center text-muted-foreground text-sm">
          No images yet. Add image URLs above.
        </div>
      )}

      <ul className="space-y-3">
        {images.map((img, index) => (
          <li
            key={`${img.url}-${index}`}
            className={cn(
              "flex items-center gap-3 p-3 rounded-md border border-gray-200 bg-muted/30"
            )}
          >
            <div className="flex flex-col gap-0.5">
              <button
                type="button"
                onClick={() => moveUp(index)}
                disabled={index === 0 || disabled}
                className="p-0.5 text-muted-foreground hover:text-foreground disabled:opacity-40"
                aria-label="Move up"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => moveDown(index)}
                disabled={index === images.length - 1 || disabled}
                className="p-0.5 text-muted-foreground hover:text-foreground disabled:opacity-40"
                aria-label="Move down"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <div className="relative w-20 h-14 shrink-0 rounded overflow-hidden bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={img.alt || ""} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <Input
                placeholder="Alt text"
                value={img.alt}
                onChange={(e) => handleAltChange(index, e.target.value)}
                className="h-8 text-sm"
                disabled={disabled}
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => handleRemove(index)}
              disabled={disabled}
              className="text-destructive hover:text-destructive"
              aria-label="Remove"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
