import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://kingofkings.com"),
  title: { default: "King Of Kings Real Estate Services | Property Management GTA", template: "%s | King Of Kings" },
  description: "Professional property management and luxury real estate services in the Greater Toronto Area. Trusted by landlords and investors.",
  openGraph: { type: "website" },
  icons: { icon: "/logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
