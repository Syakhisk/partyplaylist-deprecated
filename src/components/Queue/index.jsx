import { useAtom } from "jotai";
import { sessionAtom, useSessionStore } from "../../lib/store";
import QueueItem from "./QueueItem";

const Queue = ({}) => {
  const queue = useSessionStore((s) => s.session.queue);
  return (
    <div className="border w-full mt-4 rounded p-4 pt-8 relative min-h-[10vh] max-w-2xl">
      <div className="absolute inset-0 p-1 px-4 text-xs bg-dim/50 w-fit h-fit rounded-br">
        Queue
      </div>

      {queue?.map((item, idx) => (
        <QueueItem key={idx} item={item} />
      ))}
    </div>
  );
};

export default Queue;
