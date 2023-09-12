import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./MainLayout/MainLayout";
import Hotel from "./Hotel/Hotel";
import { loader as hotelLoader } from "./Hotel/loader";
import TypeRoom from "./TypeofRoom/TypeRoom";
import { loader as typeRoomLoader } from "./TypeofRoom/loader";
import Room from "./Room/Room";
import { loader as roomLoader } from "./Room/loader";
import User from "./Users/User";
import { loader as userLoader } from "./Users/loader";
import AddUser from "./Users/AddUser";
import { action as addUserAction } from "./Users/action";
import EditUser from "./Users/Edit/EditUser";
import { loader as getSpecificUser } from "./Users/Edit/getSpecificUser";
import { action as updateUser } from "./Users/Edit/updateUser";
import AddRoom from "./Room/AddRoom";
import AddHotel from "./Hotel/AddHotel";
import AddRoomType from "./TypeofRoom/AddRoomType";

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
        path: "/add_hotel",
        element: <AddHotel />,
      },
      // room_type related paths
      {
        path: "/room_type",
        element: <TypeRoom />,
        loader: typeRoomLoader,
      },
      {
        path: "/add_roomType",
        element: <AddRoomType />,
      },
      // room related paths
      {
        path: "/rooms",
        element: <Room />,
        loader: roomLoader,
      },
      {
        path: "/add_room",
        element: <AddRoom />,
      },
      // User related paths
      {
        path: "/users",
        element: <User />,
        loader: userLoader,
      },
      {
        path: "/users/:userId",
        element: <EditUser />,
        loader: getSpecificUser,
        action: updateUser,
      },
      {
        path: "/add_user",
        element: <AddUser />,
        action: addUserAction,
      },
    ],
  },
]);

export default router;
