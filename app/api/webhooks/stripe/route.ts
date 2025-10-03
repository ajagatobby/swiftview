import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "~/lib/stripe";
import { db } from "~/lib/db";
import { invalidateUserSubscriptionCache } from "~/lib/redis";

export async function POST(req: NextRequest) {
  console.log("Stripe webhook received");
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    console.log("No signature found");
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe
      .get()
      .webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    console.log("Webhook event verified:", event.type);
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  try {
    switch (event.type) {
      case "checkout.session.completed":
        // One-time payment successful, grant lifetime Pro access
        if (session.payment_status === "paid" && session.metadata?.userId) {
          console.log(
            "One-time payment completed for user:",
            session.metadata.userId
          );

          await db.subscription.upsert({
            where: { userId: session.metadata.userId },
            update: {
              stripeCustomerId: session.customer as string,
              stripeSubscriptionId: session.id, // Use session ID for one-time payments
              stripePriceId: "lifetime_pro", // Custom identifier for lifetime access
              stripeCurrentPeriodEnd: new Date("2099-12-31"), // Far future date for lifetime access
              plan: "PRO",
              status: "ACTIVE",
              paymentType: "ONE_TIME",
            },
            create: {
              userId: session.metadata.userId,
              stripeCustomerId: session.customer as string,
              stripeSubscriptionId: session.id, // Use session ID for one-time payments
              stripePriceId: "lifetime_pro", // Custom identifier for lifetime access
              stripeCurrentPeriodEnd: new Date("2099-12-31"), // Far future date for lifetime access
              plan: "PRO",
              status: "ACTIVE",
              paymentType: "ONE_TIME",
            },
          });

          // Invalidate cache
          if (session.metadata.clerkId) {
            await invalidateUserSubscriptionCache(session.metadata.clerkId);
          }
        }
        break;

      // Note: Subscription-related webhook events are no longer needed for one-time payments
      // The following events are kept for reference but won't be triggered:
      // - invoice.payment_succeeded (for recurring payments)
      // - customer.subscription.updated (for subscription changes)
      // - customer.subscription.deleted (for subscription cancellations)

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
