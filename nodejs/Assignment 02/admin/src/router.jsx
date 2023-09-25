import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./MainLayout/MainLayout";

// HOTEL related routes
import Hotel from "./Hotel/Components/Hotel";
import AddHotel from "./Hotel/Components/AddHotel";
import EditHotel from "./Hotel/Components/EditHotel";
import { getSpecificHotel, getHotel, addHotel } from "./Hotel/util";

// USER related routes
import User from "./Users/Components/User";
import EditUser from "./Users/Components/EditUser";
import AddUser from "./Users/Components/AddUser";
import { getSpecificUser, updateUser, addUser, getUsers } from "./Users/util";

// TypeRoom related routes
import TypeRoom from "./TypeofRoom/Components/TypeRoom";
import AddRoomType from "./TypeofRoom/Components/AddRoomType";
import EditType from "./TypeofRoom/Components/EditType";
import {
  addType,
  getRoomTypes,
  getSpecificType,
  updateType,
} from "./TypeofRoom/util";

// Room related routes
import Room from "./Room/Components/Room";
import AddRoom from "./Room/Components/AddRoom";
import EditRoom from "./Room/Components/EditRoom";
import {
  getRooms,
  updateRoom,
  getSpecRoom,
  addRoom,
  delRoom,
} from "./Room/util";

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
        action: addHotel,
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
        action: addType,
      },
      {
        path: "/type/:typeId",
        element: <EditType />,
        loader: getSpecificType,
        action: updateType,
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
      {
        path: "/rooms/:roomId/delete",
        action: delRoom,
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
