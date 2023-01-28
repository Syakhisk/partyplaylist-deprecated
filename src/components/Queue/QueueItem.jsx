import {
  ArrowDownIcon,
  ArrowUpIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { PlayIcon } from "@heroicons/react/24/outline";
import { useSessionStore } from "../../lib/store";

const QueueItem = ({ item }) => {
  const queueUp = useSessionStore((s) => () => s.queueUp(item.id));
  const queueDown = useSessionStore((s) => () => s.queueDown(item.id));
  const queueRemove = useSessionStore((s) => () => s.queueRemove(item.id));
  const queuePlayNext = useSessionStore((s) => () => s.queuePlayNext(item.id));
  const buttonClass = `h-6 hover:bg-white/10 rounded p-1`;

  return (
    <div className="flex w-full">
      <div title={item.title} className="whitespace-nowrap overflow-clip mr-4">
        {item.title}
      </div>
      <div className="flex items-center justify-self-end ml-auto">
        <ArrowUpIcon
          onClick={queueUp}
          className={buttonClass}
          title="Move up"
        />
        <ArrowDownIcon
          onClick={queueDown}
          className={buttonClass}
          title="Move down"
        />
        <XMarkIcon
          onClick={queueRemove}
          className={buttonClass}
          title="Remove from queue"
        />
        <PlayIcon
          onClick={queuePlayNext}
          className={buttonClass}
          title="Play next"
        />
      </div>
    </div>
  );
};

export default QueueItem;
