import { doc, updateDoc } from "firebase/firestore";
import { atom } from "jotai";
import { create } from "zustand";
import { COLLECTION_NAME, db } from "./firebase";

export const sessionCode = atom(null);

export const sessionAtom = atom({});

export const queueAtom = atom(
  (get) => get(sessionAtom).queue,
  (get, set, newQueue) =>
    set(sessionAtom, { ...get(sessionAtom), queue: newQueue })
);

export const useSessionStore = create((set) => ({
  session: {},
  setSession: (newSession) => set(() => ({ session: newSession })),
  queueUp: (id) =>
    set(async (state) => {
      const curIdx = state.session.queue.findIndex((i) => i.id == id);
      const newQueue = array_move(state.session.queue, curIdx, curIdx - 1);

      await updateDoc(doc(db, COLLECTION_NAME, state.session.id), {
        queue: newQueue,
      });
    }),
  queueDown: (id) =>
    set(async (state) => {
      const curIdx = state.session.queue.findIndex((i) => i.id == id);
      const newQueue = array_move(state.session.queue, curIdx, curIdx + 1);

      await updateDoc(doc(db, COLLECTION_NAME, state.session.id), {
        queue: newQueue,
      });
    }),
  queueRemove: (id) =>
    set(async (state) => {
      const curIdx = state.session.queue.findIndex((i) => i.id == id);
      const newQueue = [...state.session.queue];

      newQueue.splice(curIdx, 1);

      await updateDoc(doc(db, COLLECTION_NAME, state.session.id), {
        queue: newQueue,
      });
    }),
  queuePlayNext: (id) =>
    set(async (state) => {
      const curIdx = state.session.queue.findIndex((i) => i.id == id);
      const newQueue = [...state.session.queue];
      const [curItem] = newQueue.splice(curIdx, 1);
      console.log(curItem, newQueue);

      await updateDoc(doc(db, COLLECTION_NAME, state.session.id), {
        queue: [curItem, ...newQueue],
      });
    }),
}));

function array_move(arr, old_index, new_index) {
  const newArr = [...arr];

  while (old_index < 0) {
    old_index += arr.length;
  }

  while (new_index < 0) {
    new_index += arr.length;
  }

  if (old_index >= arr.length) {
    return newArr;
  }

  if (new_index >= arr.length) {
    new_index = arr.length;
  }

  newArr.splice(new_index, 0, newArr.splice(old_index, 1)[0]);

  return newArr;
}

window.armov = array_move;
