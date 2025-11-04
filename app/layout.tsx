import "./globals.css";
import Link from "next/link";
import Providers from "./providers";

export const metadata = {
  title: "PourLesToutPetits",
  description: "Marketplace enfants — achat/vente sécurisés",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-gray-50 text-gray-900">
        <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-6">
            <Link href="/" className="font-bold">PourLesToutPetits</Link>
            <nav className="ml-auto flex items-center gap-4 text-sm">
              <Link href="/sell" className="hover:text-emerald-700">Vendre</Link>
              <Link href="/premium" className="hover:text-emerald-700">Premium</Link>
              <Link href="/signin" className="hover:text-emerald-700">Se connecter</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">
          <Providers>{children}</Providers>
        </main>
        <footer className="mt-16 border-t bg-white">
          <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-500">
            © {new Date().getFullYear()} PourLesToutPetits
          </div>
        </footer>
      </body>
    </html>
  );
}