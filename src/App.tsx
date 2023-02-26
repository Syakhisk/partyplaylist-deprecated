import { useEffect } from "react";
import useFirestore from "./stores";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { router } from "./router";

function App() {
  // const subscribe = useFirestore((s) => s.subscribe);
  // const data = useFirestore((s) => s.data);

  // useEffect(() => {
  //   const unsubscribe = subscribe();
  //   return unsubscribe;
  // }, [subscribe]);

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
