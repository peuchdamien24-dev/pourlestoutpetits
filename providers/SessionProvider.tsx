"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import React from "react";

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Tu peux ajouter des options ici si besoin (refetchInterval, etc.)
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
