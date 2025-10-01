import Stripe from "stripe";

let stripeInstance: Stripe | null = null;

export const getStripe = (): Stripe => {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }

    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-09-30.clover",
      typescript: true,
    });
  }

  return stripeInstance;
};

// Export a getter function instead of the instance directly
export const stripe = {
  get: getStripe,
};

export const STRIPE_PRO_PRICE_ID = process.env.STRIPE_PRO_PRICE_ID || "";
