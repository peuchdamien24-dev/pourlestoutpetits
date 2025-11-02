import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

const euroMap: Record<string, string> = {
  starter: process.env.PRICE_PREMIUM_STARTER || '', // ex: "5,99"
  pro:     process.env.PRICE_PREMIUM_PRO || '',
  power:   process.env.PRICE_PREMIUM_POWER || '',
};

export async function POST(req: NextRequest) {
  try {
    const { tier } = await req.json();
    if (!tier || !['starter','pro','power'].includes(tier)) {
      return NextResponse.json({ error: 'tier invalide', got: tier }, { status: 400 });
    }

    const eurosStr = (euroMap[tier] || '').toString().replace(',', '.').trim();
    const euros = parseFloat(eurosStr);
    if (!isFinite(euros) || euros <= 0) {
      return NextResponse.json({ error: 'Montant invalide pour ce tier', tier, eurosStr }, { status: 400 });
    }
    const unit_amount = Math.round(euros * 100); // en centimes

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{
        quantity: 1,
        price_data: {
          currency: 'eur',
          recurring: { interval: 'month' },
          unit_amount,
          product_data: {
            name: `Premium ${tier[0].toUpperCase()}${tier.slice(1)}`,
          },
        },
      }],
      success_url: `${process.env.SITE_URL}/premium?ok=1`,
      cancel_url: `${process.env.SITE_URL}/premium?canceled=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    console.error('Stripe error', e?.statusCode, e?.code, e?.raw?.message || e?.message);
    return NextResponse.json({ error: e?.raw?.message || e?.message || 'Erreur' }, { status: 400 });
  }
}
