import React from "react";
import ReactDOM from "react-dom/client";
// react-router-dom
import { RouterProvider } from "react-router-dom";
import router from "./router";
// css
import "./CSS/forms.css";
import "./CSS/main.css";
import "./CSS/product.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
