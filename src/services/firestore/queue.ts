import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { COLLECTION_NAME, db } from ".";
import { VideoMetadata } from "../youtube";

export const addToQueue = async (
  sessionId: string,
  video: VideoMetadata
): Promise<any> => {
  const docRef = doc(db, COLLECTION_NAME, sessionId);
  const docSnap = await updateDoc(docRef, {
    queue: arrayUnion(video),
  });

  return docSnap;
};
