import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./pages/browse/Browse";
import Search from "./pages/search/Search";
import Navbar from "./navbar/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "",
        element: <Browse />,
      },
      {
        path: "/search",
        element: <Search />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);