import "./globals.css";
import React from "react";
import Link from "next/link";
import AuthSessionProvider from "./providers/SessionProvider";

export const metadata = {
  title: "VintedLike",
  description: "Marketplace avec Stripe + Auth",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <header style={{ padding: "12px 16px", borderBottom: "1px solid #eee", display: "flex", gap: 12 }}>
          <Link href="/" style={{ fontWeight: 700, color: "black" }}>VintedLike</Link>
          <nav style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
            <Link href="/sell">Vendre</Link>
            <Link href="/premium">Premium</Link>
            <Link href="/signin">Se connecter</Link>
          </nav>
        </header>

        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  );
}