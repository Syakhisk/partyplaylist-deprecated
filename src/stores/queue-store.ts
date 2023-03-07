import { updateQueue } from "@/services/firestore/queue";
import { VideoMetadata } from "@/services/youtube";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import useSessionStore from "./session-store";

const useQueueStore = create<QueueStore>()(
  persist(
    (_set) => ({
      queue: [],
    }),
    {
      name: "queue-store",
    }
  )
);

export const setQueue = (queue: VideoMetadata[]) => {
  useQueueStore.setState({
    queue,
  });
};

export const queueUp = async (uid?: number) => {
  if (!uid) return;

  const { queue } = useQueueStore.getState();
  const { session } = useSessionStore.getState();

  if (!session.id) return;

  const videoIdx = queue.findIndex((_video) => _video.uid === uid);
  const _queue = [...queue];

  if (videoIdx <= 0) return;

  const temp = _queue[videoIdx - 1];
  _queue[videoIdx - 1] = queue[videoIdx];
  _queue[videoIdx] = temp;

  useQueueStore.setState({ queue: _queue });
  updateQueue(session.id, _queue);
};

export const queueDown = async (uid?: number) => {
  if (!uid) return;

  const { queue } = useQueueStore.getState();
  const { session } = useSessionStore.getState();
  if (!session.id) return;

  const videoIdx = queue.findIndex((_video) => _video.uid === uid);
  const _queue = [...queue];

  if (videoIdx === queue.length - 1) return;

  const temp = _queue[videoIdx + 1];
  _queue[videoIdx + 1] = queue[videoIdx];
  _queue[videoIdx] = temp;

  useQueueStore.setState({ queue: _queue });
  updateQueue(session.id, _queue);
};

export interface QueueStore {
  queue: VideoMetadata[];
}

export default useQueueStore;
