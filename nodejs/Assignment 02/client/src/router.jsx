import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import Detail from "./pages/detail/Detail";
import Layout from "./Layout/Layout";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import Transactions from "./pages/transaction/Transactions";
import Booking from "./pages/booking/Booking";

// fetch
import { loader as getHotelDb } from "./pages/home/loader";
import { loader as getSpecHotel } from "./pages/detail/loader";
import { loader as getBookData } from "./pages/booking/loader";
import { booking } from "./pages/booking/util";
import { getTrans } from "./pages/transaction/util";

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
        path: ":username/transaction",
        element: <Transactions />,
        loader: getTrans,
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
      {
        path: "/book/:hotelId",
        element: <Booking />,
        loader: getBookData,
        action: booking,
      },
    ],
  },
]);

export default router;
