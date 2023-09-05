import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./MainLayout/MainLayout";
import Hotel from "./Hotel/Hotel";
import { loader as hotelLoader } from "./Hotel/loader";
import TypeRoom from "./TypeofRoom/TypeRoom";
import { loader as typeRoomLoader } from "./TypeofRoom/loader";
import Room from "./Room/Room";
import { loader as roomLoader } from "./Room/loader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/hotels",
        element: <Hotel />,
        loader: hotelLoader,
      },
      {
        path: "/room_type",
        element: <TypeRoom />,
        loader: typeRoomLoader,
      },
      {
        path: "/rooms",
        element: <Room />,
        loader: roomLoader,
      },
    ],
  },
]);

export default router;
