import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./MainLayout/MainLayout";

// HOTEL related routes
import Hotel from "./Hotel/Components/Hotel";
import AddHotel from "./Hotel/Components/AddHotel";
import EditHotel from "./Hotel/Components/EditHotel";
import {
  getSpecificHotel,
  getHotel,
  addHotel,
  updateHotel,
  delHotel,
} from "./Hotel/util";

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

import { login } from "./Login/util";

// Dashboard
import Dashboard from "./Dashboard/Dashboard";

// Transaction
import Transaction from "./Transaction/Transaction";
import { getTrans } from "./Transaction/util";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    action: login,
    children: [
      //index
      {
        index: true,
        element: <Dashboard />,
        loader: getTrans,
      },

      // hotel paths
      {
        path: "hotel",
        children: [
          {
            path: "",
            element: <Hotel />,
            loader: getHotel,
          },
          {
            path: ":hotelId/delete",
            action: delHotel,
          },
          {
            path: ":hotelId",
            element: <EditHotel />,
            loader: getSpecificHotel,
            action: updateHotel,
          },
          {
            path: "add_hotel",
            element: <AddHotel />,
            action: addHotel,
          },
        ],
      },

      // room_type paths
      {
        path: "room_type",
        children: [
          {
            path: "",
            element: <TypeRoom />,
            loader: getRoomTypes,
          },
          {
            path: "add_roomType",
            element: <AddRoomType />,
            action: addType,
          },
          {
            path: ":typeId",
            element: <EditType />,
            loader: getSpecificType,
            action: updateType,
          },
        ],
      },

      // room  paths
      {
        path: "rooms",
        children: [
          {
            path: "",
            element: <Room />,
            loader: getRooms,
          },
          {
            path: "add_room",
            element: <AddRoom />,
            action: addRoom,
          },
          {
            path: ":roomId",
            element: <EditRoom />,
            loader: getSpecRoom,
            action: updateRoom,
          },
          {
            path: ":roomId/delete",
            action: delRoom,
          },
        ],
      },

      // User related paths
      {
        path: "users",
        children: [
          {
            path: "",
            element: <User />,
            loader: getUsers,
          },
          {
            path: ":userId",
            element: <EditUser />,
            loader: getSpecificUser,
            action: updateUser,
          },
          {
            path: "add_user",
            element: <AddUser />,
            action: addUser,
          },
        ],
      },

      // Transactions related paths
      {
        path: "transactions",
        children: [
          {
            path: "",
            element: <Transaction />,
            loader: getTrans,
          },

          // {
          //   path: "add_user",
          //   element: <AddUser />,
          //   action: addUser,
          // },
        ],
      },
    ],
  },
]);

export default router;
