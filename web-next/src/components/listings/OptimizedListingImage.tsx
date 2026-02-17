"use client";

import Image from "next/image";

/** Hostnames allowed by next.config images.remotePatterns */
const ALLOWED_HOSTS = new Set([
  "images.unsplash.com",
  "i.imgur.com",
  "res.cloudinary.com",
  "lh3.googleusercontent.com",
  "images.pexels.com",
  "picsum.photos",
  "placehold.co",
  "ar.rdcpix.com",
  "photos.mlspin.com",
  "photos.smartmls.com",
]);

function hostAllowed(url: string): boolean {
  try {
    const host = new URL(url).hostname.toLowerCase();
    if (ALLOWED_HOSTS.has(host)) return true;
    if (host.endsWith(".cloudinary.com") || host.endsWith(".crea.ca")) return true;
    return false;
  } catch {
    return false;
  }
}

interface OptimizedListingImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/**
 * Uses Next.js Image for allowed hosts (optimization, lazy loading, responsive srcset).
 * Falls back to native img with loading="lazy" for unknown hosts.
 */
export function OptimizedListingImage({
  src,
  alt,
  fill = false,
  sizes,
  priority = false,
  className = "object-cover",
}: OptimizedListingImageProps) {
  if (!src) return null;

  if (hostAllowed(src)) {
    return fill ? (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"}
        priority={priority}
        className={className}
      />
    ) : (
      <Image
        src={src}
        alt={alt}
        width={400}
        height={300}
        sizes={sizes ?? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"}
        priority={priority}
        className={`w-full h-full ${className}`}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={`w-full h-full ${className}`}
    />
  );
}
