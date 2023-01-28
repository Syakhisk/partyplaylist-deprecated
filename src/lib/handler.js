import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { COLLECTION_NAME, db } from "./firebase";
import { generateSessionCode, getVideoDetails } from "./helper";
import { _t } from "./toast";

export const handleQueueAdd = async (value, docId) => {
  const toastId = _t.loading("Loading...");

  if (!value) return _t.fail(toastId, "Error");

  try {
    const res = await getVideoDetails(value);

    const url = new URL(value);
    const sp = new URLSearchParams(url.searchParams);

    const docRef = await updateDoc(doc(db, COLLECTION_NAME, docId), {
      // code: sessionCode,
      // host: usernameRef.current.value,
      // users: [{ name: usernameRef.current.value }],
      queue: arrayUnion({
        ...res.data,
        id: sp.get("v"),
      }),
    });
    return _t.success(toastId, "Success");
  } catch (e) {
    _t.fail(toastId, "Error");
    console.error(e);
  }
};

export const handleCreateSession = async (usernameRef, sessionNameRef) => {
  if (usernameRef.current.value == "") {
    usernameRef.current.focus();
    toast.error("Your name is required!", { toastId: "username" });
    return;
  }
  if (sessionNameRef.current.value == "") {
    sessionNameRef.current.focus();
    toast.error("Session name is required!", { toastId: "sessionname" });
    return;
  }

  toast.dismiss();
  let toastId = toast.loading("Creating...");
  try {
    const sessionCode = await generateSessionCode();
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      code: sessionCode,
      host: usernameRef.current.value,
      users: [{ name: usernameRef.current.value }],
    });

    toast.update(toastId, {
      render: "Session created!",
      type: "success",
      isLoading: false,
    });

    window.location.replace(`/listen/${sessionCode}`);
  } catch (e) {
    console.error(e);
    toast.update(toastId, {
      render: "Something went wrong",
      type: "error",
      isLoading: false,
    });
  }
};
