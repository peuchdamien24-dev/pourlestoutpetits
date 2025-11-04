"use client";
import Script from "next/script";

export default function JsonLd() {
  return (
    <Script
      id="jsonld-organization"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Pour les tout petits",
          "url": "https://www.pourlestoutpetits.fr",
          "logo": "https://www.pourlestoutpetits.fr/logo.png",
          "sameAs": [
            "https://www.facebook.com/pourlestoutpetits",
            "https://www.instagram.com/pourlestoutpetits"
          ]
        }),
      }}
    />
  );
}