# Vinted-like (Next.js + Prisma + Stripe) — starter

## Démarrage
```bash
npm install
npx prisma migrate dev -n init
cp .env.example .env  # configure les clés Stripe
npm run dev
```
- Ouvre http://localhost:3000
- /sell pour créer une annonce (+ onboarding vendeur)
- /premium pour prendre un abonnement

## Stripe (mode test)
Configure dans `.env` :
- STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, STRIPE_CONNECT_CLIENT_ID
- PRICE_PREMIUM_STARTER / PRO / POWER

## Commission & transferts
La route `/api/checkout` crée un PaymentIntent avec `application_fee_amount` (10% min 0,50€) et `transfer_data.destination` (compte vendeur).

## Subscriptions
La route `/api/subscription/checkout` crée une session Checkout Billing vers les Price configurés.

## Webhook
`/api/webhooks/stripe` gère `payment_intent.succeeded` et `checkout.session.completed` (à compléter pour mettre à jour ta DB).

## Base de données
SQLite via Prisma (`prisma/dev.db`) pour aller vite. Passe à Postgres en prod.
