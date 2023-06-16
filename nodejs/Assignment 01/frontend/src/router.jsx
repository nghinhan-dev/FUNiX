import { createBrowserRouter } from "react-router-dom";
import Browse from "./pages/browse/Browse";
import Search from "./pages/search/Search";
import Navbar from "./navbar/Navbar";
import ErrorPage from "./pages/error/error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <ErrorPage />,
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

export default router;
