"use server";

import { currentUser } from "@clerk/nextjs/server";
import { getUserSubscription, checkUserAccess } from "./subscription";

export async function getCurrentUserSubscription() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  return getUserSubscription(user.id);
}

export async function checkCurrentUserPro() {
  const user = await currentUser();

  if (!user) {
    return false;
  }

  return checkUserAccess(user.id, "PRO");
}
