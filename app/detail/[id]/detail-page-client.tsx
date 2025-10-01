"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser, SignedIn, SignedOut } from "@clerk/nextjs";
import VideoPlayer from "../../../components/video-player";
import { generateVideoId } from "../../../store/video-store";
import CodeBlocks from "~/components/code-block";
import AnimatedTabs from "../../../components/animated-tabs";
import Link from "next/link";
import posthog from "posthog-js";

interface VideoData {
  id: string;
  title: string;
  videoUrl: string;
  description: string;
  markdownContent: string;
}

interface DetailPageClientProps {
  videoData: VideoData;
}

const DetailPageClient = ({ videoData }: DetailPageClientProps) => {
  const videoId = generateVideoId(0, videoData.videoUrl);
  const [isCopied, setIsCopied] = useState(false);
  const { isSignedIn } = useUser();

  const copyCode = async () => {
    if (!isSignedIn) {
      return;
    }
    try {
      const codeContent = videoData.markdownContent
        .replace(/```swift\n/, "")
        .replace(/```$/, "");
      await navigator.clipboard.writeText(codeContent);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        {/* Header */}
        <Link href="/">
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
            Back
          </button>
        </Link>

        <div className="mb-8 sm:mb-12 mt-6 sm:mt-8">
          {/* Mobile: Stack vertically, Desktop: Side by side */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-6">
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 tracking-tight">
                {videoData.title}
              </h1>
              <p className="text-sm sm:text-md text-gray-600 leading-relaxed">
                {videoData.description}
              </p>
            </div>
            <SignedIn>
              <motion.button
                onClick={copyCode}
                layout
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="self-start sm:ml-6 px-3 py-2 sm:px-4 bg-white text-gray-700 rounded-lg transition-all duration-200 flex items-center space-x-2 border border-gray-200 group cursor-pointer"
              >
                <AnimatePresence mode="wait">
                  {isCopied ? (
                    <motion.svg
                      key="check"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </motion.svg>
                  ) : (
                    <motion.svg
                      key="copy"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </motion.svg>
                  )}
                </AnimatePresence>
                <motion.span
                  key={isCopied ? "copied" : "copy"}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs sm:text-sm font-medium"
                >
                  {isCopied ? "Copied!" : "Copy Code"}
                </motion.span>
              </motion.button>
            </SignedIn>
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
                        url={videoData.videoUrl}
                        videoId={videoId}
                        autoPlay={false}
                      />
                    </div>
                  </div>
                </div>
              ),
            },
            {
              id: "code",
              label: "Code",
              content: (
                <div className="my-4 sm:my-8">
                  <SignedIn>
                    <CodeBlocks content={videoData.markdownContent} />
                  </SignedIn>
                  <SignedOut>
                    <div className="bg-white rounded-lg border-2 border-gray-200 p-8 sm:p-12 text-center">
                      <div className="max-w-md mx-auto">
                        <div className="mb-6">
                          <svg
                            className="w-16 h-16 mx-auto text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                          Sign in to view code
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 mb-6">
                          Create a free account to access the full source code
                          for this SwiftUI screen.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <Link
                            href="/sign-up"
                            onClick={() => {
                              posthog.capture("signup_clicked", {
                                location: "code_view_prompt",
                                screen_id: videoData.id,
                                screen_title: videoData.title,
                              });
                            }}
                            className="px-6 py-3 text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors duration-200"
                          >
                            Sign Up Free
                          </Link>
                          <Link
                            href="/sign-in"
                            onClick={() => {
                              posthog.capture("login_clicked", {
                                location: "code_view_prompt",
                                screen_id: videoData.id,
                                screen_title: videoData.title,
                              });
                            }}
                            className="px-6 py-3 text-sm font-medium text-stone-900 bg-white hover:bg-gray-50 rounded-lg border border-gray-300 transition-colors duration-200"
                          >
                            Sign In
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SignedOut>
                </div>
              ),
            },
          ]}
          defaultTab="preview"
        />
      </div>
    </div>
  );
};

export default DetailPageClient;
