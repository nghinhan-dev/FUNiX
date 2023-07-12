import { createBrowserRouter } from "react-router-dom";
// routes
import Layout from "./Layout";
import AddProduct from "./AddProduct/AddProduct";
import { action as postNewBookAction } from "./AddProduct/action";
import Shop from "./Shop/Shop";
import { loader as bookListLoader } from "./Shop/loader";
import Detail from "./Detail/Detail";
import Edit from "./Detail/Edit";
import { action as editAction } from "./Detail/action";
import { loader as getSingleBook } from "./Detail/loader";
import Cart from "./Cart/Cart";
import { loader as cartLoader } from "./Cart/loader";
// util
import { action as addCart } from "./util/addCart";
import { action as delBook } from "./util/delBook";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Shop />,
        loader: bookListLoader,
        action: addCart,
      },
      {
        path: "/add-product",
        element: <AddProduct />,
        action: postNewBookAction,
      },
      {
        id: "id",
        path: "/:bookId",
        loader: getSingleBook,
        children: [
          {
            index: true,
            element: <Detail />,
            action: delBook,
          },
          {
            path: "edit",
            element: <Edit />,
            action: editAction,
          },
        ],
      },
      {
        path: "/cart",
        element: <Cart />,
        loader: cartLoader,
        action: addCart,
      },
    ],
  },
]);

export default router;
