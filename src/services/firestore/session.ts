import {
  Unsubscribe,
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { COLLECTION_NAME, db } from ".";
import { VideoMetadata } from "@/services/youtube";
import { ISession } from "@/stores/session-store";

// export const getSessionById = async (id: string): any => {
// };

export const getSessionById = async (
  id: string
): Promise<SessionData | null> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  return {
    id: docSnap.id,
    ...(docSnap.data() as Omit<SessionData, "id">),
  };
};
export const createSession = async (
  id: string,
  name: string
): Promise<void> => {
  await setDoc(doc(db, COLLECTION_NAME, id), {
    current_song: {
      id: null,
      status: null,
      uid: null,
    },
    host: name,
    name: name,
    participants: [
      {
        name: name,
      },
    ],
    queue: [],
  });
};
export const isCurrentSessionNotInParticipant = async (
  id: string,
  name: string
): Promise<boolean> => {
  const sessionRef = await getDoc(doc(db, COLLECTION_NAME, id));
  if (!sessionRef.exists()) return false;
  const sessionData = sessionRef.data() as SessionData;
  return (
    sessionData.participants.find(
      (participant) => participant.name === name
    ) === undefined
  );
};

export const addParticipant = async (
  id: string,
  name: string
): Promise<void> => {
  await updateDoc(doc(db, COLLECTION_NAME, id), {
    participants: arrayUnion({ name }),
  });
};

export const removeParticipant = async (
  id: string,
  name: string
): Promise<void> => {
  await updateDoc(doc(db, COLLECTION_NAME, id), {
    participants: arrayRemove({ name }),
  });
};

export interface SessionData extends ISession {
  name: string | null;
  participants: {
    name: string | null;
  }[];
  queue: VideoMetadata[];
}
export const subscribeToSession = (
  id: string,
  callback: (data: SessionData) => void
): Unsubscribe => {
  const docRef = doc(db, COLLECTION_NAME, id);
  return onSnapshot(docRef, (doc) => {
    callback({
      id: doc.id,
      ...(doc.data() as Omit<SessionData, "id">),
    });
  });
};
