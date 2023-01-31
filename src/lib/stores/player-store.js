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
  action: {
    // TODO: need to check if host
    play: () => {
      get().player?.playVideo();
      updatePlayingStateOnFirestore("playing");
    },
    pause: () => {
      get().player?.pauseVideo();
      updatePlayingStateOnFirestore("paused");
    },
    stop: () => {
      get().player?.stopVideo();
      updatePlayingStateOnFirestore("ended");
    },
  },
  handleStateChange: async (event) => {
    //TODO: handle when song finished
    const { queue, getCurrentSongIndex } = useSessionStore.getState();

    const data = {
      isPlaying: event.data == 1,
    };

    if (event.data == PLAY_STATE_MAP.ended) {
      let newIndex = getCurrentSongIndex() + 1;
      if (newIndex >= queue.length) newIndex = 0;

      updateFirestoreData({
        current_song_status: "ended",
        current_song_id: queue[newIndex]?.id ?? null,
      });
    }

    set(() => data);
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
    // TODO: workaround bcs player is still not ready
    // TODO: determine is host
    setTimeout(() => {
      player.playVideo();
    }, 1000);
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
