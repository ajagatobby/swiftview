"use client";
import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import VideoPlayer from "../video-player";
import { generateVideoId } from "../../store/video-store";
import { cn } from "~/Utilities";
import ArrowRightIcon from "../icons/arrow-right";

interface CardProps {
  index: number;
  title: string;
  videoUrl: string;
  link: string;
  largeCard?: boolean;
  isPro?: boolean;
  userIsPro?: boolean;
}

const Card = React.memo<CardProps>(
  ({ title, videoUrl, link, index, largeCard = false, isPro = false }) => {
    const videoId = useMemo(
      () => generateVideoId(index, videoUrl),
      [index, videoUrl]
    );
    const router = useRouter();

    const handleCardClick = useCallback(
      (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        const isVideoPlayer =
          target.closest("[data-video-player]") ||
          target.closest(".react-player");

        if (!isVideoPlayer) {
          router.push(link);
        }
      },
      [router, link]
    );

    const handleViewClick = useCallback(() => {
      router.push(link);
    }, [router, link]);

    return (
      <div
        onClick={handleCardClick}
        className="w-full overflow-hidden bg-[#FAFAFA] rounded-2xl px-2 py-3 border border-gray-500/10 hover:shadow-lg hover:shadow-black/5 transition-all duration-300 group cursor-pointer"
      >
        <div className="py-1">
          <div
            className={cn(
              "w-full bg-white rounded-xl",
              largeCard ? "h-[620px]" : "h-[500px]"
            )}
          >
            <div className="relative w-full h-full group">
              <div
                className="absolute top-0 left-0 w-full h-full rounded-xl"
                data-video-player
              >
                <VideoPlayer
                  url={videoUrl}
                  videoId={videoId}
                  autoPlay={index === 0}
                />
              </div>
              {isPro && (
                <div className="absolute top-3 right-3 z-10">
                  <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg border border-white/20">
                    PRO
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between p-1 gap-2">
          <p className="text-[16px] text-black/70 truncate group-hover:text-black/90 transition-all duration-200 font-normal flex-1">
            {title}
          </p>
          <button
            onClick={handleViewClick}
            className="flex items-center gap-1 px-3 py-1.5 bg-black/5 hover:bg-black/10 text-black/60 hover:text-black/80 rounded-lg transition-all duration-200 text-sm font-medium group-hover:bg-black/10 cursor-pointer"
            aria-label={`View ${title} details`}
          >
            View
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
