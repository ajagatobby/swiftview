import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface VideoState {
  currentlyPlaying: string | null;

  playVideo: (videoId: string) => void;
  pauseVideo: (videoId: string) => void;
  pauseAllVideos: () => void;
  isPlaying: (videoId: string) => boolean;
  getCurrentlyPlaying: () => string | null;
}

export const useVideoStore = create<VideoState>()(
  subscribeWithSelector((set, get) => ({
    currentlyPlaying: null,

    playVideo: (videoId: string) => {
      const { currentlyPlaying } = get();
      if (currentlyPlaying !== videoId) {
        set({ currentlyPlaying: videoId });
      }
    },

    pauseVideo: (videoId: string) => {
      const { currentlyPlaying } = get();
      if (currentlyPlaying === videoId) {
        set({ currentlyPlaying: null });
      }
    },

    pauseAllVideos: () => {
      const { currentlyPlaying } = get();
      if (currentlyPlaying !== null) {
        set({ currentlyPlaying: null });
      }
    },

    isPlaying: (videoId: string) => {
      const { currentlyPlaying } = get();
      return currentlyPlaying === videoId;
    },

    getCurrentlyPlaying: () => {
      const { currentlyPlaying } = get();
      return currentlyPlaying;
    },
  }))
);

// Utility function to generate consistent video IDs
export const generateVideoId = (index: number, videoUrl: string): string => {
  return `${index}-${videoUrl}`;
};
