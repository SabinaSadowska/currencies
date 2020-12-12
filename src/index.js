import React from "react";
import ReactDOM from "react-dom";
import Currencies from "./components/CurrenciesComponent/Currencies";
import { Provider } from "react-redux";
import configureStore from "./store";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Currencies />
  </Provider>,
  document.getElementById("root")
);
