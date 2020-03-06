import React, { useContext } from "react";
import { Switch, Route, Redirect, useParams } from "react-router-dom";
import { App } from "./app";

export default () => {
  return (
    <Switch>
      <Route exact path="/">
        <App />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
