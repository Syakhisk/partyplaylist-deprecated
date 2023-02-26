import Controls from "@/components/Controls";
import Info from "@/components/Info";
import Queue from "@/components/Queue";
import UsernameModal from "@/components/UsernameModal";
import { getSnapshot } from "@/services/firestore";
import { getMetadataFromUrl, VideoMetadata } from "@/services/youtube";
import { setQueue } from "@/stores/queue-store";
import useSessionStore, { setSession } from "@/stores/session-store";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Listen = () => {
  const { sessionId } = useParams();
  const isLogin = useSessionStore((s) => s.isLogin);
  const username = useSessionStore((s) => s.username);
  const [isOpen, setIsOpen] = useState(!isLogin);
  const [video, setVideo] = useState<VideoMetadata>();

  useEffect(() => {
    setIsOpen(!isLogin);
  }, [isLogin]);

  useEffect(() => {
    (async () => {
      if (!sessionId) return;

      const snapshot = await getSnapshot(sessionId);
      if (!snapshot) return;

      const data = await getMetadataFromUrl(
        "https://www.youtube.com/watch?v=KXw8CRapg7k"
      );

      setSession({
        host: username,
        id: sessionId,
      });

      setQueue(snapshot.queue as VideoMetadata[]);

      setVideo(data);
    })();
  }, []);

  return (
    <div className="max-w-4xl border mx-auto h-screen overflow-hidden flex flex-col">
      <Info />
      <Controls />
      <Queue />

      <UsernameModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Listen;
