import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import App from "./App";
import reducers from "./reducers";
import './index.css';

const store = createStore(reducers, applyMiddleware(thunk));

export const AppWithStore = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

render(
  <Provider store={store}>
    <AppWithStore />
  </Provider>,
  document.getElementById("root")
);
