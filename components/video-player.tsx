"use client";
import React from "react";
import ReactPlayer from "react-player";
import { Pause, Play } from "./icons";
import { motion, AnimatePresence } from "framer-motion";

const VideoPlayer = ({
  url,
  playing,
  setPlaying,
  autoPlay,
}: VideoPlayerProps) => {
  return (
    <div className="relative w-full h-full">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        playing={playing}
        autoPlay={autoPlay}
        loop
        muted
        className="rounded-xl"
      />
      <button
        onClick={() => setPlaying(!playing)}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-all duration-300 z-10"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={playing ? "pause" : "play"}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
          >
            {playing ? (
              <Pause size={20} className="text-white" />
            ) : (
              <Play size={20} className="text-white" />
            )}
          </motion.div>
        </AnimatePresence>
      </button>
    </div>
  );
};

export default VideoPlayer;
