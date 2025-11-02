import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const items = await prisma.item.findMany({ include: { photos: true, seller: true }, orderBy: { createdAt: 'desc' } });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, category, condition, priceCents, city, photoUrl } = body || {};
    if (!title || !description || !category || !condition || !priceCents) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 });
    }
    const demo = await prisma.user.upsert({
      where: { email: 'demo@local' },
      update: {},
      create: { email: 'demo@local', name: 'Demo' }
    });
    const item = await prisma.item.create({
      data: {
        sellerId: demo.id,
        title, description, category, condition, priceCents, city,
        photos: photoUrl ? { create: [{ url: photoUrl }] } : undefined
      },
      include: { photos: true }
    });
    return NextResponse.json({ id: item.id });
  } catch (e:any) {
    return NextResponse.json({ error: e.message || 'Erreur serveur' }, { status: 500 });
  }
}
