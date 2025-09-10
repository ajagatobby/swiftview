"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, Pause, Play, Volume2, VolumeX } from "lucide-react";

interface VideoControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onMute: () => void;
  onFullscreen: () => void;
  progress: number;
  onProgressChange: (progress: number) => void;
  isMuted: boolean;
}

const VideoControls = ({
  isPlaying,
  onPlayPause,
  onMute,
  onFullscreen,
  progress,
  onProgressChange,
  isMuted,
}: VideoControlsProps) => {
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    onProgressChange(newProgress);
  };

  return (
    <motion.div
      className="absolute bottom-4 left-2 right-2 bg-black/60 backdrop-blur-sm p-3 rounded-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Horizontal Controls Row */}
      <div className="flex items-center gap-4">
        {/* Left Controls */}
        <div className="flex items-center gap-3">
          {/* Play/Pause Button */}
          <button
            onClick={onPlayPause}
            className="text-white transition-colors duration-200 hover:text-white/95"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isPlaying ? "pause" : "play"}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.1 }}
              >
                {isPlaying ? (
                  <Pause
                    fill="white"
                    size={20}
                    className="text-white cursor-pointer"
                  />
                ) : (
                  <Play
                    fill="white"
                    size={20}
                    className="text-white cursor-pointer"
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </button>

          {/* Mute Button */}
          <button
            onClick={onMute}
            className="text-white transition-colors duration-200 hover:text-white/95 cursor-pointer"
          >
            {isMuted ? (
              <VolumeX fill="white" size={20} className="text-white" />
            ) : (
              <Volume2 fill="white" size={20} className="text-white" />
            )}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex-1">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #ffffff 0%, #ffffff ${progress}%, #FFFFFF70 ${progress}%, #FFFFFF70 100%)`,
            }}
          />
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Fullscreen Button */}
          <button
            onClick={onFullscreen}
            className="text-white transition-colors duration-200 hover:text-white/95 cursor-pointer"
          >
            <Maximize2 fill="white" size={20} className="text-white" />
          </button>
        </div>
      </div>

      {/* Custom Slider Styles */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </motion.div>
  );
};

export default VideoControls;
