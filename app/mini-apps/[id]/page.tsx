import React from "react";
import { notFound } from "next/navigation";
import MiniAppDetailClient from "./mini-app-detail-client";
import { welcomeScreenShots } from "~/Utilities/Mock";
import { getCurrentUserSubscription } from "~/lib/utils";

interface MiniAppDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Define screenshots for each mini-app (can be images or videos)
type Screenshot = {
  url: string;
  type: "image" | "video";
};

const screenshotsMap: Record<number, Screenshot[]> = {
  0: [
    { url: "/videos/welcome-screen-4.mp4", type: "video" },
    { url: "/logos/logo.png", type: "image" },
    { url: "/videos/welcome-screen-3.mp4", type: "video" },
    { url: "/site-banner.png", type: "image" },
    { url: "/videos/welcome-screen-2.mp4", type: "video" },
  ],
  1: [
    { url: "/videos/welcome-screen-1.mp4", type: "video" },
    { url: "/logos/hola.png", type: "image" },
    { url: "/videos/signin-screen-1.mp4", type: "video" },
    { url: "/videos/signin-screen-2.mp4", type: "video" },
  ],
  2: [
    { url: "/videos/welcome-screen-2.mp4", type: "video" },
    { url: "/logos/pal.png", type: "image" },
    { url: "/videos/signin-screen-3.mp4", type: "video" },
    { url: "/videos/signin-screen-4.mp4", type: "video" },
  ],
  3: [
    { url: "/videos/welcome-screen-3.mp4", type: "video" },
    { url: "/logos/airbnb.png", type: "image" },
    { url: "/videos/onboarding-screen-1.mp4", type: "video" },
    { url: "/videos/compressed/math-app.mp4", type: "video" },
  ],
};

const MiniAppDetailPage = async ({ params }: MiniAppDetailPageProps) => {
  const { id } = await params;

  try {
    // Find the mini-app by ID (using array index)
    const appIndex = parseInt(id, 10);

    if (
      isNaN(appIndex) ||
      appIndex < 0 ||
      appIndex >= welcomeScreenShots.length
    ) {
      notFound();
    }

    const miniApp = welcomeScreenShots[appIndex];

    if (!miniApp) {
      notFound();
    }

    // Check user subscription status
    const { isPro } = await getCurrentUserSubscription();

    // Get screenshots for this mini-app
    const screenshots = screenshotsMap[appIndex] || [
      { url: miniApp.videoUrl, type: "video" as const },
    ];

    const miniAppData = {
      id: id,
      title: miniApp.title,
      videoUrl: miniApp.videoUrl,
      appName: miniApp.appName,
      isPro: miniApp.isPro || false,
      userIsPro: isPro,
      githubLink: miniApp.link,
      screenshots: screenshots,
    };

    return <MiniAppDetailClient miniAppData={miniAppData} />;
  } catch (error) {
    console.error("Error loading mini-app:", error);
    notFound();
  }
};

export default MiniAppDetailPage;
