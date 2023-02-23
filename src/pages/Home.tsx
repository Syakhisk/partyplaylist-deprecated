import Layout from "@/components/Layout";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!inputRef.current) return;
    if (inputRef.current.value === "") return;

    navigate(`/listen/${inputRef.current.value}`);
  };

  return (
    <>
      <Layout>
        <div className="flex flex-col gap-4 max-w-sm mx-auto h-screen justify-center">
          <h1 className="font-bold text-2xl text-center">🎷PartyPlaylist</h1>

          <input type="text" ref={inputRef} placeholder="Session Code" />

          <button
            className="bg-red-500 p-2 rounded-sm text-red-100"
            onClick={handleClick}
          >
            Join Session
          </button>

          <button className="text-muted text-sm underline hover:text-gray-400">
            <Link to="/listen">Create Session</Link>
          </button>
        </div>

        {/* <div className="text-sm fixed bottom-0 italic text-gray-500 mb-12 mx-auto w-full left-0 text-center"> */}
        {/*   <a className="hover:text-gray-100" href="https://github.com/syakhisk"> */}
        {/*     made with ❤️ by sakis */}
        {/*   </a> */}
        {/*   <br /> */}
        {/*   <a */}
        {/*     className="hover:text-gray-100" */}
        {/*     href="https://github.com/syakhisk/partyplaylist" */}
        {/*   > */}
        {/*     Github */}
        {/*   </a> */}
        {/* </div> */}
      </Layout>
    </>
  );
};

export default Home;
