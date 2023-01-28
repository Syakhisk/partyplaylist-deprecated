import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Index from "./views/Index";
import Listen from "./views/Listen";
import NotFound from "./views/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <NotFound />,
  },
  {
    path: "/listen/:sessionId",
    element: <Listen />,
  },
]);
