import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./Layout";
import AddProduct from "./AddProduct/AddProduct";
import { action as postNewBookAction } from "./AddProduct/action";
import Shop from "./Shop/Shop";
import { loader as bookListLoader } from "./Shop/loader";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./CSS/forms.css";
import "./CSS/main.css";
import "./CSS/product.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Shop />,
        loader: bookListLoader,
      },
      {
        path: "/add-product",
        element: <AddProduct />,
        action: postNewBookAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
