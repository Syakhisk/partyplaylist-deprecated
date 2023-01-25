import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { generateSessionCode } from "../lib/helper";

const Index = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    generateSessionCode().then((r) => console.log(r));
  }, []);

  return (
    <Layout>
      <div className="flex flex-col gap-4 max-w-sm mx-auto h-screen justify-center">
        <h1 className="font-bold text-2xl text-center">🎷PartyPlaylist</h1>

        <input type="text" ref={inputRef} placeholder="Session Code" />

        <button className="bg-red-500 p-2 rounded-sm text-red-100">
          Join Session
        </button>

        <button className="text-white text-sm underline">
          <Link to="/listen">Create Session</Link>
        </button>
      </div>

      <div className="text-sm fixed bottom-0 italic text-gray-500 mb-12 mx-auto w-full left-0 text-center">
        <a className="hover:text-gray-100" href="https://github.com/syakhisk">
          made with ❤️ by sakis
        </a>
        <br />
        <a
          className="hover:text-gray-100"
          href="https://github.com/syakhisk/partyplaylist"
        >
          open-sourced here
        </a>
      </div>
    </Layout>
  );
};

export default Index;
