import Controls from "@/components/Controls";
import Info from "@/components/Info";
import Queue from "@/components/Queue";
import UsernameModal from "@/components/UsernameModal";
import { getMetadataFromUrl, VideoMetadata } from "@/services/youtube";
import useSessionStore, { setSession } from "@/stores/session-store";
import { useEffect, useState } from "react";

const Listen = () => {
  const isLogin = useSessionStore((s) => s.isLogin);
  const username = useSessionStore((s) => s.username);
  const [isOpen, setIsOpen] = useState(!isLogin);
  const [video, setVideo] = useState<VideoMetadata>();

  useEffect(() => {
    setIsOpen(!isLogin);
  }, [isLogin]);

  useEffect(() => {
    (async () => {
      const data = await getMetadataFromUrl(
        "https://www.youtube.com/watch?v=KXw8CRapg7k"
      );

      setSession({
        host: username,
      });

      setVideo(data);
    })();
  }, []);

  return (
    <div className="max-w-4xl border mx-auto h-screen overflow-hidden flex flex-col">
      <Info />
      <Controls video={video} />
      <Queue />

      <UsernameModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Listen;
