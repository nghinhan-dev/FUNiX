import React from "react";
import ReactDOM from "react-dom/client";

import ReduxBasic from "./basic/ReduxBasic";
// redux
import { Provider } from "react-redux";
import store from "./basic/store/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ReduxBasic />
    </Provider>
  </React.StrictMode>
);
