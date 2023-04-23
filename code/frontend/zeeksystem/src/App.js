import React from "react";
import "./App.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Registration from "./pages/Registration";
import ComponentLibery from "./pages/ComponentLibery";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Settings from "./pages/Setting";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/Registration">
            <Registration />
          </Route>
          <Route path="/Comp">
            <ComponentLibery />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/Search">
            <Search />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="*">
            <NoPage />
          </Route>
        </Switch>
      </Router>
    </RecoilRoot>
  );
}

export default App;
