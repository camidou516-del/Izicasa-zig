import React from 'react';
import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import ContactForm from "@/components/contact/ContactPageClient";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Contact",
    description: "Contactez Izicasa Sénégal à Ziguinchor pour vos projets de communication digitale, formations et partenariats.",
    slug: "/contact",
  });
}

export default function ContactPage() {
  return <ContactForm />;
}