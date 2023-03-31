import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSessionStore = create<SessionStore>()(
  persist(
    (_set) => ({
      session: {
        id: null,
        current_song: {
          id: null,
          status: null,
          uid: null,
        },
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

export const setCurrentSong = (currentSong: ISession["current_song"]) => {
  const session = useSessionStore.getState().session;
  useSessionStore.setState({
    session: {
      ...session,
      current_song: {
        ...session.current_song,
        ...currentSong,
      },
    },
  });
};

export const setSession = (session: ISession | Partial<ISession>) => {
  const _session = useSessionStore.getState().session;

  useSessionStore.setState({
    session: {
      ..._session,
      ...session,
    },
  });
};

export default useSessionStore;

export interface ISession {
  id: string | null;
  host: string | null;
  current_song: {
    id: string | null;
    status: number | null;
    uid: number | null;
  };
}

export interface SessionStore {
  session: ISession;
  username: string | null;
  isLogin: boolean;
}
