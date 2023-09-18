import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./MainLayout/MainLayout";

import Hotel from "./Hotel/Components/Hotel";
import AddHotel from "./Hotel/Components/AddHotel";
import EditHotel from "./Hotel/Components/EditHotel";
import { getSpecificHotel, getHotel } from "./Hotel/util";

import User from "./Users/Components/User";
import EditUser from "./Users/Components/EditUser";
import AddUser from "./Users/Components/AddUser";
import { getSpecificUser, updateUser, addUser, getUsers } from "./Users/util";

import TypeRoom from "./TypeofRoom/Components/TypeRoom";
import AddRoomType from "./TypeofRoom/Components/AddRoomType";
import EditType from "./TypeofRoom/Components/EditType";
import { getRoomTypes, getSpecificType } from "./TypeofRoom/util";

import Room from "./Room/Components/Room";
import AddRoom from "./Room/Components/AddRoom";
import EditRoom from "./Room/Components/EditRoom";
import { getRooms, updateRoom, getSpecRoom, addRoom } from "./Room/util";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/hotels",
        element: <Hotel />,
        loader: getHotel,
      },
      {
        path: "/hotel/:hotelId",
        element: <EditHotel />,
        loader: getSpecificHotel,
      },
      {
        path: "/add_hotel",
        element: <AddHotel />,
      },
      // room_type related paths
      {
        path: "/room_type",
        element: <TypeRoom />,
        loader: getRoomTypes,
      },
      {
        path: "/add_roomType",
        element: <AddRoomType />,
      },
      {
        path: "/type/:typeId",
        element: <EditType />,
        loader: getSpecificType,
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
        action: addRoom,
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
        loader: getUsers,
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
        action: addUser,
      },
    ],
  },
]);

export default router;
