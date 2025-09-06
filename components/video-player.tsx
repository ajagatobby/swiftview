"use client";
import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { motion, AnimatePresence } from "framer-motion";
import { useVideoStore } from "../store/video-store";
import VideoControls from "./video-controls";
import { Play } from "lucide-react";

const VideoPlayer = ({ url, videoId, autoPlay }: VideoPlayerProps) => {
  const { isPlaying, playVideo, pauseVideo } = useVideoStore();
  const playing = isPlaying(videoId);
  const playerRef = useRef<ReactPlayer>(null);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [currentSpeed] = useState(1);

  useEffect(() => {
    if (autoPlay) {
      playVideo(videoId);
    }
  }, [autoPlay, videoId, playVideo]);

  const handleTogglePlay = () => {
    if (playing) {
      pauseVideo(videoId);
    } else {
      playVideo(videoId);
    }
  };

  const handleProgress = (state: { played: number; loaded: number }) => {
    setProgress(state.played * 100);
  };

  const handleDuration = () => {};

  const handleSeek = (newProgress: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(newProgress / 100);
    }
    setProgress(newProgress);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (playerRef.current) {
      const wrapper = playerRef.current.getInternalPlayer()?.parentElement;
      if (wrapper && wrapper.requestFullscreen) {
        wrapper.requestFullscreen();
      }
    }
  };

  return (
    <div className="relative w-full h-full group">
      <div
        className="relative w-full h-full cursor-pointer"
        onClick={handleTogglePlay}
      >
        <ReactPlayer
          ref={playerRef}
          url={url}
          width="100%"
          height="100%"
          playing={playing}
          autoPlay={false}
          loop
          muted={isMuted}
          playbackRate={currentSpeed}
          onProgress={handleProgress}
          onDuration={handleDuration}
          className="rounded-xl"
        />
      </div>

      <AnimatePresence mode="wait">
        {!playing && (
          <motion.div
            className="absolute bottom-4 left-0 right-0 flex items-center justify-center cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => {
              e.stopPropagation();
              handleTogglePlay();
            }}
          >
            <motion.div
              className="flex items-center justify-center w-14 h-14 bg-black/60 backdrop-blur-sm rounded-full shadow-lg hover:bg-black/80 hover:shadow-xl z-50"
              whileHover={{
                scale: 1.1,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
            >
              <Play fill="white" strokeWidth={2} stroke="white" size={24} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {playing && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <VideoControls
              isPlaying={playing}
              onPlayPause={handleTogglePlay}
              onMute={handleMute}
              onFullscreen={handleFullscreen}
              progress={progress}
              onProgressChange={handleSeek}
              isMuted={isMuted}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoPlayer;
