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

const Listen = () => {
  const { sessionId } = useParams();
  const [sessionRef] = useDocument(doc(db, COLLECTION_NAME, sessionId));

  const session = useSessionStore((s) => s.session);
  const setSession = useSessionStore((s) => s.setSession);

  useEffect(() => {
    if (sessionRef) {
      setSession({
        ...sessionRef.data(),
        id: sessionRef.id,
      });
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
