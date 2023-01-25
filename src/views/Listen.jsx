import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

const Listen = () => {
  const { sessionCode } = useParams();

  useEffect(() => {

  }, [])

  return (
    <Layout>
      <div className="flex flex-col items-center p-4">
        {/* session info */}
        <div className="text-gray-500 flex items-center justify-center flex-col leading-none">
          <div>Session Code</div>
          <div className="text-2xl font-mono font-extrabold">
            #{sessionCode}
          </div>
        </div>

        {/* session name */}
        <div className="border">
          <input
            type="text"
            readOnly
            value="Session Jamming 21"
            className="border-none text-2xl w-fit"
          />
        </div>

        <div></div>
      </div>
    </Layout>
  );
};

export default Listen;
