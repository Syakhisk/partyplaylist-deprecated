import { create } from "zustand";

// -1 – unstarted
// 0 – ended
// 1 – playing
// 2 – paused
// 3 – buffering
// 5 – video cued

const usePlayerStore = create((set, get) => ({
  player: null,
  currentTime: 0,
  duration: 0,
  progress: 0,
  isPlaying: false,
  action: {
    play: () => get().player?.playVideo(),
    pause: () => get().player?.pauseVideo(),
    stop: () => get().player?.stopVideo(),
  },
  handleStateChange: (event) => {
    set(() => {
      return { isPlaying: event.data == 1 };
    });
  },
  update: () => {
    set((state) => {
      const { player } = state;
      if (!player) return {};
      return {
        currentTime: player.getCurrentTime(),
        progress: (player.getCurrentTime() / player.getDuration()).toFixed(2),
      };
    });
  },
  // getPlayer: () => get().player,
  setPlayer: (player) => set(() => ({ player })),
}));

export default usePlayerStore;
