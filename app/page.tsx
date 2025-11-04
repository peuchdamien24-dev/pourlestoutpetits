import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-16" data-marker="home-v2">
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
    </div>
  );
}