"use client";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "../icons";
import VideoPlayer from "../video-player";
import { useEffect, useState } from "react";

interface CardProps {
  index: number;
  title: string;
  image: string;
  link: string;
  appName: string;
  videoUrl: string;
}

const Card = ({ title, image, link, appName, videoUrl, index }: CardProps) => {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (index === 0) {
      setPlaying(true);
    }
  }, [index]);

  return (
    <div className="w-full bg-[#FAFAFA] rounded-2xl px-2 py-3 border border-gray-500/10 hover:shadow-lg hover:shadow-black/5 transition-all duration-300">
      <div className="flex items-center justify-end gap-2 w-full pb-2">
        {image === "logo" ? (
          <div className="w-6 h-6 bg-stone-900 border border-stone-900 rounded-sm flex items-center justify-center">
            <Image src="/swift.png" alt="logo" width={24} height={24} />
          </div>
        ) : (
          <Image
            src={`/logos/${image}`}
            width={20}
            height={20}
            className="rounded-sm"
            alt={appName}
          />
        )}
        <p className="text-sm text-black/80">{appName}</p>
      </div>
      <div className="py-1">
        <div className="w-full bg-white rounded-xl h-[500px]">
          <div className="relative w-full h-full group">
            <div className="absolute top-0 left-0 w-full h-full rounded-xl">
              <VideoPlayer
                url={videoUrl}
                playing={playing}
                setPlaying={setPlaying}
                autoPlay={index === 0}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 pt-2 justify-between w-full">
          <p className="text-[14px] text-black/70 truncate">{title}</p>

          {/* Github icon */}
          <Link href={link} target="_blank">
            <ExternalLink
              size={14}
              color="#00000080"
              className="text-black/90 hover:text-black cursor-pointor transition-all duration-300"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
