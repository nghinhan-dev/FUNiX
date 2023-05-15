import { createBrowserRouter } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import NoFound from "./components/quotes/noFound/NoFound";
import QuoteList from "./components/quotes/qList/QuoteList";
import { loader as allQuoteLoader } from "./components/quotes/qList/loader";
import QuoteForm from "./components/quotes/qForm/QuoteForm";
import { action as addQuoteAction } from "./components/quotes/qForm/action";
import QuoteItem from "./components/quotes/qItem/QuoteItem";
import { loader as singleQuoteLoader } from "./components/quotes/qItem/loader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <NoFound />,
    children: [
      {
        path: "",
        id: "all-quote",
        loader: allQuoteLoader,
        children: [
          {
            path: "all",
            element: <QuoteList />,
          },
          {
            path: "add",
            action: addQuoteAction,
            element: <QuoteForm />,
          },
        ],
      },

      {
        path: ":qouteId",
        loader: singleQuoteLoader,
        element: <QuoteItem />,
      },
    ],
  },
]);

export default router;
