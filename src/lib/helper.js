import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "./firebase";


export const createSession = async (id) => {

}

export const generateSessionCode = async () => {
  const _generate = () => Math.floor(1000 + Math.random() * 90000);
  let id = _generate();
  let exists = true;

  do {
    const q = query(
      collection(db, "partyplaylist-sessions"),
      where("code", "==", id),
      limit(1)
    );

    const docs = await getDocs(q);
    exists = !docs.empty;
  } while (exists);

  return id;
};
