import Link from "next/link";
import Carousel from "../components/Carousel";

export default function Home() {
  const SLIDES = [
    { src: "https://placehold.co/1280x720?text=Jouets+educatifs", alt: "Jouets éducatifs colorés", caption: "Des jeux et jouets d’éveil sélectionnés" },
    { src: "https://placehold.co/1280x720?text=Vetements+bebe", alt: "Vêtements bébé", caption: "Des vêtements tout doux à petits prix" },
    { src: "https://placehold.co/1280x720?text=Puericulture", alt: "Puériculture", caption: "Tout pour accompagner les premiers mois" },
  ];

  const POPULAR = [
    { id: "a1", title: "Lot bodies 6–9 mois",  price: "12,00 €", badge: "Très bon état", img: "https://placehold.co/600x400?text=Bodies" },
    { id: "a2", title: "Chaussures bébé (20)", price: "15,00 €", badge: "Comme neuf",     img: "https://placehold.co/600x400?text=Chaussures" },
    { id: "a3", title: "Peluche doudou lapin",  price: "8,00 €",  badge: "Bon état",       img: "https://placehold.co/600x400?text=Doudou" },
    { id: "a4", title: "Gigoteuse 0–6 mois",    price: "10,00 €", badge: "Très bon état", img: "https://placehold.co/600x400?text=Gigoteuse" },
    { id: "a5", title: "Puzzles en bois",       price: "9,50 €",  badge: "Bon état",       img: "https://placehold.co/600x400?text=Puzzles" },
    { id: "a6", title: "Combinaison pluie",     price: "18,00 €", badge: "Comme neuf",     img: "https://placehold.co/600x400?text=Combinaison" },
  ];

  return (
    <div className="space-y-16" data-marker="home-v4">
      {/* Carrousel */}
      <Carousel slides={SLIDES} className="bg-white" />

      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-50 via-white to-emerald-50 p-8 sm:p-12">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Bienvenue sur <span className="text-emerald-600">PourLesToutPetits</span>
        </h1>
        <p className="mt-4 text-gray-600">
          Achetez et vendez des affaires d’enfants — simple, rapide, sécurisé.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/sell" className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition bg-emerald-600 hover:bg-emerald-700">
            Vendre un article
          </Link>
          <Link href="/premium" className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100">
            Découvrir Premium
          </Link>
        </div>
      </section>

      {/* Catégories */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Catégories</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {["Vêtements", "Puériculture", "Jouets & Jeux"].map((c) => (
            <Link key={c} href="/" className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-center justify-between">
                <div className="text-base font-semibold">{c}</div>
                <span className="text-emerald-600">→</span>
              </div>
              <p className="mt-1 text-sm text-gray-600">Parcourir {c.toLowerCase()}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Articles populaires */}
      <section className="space-y-6">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-semibold">Articles populaires</h2>
          <Link href="/" className="text-sm font-medium text-emerald-700 hover:text-emerald-800">
            Voir plus →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {POPULAR.map((p) => (
            <article key={p.id} className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                <img src={p.img} alt={p.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="line-clamp-1 text-sm font-semibold text-gray-900">{p.title}</h3>
                  <span className="shrink-0 rounded-lg bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                    {p.badge}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-base font-semibold text-gray-900">{p.price}</span>
                  <button type="button" className="inline-flex items-center rounded-lg border px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50">
                    Détails
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}