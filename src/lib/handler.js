import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { router } from "../main";
import { COLLECTION_NAME, db } from "./firebase";
import { generateSessionCode } from "./helper";

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
    router.navigate(`/listen/${sessionCode}`);
  } catch (e) {
    console.error(e);
    toast.update(toastId, {
      render: "Something went wrong",
      type: "error",
      isLoading: false,
    });
  }
};
