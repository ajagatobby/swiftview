import { Redis } from "@upstash/redis";

if (
  !process.env.UPSTASH_REDIS_REST_URL ||
  !process.env.UPSTASH_REDIS_REST_TOKEN
) {
  throw new Error("Upstash Redis environment variables are not set");
}

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Cache user subscription data
export async function cacheUserSubscription(
  userId: string,
  data: Record<string, unknown>
) {
  await redis.setex(`user:${userId}:subscription`, 3600, JSON.stringify(data)); // Cache for 1 hour
}

export async function getCachedUserSubscription(userId: string) {
  const cached = await redis.get(`user:${userId}:subscription`);
  return cached ? JSON.parse(cached as string) : null;
}

export async function invalidateUserSubscriptionCache(userId: string) {
  await redis.del(`user:${userId}:subscription`);
}
