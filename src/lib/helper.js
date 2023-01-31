import axios from "axios";
import { doc, getDoc } from "firebase/firestore";
import { COLLECTION_NAME, db } from "./firebase";

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

export const generateSessionCode = async () => {
  const _generate = () => Math.random().toString().slice(2, 8);
  let id = null;
  let exists = true;

  do {
    id = _generate();
    while (id.length < 6) id = _generate();

    let _doc = await getDoc(doc(db, COLLECTION_NAME, id));
    exists = _doc.exists();
  } while (exists);

  return id;
};

export const isEmptyObject = (obj) => Object.keys(obj).length === 0;
