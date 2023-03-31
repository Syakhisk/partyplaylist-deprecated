import { updateQueue } from "@/services/firestore/queue";
import { VideoMetadata } from "@/services/youtube";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import useSessionStore from "./session-store";
import { updateSongId } from "@/services/firestore/player";

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
  await updateQueue(session.id, _queue);

  if (videoIdx === 1 && _queue[0].video_id) {
    await updateSongId(session.id, _queue[0].video_id, _queue[0].uid ?? null);
  }
};
export const addQueue = async (video: VideoMetadata) => {
  const { queue } = useQueueStore.getState();
  const { session } = useSessionStore.getState();
  if (!session.id) return;
  const _queue = [...queue];
  _queue.push(video);

  useQueueStore.setState({ queue: _queue });
  await updateQueue(session.id, _queue);
  if (_queue?.length === 1) {
    await updateSongId(session.id, _queue[0].video_id, _queue[0].uid ?? null);
  }
};
export const removeQueue = async (uid?: number) => {
  if (!uid) return;
  const { queue } = useQueueStore.getState();
  const { session } = useSessionStore.getState();
  if (!session.id) return;

  const videoIdx = queue.findIndex((_video) => _video.uid === uid);
  if (videoIdx === -1) return;
  const _queue = [...queue];
  _queue.splice(videoIdx, 1);
  if (videoIdx === 0) {
    await updateSongId(session.id, _queue.at(0)?.video_id ?? null, _queue.at(0)?.uid ?? null);
  }
  useQueueStore.setState({ queue: _queue });
  await updateQueue(session.id, _queue);
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
  await updateQueue(session.id, _queue);

  if (videoIdx === 0 && _queue[0].video_id) {
    await updateSongId(session.id, _queue[0].video_id, _queue[0].uid ?? null);
  }
};

export const nextSongInQueue = async () => {
  const { queue } = useQueueStore.getState();
  const { session } = useSessionStore.getState();
  if (!session.id) return;

  const _queue = [...queue];
  const song = _queue.shift();

  if (!song) return;
  _queue.push(song);

  useQueueStore.setState({ queue: _queue });
  await updateQueue(session.id, _queue);
  if (_queue[0]?.video_id) {
    await updateSongId(session.id, _queue[0].video_id, _queue[0].uid ?? null);
  }
};

export const isLastSong = () => {
  // const { queue } = useQueueStore.getState();
  // if (queue.length === 0) return false;

  // if (!uid) return false;
  // const videoIdx = queue.findIndex((_video) => _video.uid === uid);
  // return videoIdx === queue.length - 1;
};

export const isFirstSong = () => {
  // const { queue } = useQueueStore.getState();
  // if (queue.length === 0) return false;

  // if (!uid) return false;
  // const videoIdx = queue.findIndex((_video) => _video.uid === uid);
  // return videoIdx === 0;
};

export interface QueueStore {
  queue: VideoMetadata[];
}

export default useQueueStore;
