import type { Metadata } from "next";

export const siteName = "Izicasa Sénégal";
export const siteDescription =
  "Agence communication digitale à Ziguinchor, Sénégal : formations, partenariats, stratégie de contenu et accompagnement digital local.";
export const siteUrl = "https://izicasa-senegal.com";
export const siteLocale = "fr_FR";

export function buildMetadata({
  title,
  description = siteDescription,
  slug,
}: {
  title: string;
  description?: string;
  slug?: string;
}): Metadata {
  const canonicalUrl = slug ? `${siteUrl}${slug}` : siteUrl;

  return {
    title: `${title} | ${siteName}`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url: canonicalUrl,
      siteName,
      locale: siteLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteName}`,
      description,
    },
  };
}
