import React from "react";
import "./App.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { RecoilRoot } from "recoil";
import Wallet from "./pages/Wallet";
import ScanVoucher from "./pages/ScanVoucher";

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
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/wallet">
            <Wallet />
          </Route>
          <Route path="/scanVoucher">
            <ScanVoucher />
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
