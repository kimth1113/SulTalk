import React from "react";
import { Route, Switch } from "react-router-dom";
import ChatApp from "./containers/ChatApp";


const App = () => {
  return (
    <Switch>
      <Route path="/chat/:roomId" component={ChatApp} exact />
    </Switch>
  );
};

export default App;