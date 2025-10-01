"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import VideoPlayer from "~/components/video-player";
import { generateVideoId } from "~/store/video-store";
import AnimatedTabs from "~/components/animated-tabs";
import Link from "next/link";
import Image from "next/image";
import Lightbox from "~/components/lightbox";
import SubscriptionModal from "~/components/subscription-modal";

type Screenshot = {
  url: string;
  type: "image" | "video";
};

interface MiniAppData {
  id: string;
  title: string;
  videoUrl: string;
  appName: string;
  isPro: boolean;
  githubLink: string;
  screenshots?: Screenshot[];
}

interface MiniAppDetailClientProps {
  miniAppData: MiniAppData;
}

const MiniAppDetailClient = ({ miniAppData }: MiniAppDetailClientProps) => {
  const videoId = generateVideoId(0, miniAppData.videoUrl);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);

  const screenshots = miniAppData.screenshots || [
    { url: miniAppData.videoUrl, type: "video" as const },
  ];

  const handleGithubClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (miniAppData.isPro) {
      e.preventDefault();
      setIsSubscriptionModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        {/* Header */}
        <Link href="/mini-apps">
          <button className="px-4 py-2 sm:px-4 sm:py-1 text-sm bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-700 rounded-lg transition-colors duration-200 flex items-center border border-gray-200 cursor-pointer touch-manipulation select-none min-h-[44px] sm:min-h-0">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Mini Apps
          </button>
        </Link>

        <div className="mb-8 sm:mb-12 mt-6 sm:mt-8">
          <div className="flex flex-col gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                  {miniAppData.title}
                </h1>
                {miniAppData.isPro && (
                  <span className="px-2 py-1 text-xs font-semibold text-white bg-gradient-to-r from-amber-400 to-orange-500 rounded-md">
                    PRO
                  </span>
                )}
              </div>
              <p className="text-sm sm:text-md text-gray-600 leading-relaxed mb-3">
                A beautiful mini-app template for {miniAppData.appName}
              </p>
              {miniAppData.githubLink && (
                <div className="flex items-center gap-2">
                  <a
                    href={miniAppData.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleGithubClick}
                    className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    View on GitHub
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <AnimatedTabs
          tabs={[
            {
              id: "preview",
              label: "Preview",
              content: (
                <div className="my-4 sm:my-8">
                  <div className="bg-white h-[500px] sm:h-[600px] lg:h-[700px] max-w-md sm:max-w-lg lg:max-w-4xl mx-auto rounded-xl sm:rounded-2xl shadow-sm overflow-hidden">
                    <div className="w-full h-full">
                      <VideoPlayer
                        url={miniAppData.videoUrl}
                        videoId={videoId}
                        autoPlay={false}
                      />
                    </div>
                  </div>
                </div>
              ),
            },
            {
              id: "screenshots",
              label: "Screenshots",
              content: (
                <div className="my-4 sm:my-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {screenshots.map((screenshot, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="relative w-full h-[600px]">
                          {screenshot.type === "video" ? (
                            <VideoPlayer
                              url={screenshot.url}
                              videoId={`${videoId}-screenshot-${index}`}
                              autoPlay={false}
                            />
                          ) : (
                            <div
                              className="relative w-full h-full bg-gray-50 flex items-center justify-center cursor-pointer group"
                              onClick={() => setLightboxImage(screenshot.url)}
                            >
                              <Image
                                src={screenshot.url}
                                alt={`Screenshot ${index + 1}`}
                                fill
                                className="object-contain p-4 group-hover:scale-105 transition-transform duration-200"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center">
                                <svg
                                  className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                  />
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="p-3 flex items-center justify-between">
                          <p className="text-sm text-gray-600 font-medium">
                            View {index + 1}
                          </p>
                          <span className="text-xs text-gray-400 uppercase tracking-wide">
                            {screenshot.type}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  {screenshots.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-500">No screenshots available</p>
                    </div>
                  )}
                </div>
              ),
            },
          ]}
          defaultTab="preview"
        />
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        imageUrl={lightboxImage}
        onClose={() => setLightboxImage(null)}
        alt={`${miniAppData.title} - Full size preview`}
      />

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
      />
    </div>
  );
};

export default MiniAppDetailClient;
