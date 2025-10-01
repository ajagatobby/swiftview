import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { stripe, STRIPE_PRO_PRICE_ID } from "~/lib/stripe";
import { db } from "~/lib/db";

export async function GET() {
  return NextResponse.json({ message: "Hello, world!" });
}

export async function POST() {
  try {
    const user = await currentUser();

    if (!user || !user.emailAddresses?.[0]?.emailAddress) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get or create user in database
    let dbUser = await db.user.findUnique({
      where: { clerkId: user.id },
      include: { subscription: true },
    });

    if (!dbUser) {
      dbUser = await db.user.create({
        data: {
          clerkId: user.id,
          email: user.emailAddresses[0].emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
          subscription: {
            create: {
              plan: "FREE",
              status: "INACTIVE",
            },
          },
        },
        include: { subscription: true },
      });
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const returnUrl = baseUrl.startsWith("http")
      ? baseUrl
      : `https://${baseUrl}`;

    // If user already has an active subscription, redirect to billing portal
    if (dbUser.subscription?.stripeCustomerId) {
      const session = await stripe.get().billingPortal.sessions.create({
        customer: dbUser.subscription.stripeCustomerId,
        return_url: `${returnUrl}/`,
      });

      return NextResponse.json({ url: session.url });
    }

    // Create Stripe checkout session
    const session = await stripe.get().checkout.sessions.create({
      customer_email: dbUser.email,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: STRIPE_PRO_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${returnUrl}/?success=true`,
      cancel_url: `${returnUrl}/?canceled=true`,
      metadata: {
        userId: dbUser.id,
        clerkId: user.id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
