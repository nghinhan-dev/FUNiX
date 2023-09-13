import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import Detail from "./pages/detail/Detail";
import Layout from "./Layout/Layout";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import Transactions from "./pages/transaction/Transactions";

// fetch
import { loader as getHotelDb } from "./pages/home/loader";
import { loader as getSpecHotel } from "./pages/detail/loader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
        loader: getHotelDb,
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
        path: "/search",
        element: <Search />,
      },
      {
        path: "/hotel/:hotelId",
        element: <Detail />,
        loader: getSpecHotel,
      },
    ],
  },
]);

export default router;
