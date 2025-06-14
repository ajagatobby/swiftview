"use client";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "../icons";
import VideoPlayer from "../video-player";
import { useState } from "react";

interface CardProps {
  title: string;
  image: string;
  link: string;
  appName: string;
  videoUrl: string;
}

const Card = ({ title, image, link, appName, videoUrl }: CardProps) => {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="w-full bg-[#FAFAFA] rounded-2xl px-2 py-3 border border-gray-500/10 hover:shadow-lg hover:shadow-black/5 transition-all duration-300">
      <div className="flex items-center justify-end gap-2 w-full pb-2">
        <Image
          src={`/logos/${image}`}
          width={20}
          height={20}
          className="rounded-sm"
          alt={appName}
        />
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
