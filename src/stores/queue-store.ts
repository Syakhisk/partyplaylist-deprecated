import { VideoMetadata } from "@/services/youtube";
import { create } from "zustand";
import { persist } from "zustand/middleware";

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

export interface QueueStore {
  queue: VideoMetadata[];
}

export default useQueueStore;
