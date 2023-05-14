import { createBrowserRouter } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import NoQuotesFound from "./components/quotes/noFound/NoQuotesFound";
import QuoteList from "./components/quotes/qList/QuoteList";
import QuoteForm from "./components/quotes/qForm/QuoteForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <NoQuotesFound />,
    children: [
      {
        path: "all",
        element: <QuoteList />,
      },
      {
        path: "add",
        element: <QuoteForm />,
      },
    ],
  },
]);

export default router;
