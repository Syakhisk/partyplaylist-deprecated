import useSessionStore from "../../lib/stores/session-store";
import QueueItem from "./QueueItem";

const Queue = () => {
  const queue = useSessionStore((s) => s.session.queue);

  return (
    <div className="border w-full rounded p-4 pt-8 relative min-h-[10vh]">
      <div className="absolute inset-0 p-1 px-4 text-xs bg-dim/50 w-fit h-fit rounded-br">
        Queue
      </div>

      {queue?.length > 0 ? (
        queue.map((item, idx) => <QueueItem key={idx} item={item} />)
      ) : (
        <div className="text-sm italic text-dim text-center">No item in the queue, plz add 🎵</div>
      )}
    </div>
  );
};

export default Queue;
