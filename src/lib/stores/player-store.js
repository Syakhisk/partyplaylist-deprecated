import { doc, updateDoc } from "firebase/firestore";
import { create } from "zustand";
import { COLLECTION_NAME, db } from "../firebase";
import useSessionStore from "./session-store";

export const PLAY_STATE_MAP = {
  unstarted: "-1",
  ended: 0,
  playing: 1,
  paused: 2,
  buffering: 3,
  "video cued": 4,
};

const usePlayerStore = create((set, get) => ({
  player: null,
  currentTime: 0,
  duration: 0,
  progress: 0,
  isPlaying: false,
  isMuted: true,
  action: {
    // TODO: need to check if host
    play: () => {
      const { isHost } = useSessionStore.getState();
      if (isHost) {
        window.alert("play host");
      } else {
        window.alert("play client");
      }

      updatePlayingStateOnFirestore("playing");

      // get().player?.playVideo();
    },
    pause: () => {
      const { isHost } = useSessionStore.getState();
      if (isHost) {
        window.alert("pause host");
      } else {
        window.alert("pause client");
      }

      updatePlayingStateOnFirestore("paused");

      // get().player?.pauseVideo();
      // updatePlayingStateOnFirestore("paused");
    },
    stop: () => {
      // get().player?.stopVideo();
      // updatePlayingStateOnFirestore("ended");
    },
    next: () => {
      const { queue, getCurrentSongIndex } = useSessionStore.getState();
      let newIndex = getCurrentSongIndex() + 1;
      if (newIndex >= queue.length) newIndex = 0;

      updateFirestoreData({
        current_song_id: queue[newIndex]?.id ?? null,
        current_song_status: "playing",
      });
    },
    prev: () => {
      const { queue, getCurrentSongIndex } = useSessionStore.getState();
      let newIndex = getCurrentSongIndex() + 1;
      if (newIndex < 0) newIndex = queue.length - 1;

      updateFirestoreData({
        current_song_id: queue[newIndex]?.id ?? null,
        current_song_status: "playing",
      });
    },
    toggleMute: () => {
      const { player, isMuted } = get();

      if (isMuted) player.unMute();
      else player.mute();

      set(() => ({ isMuted: !isMuted }));
    },
  },
  handleStateChange: async (event) => {
    const { player } = get();
    const { queue, getCurrentSongIndex, isHost } = useSessionStore.getState();
    // if (isHost && event.data == PLAY_STATE_MAP.playing) {
    //   player.playVideo();
    // }

    // const data = {
    //   isPlaying: event.data == 1,
    // };
    // // TODO: pause local player if firebase is paused, workaround before host
    // if (!data.isPlaying && player) {
    //   player.pauseVideo();
    // }
    // if (event.data == PLAY_STATE_MAP.ended) {
    //   let newIndex = getCurrentSongIndex() + 1;
    //   if (newIndex >= queue.length) newIndex = 0;
    //   updateFirestoreData({
    //     current_song_status: "ended",
    //     current_song_id: queue[newIndex]?.id ?? null,
    //   });
    // }

    set(() => ({
      isPlaying: event.data == 1,
    }));
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
  setPlayer: (player) => {
    // // TODO: workaround bcs player is still not ready
    // // TODO: determine is host
    // const { isMuted } = get();
    // setTimeout(() => {
    //   player.playVideo();
    //   player.playVideo();
    //   if (isMuted) player.mute();
    //   else player.unMute();
    // }, 1000);
    // window.ply = player;
    return set(() => ({ player }));
  },
}));

function updatePlayingStateOnFirestore(state) {
  const { session } = useSessionStore.getState();

  updateDoc(doc(db, COLLECTION_NAME, session.id), {
    current_song_status: state,
  });
}

async function updateFirestoreData(data) {
  const { session } = useSessionStore.getState();

  await updateDoc(doc(db, COLLECTION_NAME, session.id), {
    ...data,
  });
}

export default usePlayerStore;
