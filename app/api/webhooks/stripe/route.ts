import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

// Important en App Router pour lire le raw body
export const runtime = "nodejs";

function tierFromPriceId(priceId?: string | null) {
  if (!priceId) return null;
  if (priceId === process.env.PRICE_PREMIUM_STARTER) return "starter";
  if (priceId === process.env.PRICE_PREMIUM_PRO)     return "pro";
  if (priceId === process.env.PRICE_PREMIUM_POWER)   return "power";
  return null;
}

export async function POST(req: NextRequest) {
  // 1) Vérif de la signature Stripe
  const sig = req.headers.get("stripe-signature") || "";
  const buf = Buffer.from(await req.arrayBuffer());
  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error("[webhook] bad signature:", err?.message || err);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      // Paiement de l’abonnement terminé (création initiale)
      case "checkout.session.completed": {
        const s = event.data.object as any;

        // Récupère la session ENRICHIE pour avoir line_items / price / customer
        const full = await stripe.checkout.sessions.retrieve(s.id, {
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
        const customerId = typeof full.customer === "string" ? full.customer : (full.customer as any)?.id;

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
        break;
      }

      // Changement de statut d’abonnement (renouvellement, upgrade/downgrade…)
      case "customer.subscription.updated": {
        const sub = event.data.object as any;
        const status = sub.status as string;
        const customerId = sub.customer as string;
        const priceId = sub.items?.data?.[0]?.price?.id as string | undefined;
        const tier = status === "active" ? (tierFromPriceId(priceId) || "starter") : null;

        await prisma.user.updateMany({
          where: { stripeCustomerId: customerId },
          data: { premiumTier: tier },
        });
        break;
      }

      // Résiliation
      case "customer.subscription.deleted": {
        const sub = event.data.object as any;
        const customerId = sub.customer as string;

        await prisma.user.updateMany({
          where: { stripeCustomerId: customerId },
          data: { premiumTier: null },
        });
        break;
      }

      default:
        // autres events ignorés
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("[webhook] handler error:", err?.message || err);
    return new NextResponse(`Webhook Handler Error: ${err.message}`, { status: 500 });
  }
}

