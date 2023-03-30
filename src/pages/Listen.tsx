import Controls from "@/components/Controls";
import Info from "@/components/Info";
import Player from "@/components/Player";
import Queue from "@/components/Queue";
import UsernameModal from "@/components/UsernameModal";
import { getSnapshot } from "@/services/firestore";
import {
  addParticipant,
  isCurrentSessionNotInParticipant,
  subscribeToSession,
} from "@/services/firestore/session";
import { setPlayingStatus, YTPlaybackStatus } from "@/stores/player-store";
import { setQueue } from "@/stores/queue-store";
import useSessionStore, {
  setCurrentSong,
  setSession,
} from "@/stores/session-store";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Listen = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const isLogin = useSessionStore((s) => s.isLogin);
  const username = useSessionStore((s) => s.username);
  const [isOpen, setIsOpen] = useState(!isLogin);
  const isHost = username === useSessionStore.getState().session.host;
  const [loadingEnum, setLoadingEnum] = useState<
    "loading" | "ready" | "invalid"
  >();

  useEffect(() => {
    if (!isLogin) {
      setLoadingEnum("invalid");
    } else {
      setLoadingEnum("ready");
    }
    setIsOpen(!isLogin);
  }, [isLogin]);

  useEffect(() => {
    if (!sessionId) return;
    return subscribeToSession(sessionId, (data) => {
      setCurrentSong(data.current_song?.id ?? null);
      if (sessionId) {
        setQueue(data.queue);
      }
      setPlayingStatus(
        (data.current_song?.status as unknown as YTPlaybackStatus) ?? null
      );
    });
  }, [sessionId]);

  useEffect(() => {
    setLoadingEnum("loading");

    (async () => {
      if (!sessionId) {
        setLoadingEnum("invalid");
        setIsOpen(true);
        return;
      }

      const snapshot = await getSnapshot(sessionId);
      if (!snapshot) {
        navigate("/404");
        setLoadingEnum("invalid");
        return;
      }

      if (username && await isCurrentSessionNotInParticipant(sessionId, username)) {
          await addParticipant(sessionId, username);
      }
      setSession({
        host: snapshot.host,
        id: sessionId,
      });

      setQueue(snapshot.queue);
      setLoadingEnum("ready");
    })();
  }, [navigate, sessionId, username]);

  return (
    <div className="max-w-4xl border mx-auto h-screen overflow-hidden flex flex-col">
      {loadingEnum === "ready" && (
        <>
          <Info />
          {isHost && <Player />}
          <Controls />
          <Queue />
        </>
      )}

      <UsernameModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        sessionId={sessionId}
      />
    </div>
  );
};

export default Listen;
