import React from "react";
import ReactDOM from "react-dom/client";

// redux
import { Provider } from "react-redux";
import store from "./practiceOne/store/index";
// import store from "./basic/store/store";

// import ReduxBasic from "./basic/ReduxBasic";
import PracticeOne from "./practiceOne/PracticeOne";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PracticeOne />
    </Provider>
  </React.StrictMode>
);
