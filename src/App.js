import { useState } from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CakeList from './components/CakeList';
import Navbar from "./components/Navbar";
import Signup from './components/Signup';
import Slider from "./components/Slider";
import Login from "./components/Login";
import PageNotFound from "./components/PageNotFound"
import Home from "./components/Home"

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/signin" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/*" component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
