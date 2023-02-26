import useQueueStore from "@/stores/queue-store";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import AddVideoModal from "./AddVideoModal";

const Queue = () => {
  const [isOpen, setIsOpen] = useState(false);
  const queue = useQueueStore((s) => s.queue);

  return (
    <>
      <div className="fixed bottom-0 right-0 mb-4 mr-4 z-20">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary p-2 text-sm w-fit flex items-center gap-2 text-white rounded"
        >
          <PlusCircleIcon className="h-5 w-5" />
          <div>Add to queue</div>
        </button>
      </div>

      <div className="relative h-full overflow-y-auto">
        <div className="border rounded p-4 pt-8 relative min-h-[10vh] md:mx-4 mt-4">
          <div className="sticky top-0 -mt-8 -mx-4 text-sm h-fit flex justify-between">
            <div className="rounded-br bg-muted/50 p-1 px-4">Queue</div>
          </div>

          <div className="h-[200vh]">
            {queue.length > 0 ? (
              queue.map((video) => (
                <div key={video.uid ?? video.video_id}>{video.video_title}</div>
              ))
            ) : (
              <div className="text-sm italic text-muted text-center">
                No item in the queue, plz add 🎵
              </div>
            )}
          </div>
        </div>
      </div>

      <AddVideoModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Queue;
