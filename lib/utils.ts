import { ProjectWithCodebases } from "./actions";

/**
 * Converts a database project to the format expected by the Section component
 */
export function convertProjectToScreenShot(project: ProjectWithCodebases) {
  return {
    title: project.title,
    image: "", // Not used in current implementation
    link: `/detail/${project.id}`, // Link to detail page
    appName: project.title, // Using title as app name
    videoUrl: project.videoUrl || "", // Fallback to empty string if no video
    isPro: false, // Default to false, can be enhanced later
  };
}

/**
 * Converts an array of database projects to the format expected by the Section component
 */
export function convertProjectsToScreenShots(projects: ProjectWithCodebases[]) {
  return projects.map(convertProjectToScreenShot);
}

/**
 * Capitalizes the first letter of a string
 */
export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Formats section names for display
 */
export function formatSectionName(sectionKey: string): string {
  return capitalizeFirst(sectionKey) + " screens";
}
