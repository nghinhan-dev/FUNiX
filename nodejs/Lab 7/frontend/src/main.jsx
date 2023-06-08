import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./Layout";
import AddProduct from "./AddProduct";
import Shop from "./Shop";
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
      },
      {
        path: "/add-product",
        element: <AddProduct />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
