import React from "react";
import "./App.css";
import { CircularProgress } from "@material-ui/core";

import AppBar from "./AppBar";

const App: React.FC = () => (
  <>
    <AppBar />
    <CircularProgress className="center" size="10vmax" />
  </>
);

export default App;
