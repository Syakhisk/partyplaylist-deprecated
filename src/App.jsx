import { Route, Routes } from "react-router-dom";
import Index from "./views/Index";
import Listen from "./views/Listen";
import NewSession from "./views/NewSession";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/listen" element={<NewSession />} />
        <Route path="/listen/:sessionCode" element={<Listen />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
