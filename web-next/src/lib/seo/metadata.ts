import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kingofkings.com";
const SITE_NAME = "King Of Kings Real Estate Services";

export interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description,
  path,
  image = "/og-default.jpg",
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return {
    title: title.length <= 60 ? title : title.slice(0, 57) + "...",
    description: description.length <= 160 ? description : description.slice(0, 157) + "...",
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: "en_CA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
