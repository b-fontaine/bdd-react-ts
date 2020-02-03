import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppRouter from "./router";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router>
    <AppRouter />
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();
