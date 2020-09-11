import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Test1: React.FC = () => <h1>TEST</h1>;
const Test2: React.FC = () => <h1>TEST2</h1>;

export const Main: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Test1} />
        <Route exact path="/test2" component={Test2} />
      </Switch>
    </Router>
  );
};
