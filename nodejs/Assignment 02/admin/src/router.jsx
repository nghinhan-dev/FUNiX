import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./MainLayout/MainLayout";

import Hotel from "./Hotel/Hotel";
import AddHotel from "./Hotel/AddHotel";
import { loader as hotelLoader } from "./Hotel/loader";

import User from "./Users/User";
import EditUser from "./Users/Edit/EditUser";
import { loader as userLoader } from "./Users/loader";
import AddUser from "./Users/AddUser";
import { action as addUserAction } from "./Users/action";
import { loader as getSpecificUser } from "./Users/Edit/getSpecificUser";
import { action as updateUser } from "./Users/Edit/updateUser";

import TypeRoom from "./TypeofRoom/TypeRoom";
import AddRoomType from "./TypeofRoom/AddRoomType";
import EditType from "./TypeofRoom/EditType";
import { loader as typeRoomLoader } from "./TypeofRoom/loader";
import { loader as getSpecType } from "./TypeofRoom/getSpecType";

import Room from "./Room/Components/Room";
import AddRoom from "./Room/Components/AddRoom";
import EditRoom from "./Room/Components/EditRoom";
import { getRooms, updateRoom, getSpecRoom } from "./Room/util";

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
      {
        path: "/type/:typeId",
        element: <EditType />,
        loader: getSpecType,
      },
      // room related paths
      {
        path: "/rooms",
        element: <Room />,
        loader: getRooms,
      },
      {
        path: "/add_room",
        element: <AddRoom />,
        action: updateRoom,
      },
      {
        path: "/room/:roomId",
        element: <EditRoom />,
        loader: getSpecRoom,
        action: updateRoom,
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
