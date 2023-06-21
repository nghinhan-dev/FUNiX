import React from "react";
import ReactDOM from "react-dom/client";

// redux
import { Provider } from "react-redux";
// import store from "./advanced/store/index";
import store from "./basic/store/store";

import ReduxBasic from "./basic/ReduxBasic";
// import PracticeOne from "./advanced/PracticeOne";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ReduxBasic />
    </Provider>
  </React.StrictMode>
);
