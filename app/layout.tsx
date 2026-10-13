import type { Metadata, Viewport } from "next";
import { Inter, Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";
import CookieBanner from "@/components/CookieBanner";
import { brand } from "@/lib/data";
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Archivo({ subsets: ["latin"], weight: ["600", "700", "800", "900"], style: ["normal", "italic"], variable: "--font-display", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });
export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: { default: "Apex Motors · Premium & Performance Cars in Miami", template: "%s · Apex Motors" },
  description: "Certified Porsche, AMG, BMW M, Ferrari, Lamborghini and EVs. Instant finance and trade-in quotes, and Max, our 24/7 AI sales assistant who books test drives in seconds.",
  keywords: ["luxury car dealer Miami", "used Porsche 911", "AMG G63 for sale", "Lamborghini Urus", "car financing", "trade-in value"],
  openGraph: { title: "Apex Motors", description: "Performance cars, instant numbers, test drives booked 24/7 by AI.", type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image" },
};
export const viewport: Viewport = { themeColor: "#09090b", width: "device-width", initialScale: 1 };
const jsonLd = { "@context": "https://schema.org", "@type": "AutoDealer", name: brand.name, telephone: brand.phone, email: brand.email,
  address: { "@type": "PostalAddress", streetAddress: "2200 Biscayne Blvd", addressLocality: "Miami", addressRegion: "FL", postalCode: "33137", addressCountry: "US" },
  openingHours: "Mo-Sa 09:00-20:00", aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1873" } };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body className="font-sans">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-carbon-950">Skip to content</a>
        {children}<ChatWidget /><CookieBanner />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
