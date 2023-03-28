import { COLLECTION_NAME, db } from "@/services/firestore";
import { doc, onSnapshot, Unsubscribe } from "firebase/firestore";
import { create } from "zustand";

const docId = "69420";

interface FirestoreState {
  data: any;
  subscribe: () => Unsubscribe;
}

const useFirestore = create<FirestoreState>((set) => ({
  data: null,
  subscribe: () => {
    const unsubscribe = onSnapshot(doc(db, COLLECTION_NAME, docId), (doc) => {
      set({
        data: {
          id: doc.id,
          ...doc.data(),
        },
      });
    });

    return unsubscribe;
  },
}));

export default useFirestore;
