import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Listen from "@/pages/Listen";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: "/listen/:sessionId?",
    element: <Listen />,
  },
]);
