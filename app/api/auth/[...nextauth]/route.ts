// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Empêche toute tentative de SSG/ISR sur cette route API
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

