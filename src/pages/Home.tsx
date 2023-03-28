import Form from "@/components/Form";
import Input from "@/components/Input";
import Layout from "@/components/Layout";
import { joinSessionSchema } from "@/lib/schemas";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InferType } from "yup";

const Home = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!inputRef.current) return;
    if (inputRef.current.value === "") return;
  };

  function handleSubmit(data: InferType<typeof joinSessionSchema>) {
    navigate(`/listen/${data.sessionId}`);
  }

  return (
    <>
      <Layout>
        <Form onSubmit={handleSubmit} yupSchema={joinSessionSchema}>
          <div className="flex flex-col gap-4 max-w-sm mx-auto h-screen justify-center">
            <h1 className="font-bold text-2xl text-center">🎷PartyPlaylist</h1>

            <Input placeholder="Session Code" id="sessionId" />

            <button
              type="submit"
              className="bg-red-500 p-2 rounded-sm text-red-100"
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
        </Form>
      </Layout>
    </>
  );
};

export default Home;
