import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "credentials",
      credentials: { email: {}, password: {} },
      async authorize(creds) {
        const email = (creds?.email || "").toString().toLowerCase().trim();
        const password = (creds?.password || "").toString();
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.passwordHash) return null;
        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return null;
        return { id: user.id, email: user.email, name: user.name || "", isSeller: user.isSeller ?? false };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) { token.sub = (user as any).id; (token as any).isSeller = (user as any).isSeller; }
      return token;
    },
    async session({ session, token }) {
      if (token?.sub) (session.user as any).id = token.sub;
      if ((token as any)?.isSeller !== undefined) (session.user as any).isSeller = (token as any).isSeller;
      return session;
    },
  },
  pages: { signIn: "/signin" },
};