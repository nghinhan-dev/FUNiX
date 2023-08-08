import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import Detail from "./pages/detail/Detail";
import Layout from "./Layout/Layout";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import Transactions from "./pages/transaction/Transactions";

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
        path: "transaction",
        element: <Transactions />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "/Search",
        element: <Search />,
      },
      {
        path: "/Detail",
        element: <Detail />,
      },
    ],
  },
]);

export default router;
