import { db } from "./db";
import { getCachedUserSubscription, cacheUserSubscription } from "./redis";

export async function getUserSubscription(userId: string) {
  // Try to get from cache first
  const cached = await getCachedUserSubscription(userId);
  if (cached) {
    return cached;
  }

  // If not in cache, fetch from database
  const user = await db.user.findUnique({
    where: { clerkId: userId },
    include: { subscription: true },
  });

  if (!user) {
    return null;
  }

  const subscriptionData = {
    ...user.subscription,
    isPro:
      user.subscription?.plan === "PRO" &&
      user.subscription?.status === "ACTIVE" &&
      (user.subscription?.paymentType === "ONE_TIME" ||
        (user.subscription?.paymentType === "SUBSCRIPTION" &&
          user.subscription?.stripeCurrentPeriodEnd &&
          new Date(user.subscription.stripeCurrentPeriodEnd) > new Date())),
  };

  // Cache the result
  await cacheUserSubscription(userId, subscriptionData);

  return subscriptionData;
}

export async function checkUserAccess(
  userId: string,
  requiredPlan: "FREE" | "PRO" = "PRO"
) {
  const subscription = await getUserSubscription(userId);

  if (!subscription) {
    return false;
  }

  if (requiredPlan === "FREE") {
    return true;
  }

  return subscription.isPro;
}
