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
  const subscription = event.data.object as Stripe.Subscription;

  try {
    switch (event.type) {
      case "checkout.session.completed":
        // Payment successful, create or update subscription
        if (session.subscription && session.metadata?.userId) {
          const stripeSubscription = (await stripe
            .get()
            .subscriptions.retrieve(
              session.subscription as string
            )) as Stripe.Subscription;

          // Debug: Log the subscription object to see its structure
          console.log(
            "Stripe subscription object:",
            JSON.stringify(stripeSubscription, null, 2)
          );

          // Get current period end with fallback
          const currentPeriodEnd =
            (stripeSubscription as unknown as { current_period_end?: number })
              .current_period_end ||
            Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60;

          console.log("Current period end timestamp:", currentPeriodEnd);

          await db.subscription.upsert({
            where: { userId: session.metadata.userId },
            update: {
              stripeCustomerId: session.customer as string,
              stripeSubscriptionId: stripeSubscription.id,
              stripePriceId: stripeSubscription.items.data[0].price.id,
              stripeCurrentPeriodEnd: new Date(currentPeriodEnd * 1000),
              plan: "PRO",
              status: "ACTIVE",
            },
            create: {
              userId: session.metadata.userId,
              stripeCustomerId: session.customer as string,
              stripeSubscriptionId: stripeSubscription.id,
              stripePriceId: stripeSubscription.items.data[0].price.id,
              stripeCurrentPeriodEnd: new Date(currentPeriodEnd * 1000),
              plan: "PRO",
              status: "ACTIVE",
            },
          });

          // Invalidate cache
          if (session.metadata.clerkId) {
            await invalidateUserSubscriptionCache(session.metadata.clerkId);
          }
        }
        break;

      case "invoice.payment_succeeded":
        // Renew subscription
        if (subscription.customer) {
          const dbSubscription = await db.subscription.findUnique({
            where: { stripeCustomerId: subscription.customer as string },
            include: { user: true },
          });

          if (dbSubscription) {
            await db.subscription.update({
              where: { id: dbSubscription.id },
              data: {
                stripeCurrentPeriodEnd: new Date(
                  ((subscription as unknown as { current_period_end?: number })
                    .current_period_end ||
                    Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60) * 1000
                ),
                status: "ACTIVE",
              },
            });

            // Invalidate cache
            await invalidateUserSubscriptionCache(dbSubscription.user.clerkId);
          }
        }
        break;

      case "customer.subscription.updated":
        // Handle subscription updates
        const dbSubscription = await db.subscription.findUnique({
          where: { stripeSubscriptionId: subscription.id },
          include: { user: true },
        });

        if (dbSubscription) {
          let status: "ACTIVE" | "CANCELLED" | "PAST_DUE" | "INACTIVE" =
            "INACTIVE";

          if (subscription.status === "active") status = "ACTIVE";
          else if (subscription.status === "canceled") status = "CANCELLED";
          else if (subscription.status === "past_due") status = "PAST_DUE";

          await db.subscription.update({
            where: { id: dbSubscription.id },
            data: {
              status,
              stripeCurrentPeriodEnd: new Date(
                ((subscription as unknown as { current_period_end?: number })
                  .current_period_end ||
                  Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60) * 1000
              ),
            },
          });

          await invalidateUserSubscriptionCache(dbSubscription.user.clerkId);
        }
        break;

      case "customer.subscription.deleted":
        // Handle subscription cancellation
        const canceledSubscription = await db.subscription.findUnique({
          where: { stripeSubscriptionId: subscription.id },
          include: { user: true },
        });

        if (canceledSubscription) {
          await db.subscription.update({
            where: { id: canceledSubscription.id },
            data: {
              status: "CANCELLED",
              plan: "FREE",
            },
          });

          await invalidateUserSubscriptionCache(
            canceledSubscription.user.clerkId
          );
        }
        break;

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
