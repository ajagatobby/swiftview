"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VideoPlayer from "../../../components/video-player";
import { generateVideoId } from "../../../store/video-store";
import CodeBlocks from "~/components/code-block";
import AnimatedTabs from "../../../components/animated-tabs";
import Link from "next/link";

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

  const copyCode = async () => {
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
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <Link href="/screens">
          <button className="px-4 py-1 text-sm bg-white hover:bg-gray-50 text-gray-700 rounded-lg transition-colors duration-200 flex items-center border border-gray-200 cursor-pointer">
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

        <div className="mb-12 mt-8 flex justify-between items-start">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
              {videoData.title}
            </h1>
            <p className="text-md text-gray-600 leading-relaxed -mt-4">
              {videoData.description}
            </p>
          </div>
          <motion.button
            onClick={copyCode}
            layout
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="ml-6 px-4 py-2 bg-white text-gray-700 rounded-lg transition-all duration-200 flex items-center space-x-2 border border-gray-200 group cursor-pointer"
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
              className="text-sm font-medium"
            >
              {isCopied ? "Copied!" : "Copy Code"}
            </motion.span>
          </motion.button>
        </div>

        <AnimatedTabs
          tabs={[
            {
              id: "preview",
              label: "Preview",
              content: (
                <div className="my-8">
                  <div className="bg-white h-[600px] lg:max-w-screen-md mx-auto rounded-2xl shadow-sm overflow-hidden">
                    <div className="w-full h-full max-w-sm mx-auto">
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
                <div className="my-8">
                  <CodeBlocks content={videoData.markdownContent} />
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
