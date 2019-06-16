import React from 'react';
import logo from './logo2.png';
import './App.css';
import { Route, Link, Switch, BrowserRouter } from "react-router-dom";

import DwccAdmin from "./DwccAdmin";


function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <h2 className="App-title">Hasirudala DWCC</h2>
        <br/>
        <img src={logo} className="App-logo" alt="logo"/>
        <br/>
        <Link to="/admin/"><span className="App-link">React Admin</span></Link>
        <br/>
        <Link to="/abc/"><span className="App-link">Another Page</span></Link>
      </header>
    </div>
  );
}

const AnotherPage = () => <div>Another Page</div>;

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/admin" component={DwccAdmin}/>
      <Route exact path="/abc" component={AnotherPage}/>
    </Switch>
  </BrowserRouter>
);

export default App;