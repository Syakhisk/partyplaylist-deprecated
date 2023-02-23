import { create } from "zustand";

const useSessionStore = create<SessionStore>((set) => ({

}));

export default useSessionStore;

export interface SessionStore {
  session: {
    name: string;
    host: string;
    current_song: {
      id: string;
      song_status: YTPlaybackStatus;
    };
  };
}

export enum YTPlaybackStatus {}
// Unstarted = -1,
// Ended,
// Playing,
// Paused,
// Buffering,
// VideoCued = 5,
