/**
 * Subscription and Plan Constants
 * Following workspace rule: Use enums/const objects for repeated values
 */

export const PLAN = {
  FREE: "FREE",
  PRO: "PRO",
} as const;

export const SUBSCRIPTION_STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  CANCELLED: "CANCELLED",
  PAST_DUE: "PAST_DUE",
  TRIALING: "TRIALING",
} as const;

export type Plan = (typeof PLAN)[keyof typeof PLAN];
export type SubscriptionStatus =
  (typeof SUBSCRIPTION_STATUS)[keyof typeof SUBSCRIPTION_STATUS];

/**
 * Cache TTL in seconds
 */
export const CACHE_TTL = {
  SUBSCRIPTION: 3600, // 1 hour
  USER: 1800, // 30 minutes
} as const;
