"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface ProjectWithCodebases {
  id: string;
  title: string;
  description: string | null;
  section: "SCREENS" | "ANIMATION" | "MINI_APPS";
  videoUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  codebases: {
    id: string;
    name: string;
    url: string | null;
    code: string | null;
  }[];
}

export interface GroupedProjects {
  [sectionName: string]: ProjectWithCodebases[];
}

export async function getProjects(): Promise<ProjectWithCodebases[]> {
  try {
    const projects = await prisma.project.findMany({
      include: {
        codebases: {
          select: {
            id: true,
            name: true,
            url: true,
            code: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw new Error("Failed to fetch projects");
  }
}

export async function getProjectsBySection(
  section: "SCREENS" | "ANIMATION" | "MINI_APPS"
): Promise<ProjectWithCodebases[]> {
  try {
    const projects = await prisma.project.findMany({
      where: {
        section: section,
      },
      include: {
        codebases: {
          select: {
            id: true,
            name: true,
            url: true,
            code: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return projects;
  } catch (error) {
    console.error(`Error fetching projects for section ${section}:`, error);
    throw new Error(`Failed to fetch projects for section ${section}`);
  }
}

export async function getGroupedScreenProjects(): Promise<GroupedProjects> {
  try {
    const projects = await getProjectsBySection("SCREENS");

    const grouped: GroupedProjects = {};

    projects.forEach((project) => {
      // Extract the first word from the title
      const firstWord = project.title.split(" ")[0]?.toLowerCase();

      if (firstWord) {
        if (!grouped[firstWord]) {
          grouped[firstWord] = [];
        }
        grouped[firstWord].push(project);
      }
    });

    // Sort each group by creation date
    Object.keys(grouped).forEach((key) => {
      grouped[key].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    });

    return grouped;
  } catch (error) {
    console.error("Error grouping screen projects:", error);
    throw new Error("Failed to group screen projects");
  }
}

export async function getGroupedAnimationProjects(): Promise<GroupedProjects> {
  try {
    const projects = await getProjectsBySection("ANIMATION");

    const grouped: GroupedProjects = {};

    projects.forEach((project) => {
      // Extract the first word from the title
      const firstWord = project.title.split(" ")[0]?.toLowerCase();

      if (firstWord) {
        if (!grouped[firstWord]) {
          grouped[firstWord] = [];
        }
        grouped[firstWord].push(project);
      }
    });

    // Sort each group by creation date
    Object.keys(grouped).forEach((key) => {
      grouped[key].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    });

    return grouped;
  } catch (error) {
    console.error("Error grouping animation projects:", error);
    throw new Error("Failed to group animation projects");
  }
}

export async function getProjectById(
  id: string
): Promise<ProjectWithCodebases | null> {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: id,
      },
      include: {
        codebases: {
          select: {
            id: true,
            name: true,
            url: true,
            code: true,
          },
        },
      },
    });

    return project;
  } catch (error) {
    console.error(`Error fetching project with id ${id}:`, error);
    throw new Error(`Failed to fetch project with id ${id}`);
  }
}

export interface RequestedAppData {
  appName: string;
  description: string;
  email: string;
}

export async function createRequestedApp(data: RequestedAppData) {
  try {
    const requestedApp = await prisma.requestedApp.create({
      data: {
        appName: data.appName,
        description: data.description,
        email: data.email,
      },
    });

    return requestedApp;
  } catch (error) {
    console.error("Error creating requested app:", error);
    throw new Error("Failed to create requested app");
  }
}
