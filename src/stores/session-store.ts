import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSessionStore = create(
  persist<SessionStore>(
    () => ({
      session: undefined,
      username: undefined,
      isLogin: false,
    }),
    { name: "session-store" }
  )
);

export const login = (username: string) =>
  useSessionStore.setState({
    username,
    isLogin: true,
  });

export const logout = () =>
  useSessionStore.setState({
    username: undefined,
    isLogin: false,
  });

export default useSessionStore;

export interface SessionStore {
  session?: {
    name: string;
    host: string;
    current_video: {
      id: string;
      status: YTPlaybackStatus;
    };
  };
  username?: string;
  isLogin: boolean;
}

export enum YTPlaybackStatus {}
// Unstarted = -1,
// Ended,
// Playing,
// Paused,
// Buffering,
// VideoCued = 5,
