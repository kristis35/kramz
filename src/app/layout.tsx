import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { brand, hero } from "@/content/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin", "latin-ext"] });
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: `${brand.name} – ${hero.title} ${hero.titleAccent}`,
  description: hero.text,
  openGraph: {
    title: `${brand.name} – ${hero.title} ${hero.titleAccent}`,
    description: hero.text,
    url: brand.url,
    siteName: brand.domain,
    locale: "lt_LT",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f1e7",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="lt" className={`${inter.variable} ${bricolage.variable} antialiased`}>
      <body className="min-h-dvh font-sans">{children}</body>
    </html>
  );
}
