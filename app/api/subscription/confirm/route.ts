import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

function tierFromPriceId(priceId?: string | null) {
  if (!priceId) return null;
  if (priceId === process.env.PRICE_PREMIUM_STARTER) return "starter";
  if (priceId === process.env.PRICE_PREMIUM_PRO)     return "pro";
  if (priceId === process.env.PRICE_PREMIUM_POWER)   return "power";
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const { session_id } = await req.json();
    if (!session_id) return NextResponse.json({ error: "session_id manquant" }, { status: 400 });

    const full = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items.data.price", "customer", "subscription"],
    });

    const email =
      full.customer_details?.email ||
      (typeof full.customer === "object" ? (full.customer as any)?.email : undefined) ||
      full.customer_email ||
      full.metadata?.email ||
      full.client_reference_id;

    const priceId = full.line_items?.data?.[0]?.price?.id as string | undefined;
    const tier = tierFromPriceId(priceId) || full.metadata?.tier || "starter";
    const customerId =
      typeof full.customer === "string" ? full.customer : (full.customer as any)?.id;

    if (!email && !customerId) {
      return NextResponse.json({ error: "Impossible d'identifier l'utilisateur" }, { status: 400 });
    }

    if (email) {
      await prisma.user.updateMany({
        where: { email },
        data: { stripeCustomerId: customerId ?? undefined, premiumTier: tier },
      });
    } else if (customerId) {
      await prisma.user.updateMany({
        where: { stripeCustomerId: customerId },
        data: { premiumTier: tier },
      });
    }

    return NextResponse.json({ ok: true, tier, customerId, email });
  } catch (e: any) {
    console.error("confirm error:", e?.message || e);
    return NextResponse.json({ error: e?.message || "Erreur" }, { status: 400 });
  }
}