import { useEffect } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { doc } from "firebase/firestore";

import Player from "../components/Player";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import Queue from "../components/Queue";
import SessionInfo from "../components/SessionInfo";
import Queuer from "../components/Queuer";

import { COLLECTION_NAME, db } from "../lib/firebase";
import { isEmptyObject } from "../lib/helper";
import Controls from "../components/Controls";
import useSessionStore from "../lib/stores/session-store";
import usePlayerStore from "../lib/stores/player-store";

const Listen = () => {
  const { sessionId } = useParams();
  const [sessionRef] = useDocument(doc(db, COLLECTION_NAME, sessionId));

  const session = useSessionStore((s) => s.session);
  const setSession = useSessionStore((s) => s.setSession);

  const handleStateChange = usePlayerStore((s) => s.handleStateChange);

  useEffect(() => {
    if (sessionRef) {
      const data = sessionRef.data();
      setSession({
        ...data,
        id: sessionRef.id,
      });

      const playingState = data.current_song_status == "playing" ? 1 : -1;
      handleStateChange({ data: playingState });
    }
  }, [sessionRef]);

  if (isEmptyObject(session)) return <Loading />;

  return (
    <Layout>
      <div className="flex flex-col items-center p-4 gap-4">
        <SessionInfo />
        <Controls />
        <Queuer />
        <Queue />
        <Player />
      </div>
    </Layout>
  );
};

export default Listen;
