import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { stripe } from "@/lib/stripe";

const priceIdMap: Record<string, string> = {
  starter: process.env.PRICE_PREMIUM_STARTER || "",
  pro:     process.env.PRICE_PREMIUM_PRO || "",
  power:   process.env.PRICE_PREMIUM_POWER || "",
};

export async function POST(req: NextRequest) {
  try {
    const { tier } = await req.json();

    if (!tier || !["starter", "pro", "power"].includes(tier)) {
      return NextResponse.json(
        { error: "tier invalide", got: tier, expected: ["starter","pro","power"] },
        { status: 400 }
      );
    }

    const sessionAuth = await getServerSession(authOptions);
    const email = sessionAuth?.user?.email as string | undefined;
    const userId = (sessionAuth?.user as any)?.id as string | undefined;

    if (!email) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

    const price = priceIdMap[tier];
    if (!price) {
      return NextResponse.json(
        { error: "Price non configuré", priceIdMap, tier },
        { status: 400 }
      );
    }

    const checkout = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price, quantity: 1 }],
      success_url: `${process.env.SITE_URL}/premium/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.SITE_URL}/premium?canceled=1`,

      // ❌ SUPPRIMÉ: customer_creation (réservé à mode=payment)
      // ✅ OK pour subscription : Stripe crée/associe le customer via l'email
      customer_email: email,

      // Utile pour le webhook
      client_reference_id: userId ?? email,
      metadata: { tier },
    });

    return NextResponse.json({ url: checkout.url });
  } catch (e: any) {
    console.error("Stripe error", e?.statusCode, e?.code, e?.raw?.message || e?.message);
    return NextResponse.json(
      { error: e?.raw?.message || e?.message || "Erreur inconnue" },
      { status: 400 }
    );
  }
}
