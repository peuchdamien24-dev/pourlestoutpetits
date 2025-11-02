import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { email, password, name, isSeller } = await req.json();
  if (!email || !password) return NextResponse.json({ error: "email et password requis" }, { status: 400 });
  const e = email.toLowerCase().trim();
  const exists = await prisma.user.findUnique({ where: { email: e } });
  if (exists) return NextResponse.json({ error: "Email déjà utilisé" }, { status: 409 });
  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email: e, passwordHash: hash, name: name || null, isSeller: !!isSeller },
    select: { id: true, email: true, name: true, isSeller: true, createdAt: true },
  });
  return NextResponse.json(user, { status: 201 });
}