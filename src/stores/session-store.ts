import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSessionStore = create<SessionStore>()(
  persist(
    (_set) => ({
      session: {
        id: null,
        current_video: null,
        host: null,
      },
      username: null,
      isLogin: false,
    }),
    {
      name: "session-store",
    }
  )
);

export const login = (username: string) =>
  useSessionStore.setState({
    username,
    isLogin: true,
  });

export const logout = () =>
  useSessionStore.setState({
    username: null,
    isLogin: false,
  });

// export const setSession = (session: ISession) => {
//   useSessionStore.setState({ session: { ...session } });
// };

export const setSession = (session: ISession | Partial<ISession>) => {
  useSessionStore.setState({
    session: session as ISession,
  });
};

export default useSessionStore;

export interface ISession {
  id: string | null;
  host: string | null;
  current_video: {
    id: string;
    status: string;
  } | null;
}

export interface SessionStore {
  session: ISession;
  username: string | null;
  isLogin: boolean;
}

export enum YTPlaybackStatus {
  Unstarted = -1,
  Ended,
  Playing,
  Paused,
  Buffering,
  VideoCued = 5,
}
