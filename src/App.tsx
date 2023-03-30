import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { router } from "./router";
import useSessionStore, { logout } from "@/stores/session-store";
import { removeParticipant } from "@/services/firestore/session";

function App() {
  const username = useSessionStore(s => s.username)
  const sessionId = useSessionStore(s => s.session.id)

  useEffect(() => {
    const removeUserSession = async (): Promise<void> => {
      logout();
      if (sessionId && username) {
        await removeParticipant(sessionId, username)
      }
    };
    window.addEventListener("beforeunload", removeUserSession);

    return () => {
      window.removeEventListener("beforeunload", removeUserSession)
    }
  }, [sessionId, username]);

  return (
    <>
      {/* <div className="text-xs bg-gray-300 w-fit fixed bottom-0 left-0 m-4 p-4 rounded opacity-50 pointer-events-none"> */}
      {/*   <pre>{JSON.stringify(data, null, 2)}</pre> */}
      {/* </div> */}
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
