import { doc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { COLLECTION_NAME, db } from "../lib/firebase";
import { BackwardIcon, ForwardIcon, PlayIcon } from "@heroicons/react/20/solid";
import { handleQueueAdd } from "../lib/handler";

const Listen = () => {
  const inputRef = useRef(null);
  const [session, setSession] = useState(null);
  const { sessionId } = useParams();
  const [sessionRef, loading, error] = useDocument(
    doc(db, COLLECTION_NAME, sessionId)
  );

  useEffect(() => {
    if (sessionRef) {
      setSession({ ...sessionRef.data(), id: sessionRef.id });
    }
  }, [sessionRef]);

  if (!session) {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col items-center p-4">
        <div className="flex flex-wrap gap-4 justify-around border rounded max-w-xl overflow-ellipsis p-4 w-full">
          <div className="w-full text-center text-2xl font-mono border rounded p-2">
            {session.name}
          </div>

          <div className="text-center">
            <div className="text-xs text-dim">Session ID</div>
            <div>#{sessionId}</div>
          </div>

          <div className="text-left flex-grow overflow-hidden">
            <div className="text-xs text-dim">Host</div>
            <div>{session.host}</div>
          </div>
        </div>

        <div className="mt-4 flex gap-8 border rounded p-4 px-8 items-center">
          <BackwardIcon className="h-6" />
          <PlayIcon className="h-8" />
          <ForwardIcon className="h-6" />
        </div>

        <div className="border focus-within:border-primary rounded transition-all mt-4">
          <input
            type="text"
            placeholder="Enter a youtube url"
            ref={inputRef}
            className="peer border-none active:outline-none focus:outline-none px-2 focus:placeholder:opacity-0"
          />
          <button
            onClick={() => handleQueueAdd(inputRef.current.value, sessionId)}
            className="p-2 bg-dim/50 peer-focus:bg-primary focus:bg-primary transition-all"
          >
            Queue
          </button>
        </div>

        <div className="border w-full mt-4 rounded p-4 pt-8 relative">
          <div className="absolute inset-0 p-1 px-4 text-xs bg-dim/50 w-fit h-fit rounded-br">
            Queue
          </div>
          {sessionRef.get("queue").map((i, idx) => (
            <div key={idx}>{i.title}</div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Listen;
