import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./store/reducers";
import thunk from "redux-thunk";
import { getFirestore, reduxFirestore } from "redux-firestore";
import { getFirebase, reactReduxFirebase } from "react-redux-firebase";
import { compose } from "redux";
import fbConfig from "./config/fbConfig";
const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk.withExtraArgument(getFirebase, getFirestore)),
    reduxFirestore(fbConfig),
    reactReduxFirebase(fbConfig)
  )
);
ReactDOM.render(
  <Provider store={store}>
    <App />{" "}
  </Provider>,
  document.querySelector("#root")
);
