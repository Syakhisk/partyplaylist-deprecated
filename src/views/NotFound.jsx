import { Link } from "react-router-dom";
import Layout from "../components/Layout";

const NotFound = () => {
  return (
    <Layout>
      <div className="max-w-sm mx-auto h-screen grid place-items-center content-center">
        <h1 className="font-bold text-9xl text-center p-4 px-8 leading-none rounded text-red-500 border-red-500 outline outline-4 font-mono">
          404
        </h1>

        <p className="mt-4">The page you're looking for doesn't exist</p>

        <button className="text-sm bg-red-500 text-red-100 px-4 p-2 mt-8 rounded">
          <Link to="/">Go back home</Link>
        </button>
      </div>
    </Layout>
  );
};

export default NotFound;
