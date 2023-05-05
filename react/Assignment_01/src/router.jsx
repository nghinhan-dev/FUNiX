import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import Detail from "./pages/detail/Detail";
import Layout from "./Layout/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/Detail",
        element: <Detail />,
      },
    ],
  },

  {
    path: "/Search",
    element: <Search />,
  },
]);

export default router;
