"use client";
import Link from "next/link";
import VideoPlayer from "../video-player";
import { generateVideoId } from "../../store/video-store";
import { cn } from "~/Utilities";

interface CardProps {
  index: number;
  title: string;
  videoUrl: string;
  largeCard?: boolean;
  isPro?: boolean;
}

const Card = ({
  title,
  videoUrl,
  index,
  largeCard = false,
  isPro = false,
}: CardProps) => {
  const videoId = generateVideoId(index, videoUrl);

  return (
    <div className="w-full overflow-hidden bg-[#FAFAFA] rounded-2xl px-2 py-3 border border-gray-500/10 hover:shadow-lg hover:shadow-black/5 transition-all duration-300 group">
      <div className="py-1">
        <div
          className={cn(
            "w-full bg-white rounded-xl",
            largeCard ? "h-[620px]" : "h-[500px]"
          )}
        >
          <div className="relative w-full h-full group">
            <div className="absolute top-0 left-0 w-full h-full rounded-xl">
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
      <div className="flex items-center justify-between p-1">
        <Link href={`/detail/${index}`} className="w-full group">
          <p className="text-[16px] text-black/70 truncate group-hover:text-black/90 transition-all duration-200 font-normal">
            {title}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Card;
