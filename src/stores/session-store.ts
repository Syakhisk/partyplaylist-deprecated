import { create } from "zustand";

const useSessionStore = create<SessionStore>((set) => ({
  session: undefined,
  username: null,
  login: (username: string) => set(() => ({ username })),
  // getSessionById: (sessionId) => {},
  // subscribeToSession: ()
}));

export default useSessionStore;

export interface SessionStore {
  session?: {
    name: string;
    host: string;
    current_song: {
      id: string;
      song_status: YTPlaybackStatus;
    };
  };
  login: (username: string) => void;
  username: string;
}

export enum YTPlaybackStatus {}
// Unstarted = -1,
// Ended,
// Playing,
// Paused,
// Buffering,
// VideoCued = 5,
