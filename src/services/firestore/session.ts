import {
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { COLLECTION_NAME, db } from ".";

// export const getSessionById = async (id: string): any => {
// };

export const getSessionById = async (id: string): any => {
  const docRef = doc(db, COLLECTION_NAME, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  return {
    id: docSnap.id,
    ...docSnap.data(),
  };
};

export const subscribeToSession = (id: string, callback: Function): any => {
  const docRef = doc(db, COLLECTION_NAME, id);
  return onSnapshot(docRef, (doc) => {
    callback({
      data: {
        id: doc.id,
        ...doc.data(),
      },
    });
  });
};
