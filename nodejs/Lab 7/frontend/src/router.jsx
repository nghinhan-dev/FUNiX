import { createBrowserRouter } from "react-router-dom";
// routes
import Layout from "./Layout";
import AddProduct from "./AddProduct/AddProduct";
import { action as postNewBookAction } from "./AddProduct/action";
import Shop from "./Shop/Shop";
import { loader as bookListLoader } from "./Shop/loader";
import Detail from "./Detail/Detail";
import { loader as getSingleBook } from "./Detail/loader";
import Cart from "./Cart/Cart";
// util
import { action as addCart } from "./util/addCart";

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
        path: "/:bookId",
        element: <Detail />,
        loader: getSingleBook,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);

export default router;
