import SessionProvider from "@/providers/SessionProvider";
import "./globals.css";
import React from "react";
import Link from "next/link";
import AuthSessionProvider from "@/providers/SessionProvider";

export const metadata = {
  title: "Pour les Tout Petits",
  description: "Marketplace avec abonnement Stripe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-white text-slate-900">
        <AuthSessionProvider>
          <header className="flex items-center gap-4 border-b px-4 py-2">
            <Link href="/" className="font-bold">VintedLike</Link>
            <nav className="ml-auto flex gap-4">
              <Link href="/sell">Vendre</Link>
              <Link href="/premium">Premium</Link>
              <Link href="/signin">Se connecter</Link>
            </nav>
          </header>

          <main className="p-6">{children}</main>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
