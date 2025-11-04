import JsonLd from "./JsonLd";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pour les tout petits – Jeux, éveil et activités pour enfants",
  description: "Pour les tout petits : marketplace ludique et éducative pour découvrir, vendre ou acheter des produits d’éveil, jeux et accessoires pour enfants.",
  openGraph: {
    title: "Pour les tout petits",
    description: "Marketplace ludique et éducative pour enfants – jeux, éveil et accessoires.",
    url: "https://www.pourlestoutpetits.fr",
    siteName: "Pour les tout petits",
    images: [
      {
        url: "https://www.pourlestoutpetits.fr/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pour les tout petits – Jeux et éveil"
      }
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pour les tout petits",
    description: "Marketplace ludique et éducative pour enfants.",
    images: ["https://www.pourlestoutpetits.fr/og-image.jpg"],
  },
};

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main style={{padding:20,fontFamily:'system-ui, sans-serif'}}>
      <h1>Pour les Tout Petits</h1>
      <p>Accueil en ligne ✅</p>
      <ul>
        <li><a href="/sell">Vendre</a></li>
        <li><a href="/premium">Premium</a></li>
        <li><a href="/signin">Se connecter</a></li>
      </ul>
    <JsonLd />
	</main>
  );
}
