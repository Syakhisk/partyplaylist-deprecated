import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import { handleCreateSession } from "../lib/handler";

const NewSession = () => {
  const usernameRef = useRef(null);
  const sessionNameRef = useRef(null);

  return (
    <Layout>
      <div className="flex flex-col gap-4 max-w-sm mx-auto h-screen justify-center">
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Your Name</label>
          <input
            type="text"
            id="username"
            ref={usernameRef}
            placeholder="Clint Barton"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="username">Session Name</label>
          <input
            type="text"
            id="sessionName"
            ref={sessionNameRef}
            placeholder="Anti Asmalibrasi"
          />
        </div>

        <button
          className="bg-red-500 p-2 rounded-sm text-red-100 mt-4"
          onClick={() => handleCreateSession(usernameRef, sessionNameRef)}
        >
          Create Session
        </button>
      </div>
    </Layout>
  );
};

export default NewSession;
