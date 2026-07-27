import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import { siteDescription, siteLocale, siteName, siteUrl } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: siteUrl,
    siteName,
    locale: siteLocale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteName,
    description: siteDescription,
    url: siteUrl,
    telephone: "+221 77 367 99 85",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Château d'Eau",
      addressLocality: "Ziguinchor",
      postalCode: "27000",
      addressCountry: "SN",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "13",
    },
    sameAs: [
      "https://www.facebook.com/izicasasenegal/",
      "https://www.instagram.com/izicasa_senegal/",
      "https://www.tiktok.com/@izicasa_senegal",
      "https://x.com/izicasa221",
    ],
  };

  return (
    <html lang="fr" className={`${inter.variable} ${sora.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        {children}
      </body>
    </html>
  );
}

