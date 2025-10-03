import { ProjectWithCodebases } from "./actions";
import { getUserSubscription } from "./subscription";
import { currentUser } from "@clerk/nextjs/server";

export function convertProjectToScreenShot(project: ProjectWithCodebases) {
  return {
    title: project.title,
    image: "",
    link: `/detail/${project.id}`,
    appName: project.title,
    videoUrl: project.videoUrl || "",
    isPro: project.isProOnly,
  };
}

export function convertProjectsToScreenShots(projects: ProjectWithCodebases[]) {
  return projects.map(convertProjectToScreenShot);
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatSectionName(sectionKey: string): string {
  return capitalizeFirst(sectionKey) + " screens";
}

export function filterContentBySubscription<T extends { isPro: boolean }>(
  content: T[],
  isPro: boolean
): T[] {
  return content;
}

export async function getCurrentUserSubscription() {
  try {
    const user = await currentUser();
    if (!user) {
      return { isPro: false };
    }

    const subscription = await getUserSubscription(user.id);
    return {
      isPro: subscription?.isPro || false,
    };
  } catch (error) {
    console.error("Error getting user subscription:", error);
    return { isPro: false };
  }
}
