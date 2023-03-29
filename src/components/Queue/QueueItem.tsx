import { VideoMetadata } from "@/services/youtube";
import useQueueStore, { queueDown, queueUp, removeQueue } from "@/stores/queue-store";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

type Props = {
  video: VideoMetadata;
};

const QueueItem = ({ video }: Props) => {
  return (
    <div className="flex items-center hover:bg-muted/5 hover:text-white transition-colors">
      <div key={video.uid ?? video.video_id}>{video.video_title}</div>

      <div className="flex ml-auto gap-1">
        <button onClick={() => queueUp(video.uid)} title="Move video up">
          <ChevronUpIcon className="stroke-[3px] h-4" />
        </button>

        <button onClick={() => queueDown(video.uid)} title="Move video down">
          <ChevronDownIcon role="button" className="stroke-[3px] h-4" />
        </button>

        <button className="" onClick={() => removeQueue(video.uid)} title="Remove video">
          <XMarkIcon role="button" className="stroke-[3px] h-4" />
        </button>
      </div>
    </div>
  );
};

export default QueueItem;
