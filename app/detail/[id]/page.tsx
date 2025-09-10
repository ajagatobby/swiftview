import React from "react";
import { getProjectById } from "~/lib/actions";
import { notFound } from "next/navigation";
import DetailPageClient from "~/app/detail/[id]/detail-page-client";

interface DetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const DetailPage = async ({ params }: DetailPageProps) => {
  const { id } = await params;

  try {
    // Fetch project data from the database
    const project = await getProjectById(id);

    if (!project) {
      notFound();
    }

    // Process all codebases
    let codeContent = "";

    if (project.codebases.length > 0) {
      // Combine all codebases into a single markdown content
      codeContent = project.codebases
        .map((codebase) => {
          const rawCode = codebase.code;
          if (!rawCode) return "";

          // If the code already has markdown syntax, use it as is
          if (rawCode.includes("```")) {
            return rawCode;
          } else {
            // If it's plain code, wrap it in markdown syntax with filename
            const language = codebase.name.endsWith(".swift")
              ? "swift"
              : "text";
            return `\`\`\`${language}\n// ${codebase.name}\n${rawCode}\n\`\`\``;
          }
        })
        .filter(Boolean)
        .join("\n\n");
    } else {
      // Default fallback code if no codebases exist
      codeContent = `\`\`\`swift
// ${project.title}
// ${project.description || "No description available"}

import SwiftUI

struct ${project.title.replace(/\s+/g, "")}View: View {
    var body: some View {
        Text("${project.title}")
            .font(.title)
            .padding()
    }
}
\`\`\``;
    }

    const videoData = {
      id: project.id,
      title: project.title,
      videoUrl: project.videoUrl || "/videos/onboarding-screen-1.mp4",
      description: project.description || "A SwiftUI screen implementation",
      markdownContent: codeContent,
    };

    return <DetailPageClient videoData={videoData} />;
  } catch (error) {
    console.error("Error loading project:", error);
    notFound();
  }
};

export default DetailPage;
