"use client";
import { useRouter } from "next/navigation";
import VideoPlayer from "../video-player";
import { generateVideoId } from "../../store/video-store";
import { cn } from "~/Utilities";

interface CardProps {
  index: number;
  title: string;
  videoUrl: string;
  link: string;
  largeCard?: boolean;
  isPro?: boolean;
}

const Card = ({
  title,
  videoUrl,
  link,
  index,
  largeCard = false,
  isPro = false,
}: CardProps) => {
  const videoId = generateVideoId(index, videoUrl);
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent) => {
    // Only navigate if the click is not on the video player or its controls
    const target = e.target as HTMLElement;
    const isVideoPlayer =
      target.closest("[data-video-player]") || target.closest(".react-player");

    if (!isVideoPlayer) {
      router.push(link);
    }
  };

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
      <div className="flex items-center justify-between p-1">
        <p className="text-[16px] text-black/70 truncate group-hover:text-black/90 transition-all duration-200 font-normal">
          {title}
        </p>
      </div>
    </div>
  );
};

export default Card;
