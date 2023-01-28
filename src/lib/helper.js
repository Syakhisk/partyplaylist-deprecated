import axios from "axios";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "./firebase";

export const getVideoDetails = async (url) => {
  // https://www.youtube.com/oembed?url=http%3A//youtube.com/watch%3Fv%3DM3r2XDceM6A&format=json
  const baseUrl = "https://www.youtube.com/oembed";

  return axios.get(baseUrl, {
    params: {
      url: url,
      format: "json",
    },
  });
};

export const createSession = async (id) => {};

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

export const isEmptyObject = (obj) => Object.keys(obj).length === 0;
