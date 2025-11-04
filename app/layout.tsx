import React from "react";
import AuthSessionProvider from "./providers/SessionProvider";
import AuthButtons from "@/components/AuthButtons";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0 }}>
        <AuthSessionProvider>
          <header style={{ padding: "12px 16px", borderBottom: "1px solid #eee", display: "flex", gap: 12, alignItems: "center" }}>
            <a href="/" style={{ fontWeight: 700, textDecoration: "none", color: "black" }}>VintedLike</a>
            <nav style={{ marginLeft: "auto", display: "flex", gap: 16, alignItems: "center" }}>
              <a href="/sell">Vendre</a>
              <a href="/premium">Premium</a>
              <AuthButtons />
            </nav>
          </header>
          <main style={{ maxWidth: 960, margin: "20px auto", padding: "0 16px" }}>
            {children}
          </main>
        </AuthSessionProvider>
      </body>
    </html>
  );
}import './globals.css'
