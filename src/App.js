import { useState } from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CakeList from './components/CakeList';
import Navbar from "./components/Navbar";
import Signup from './components/Signup';
import Slider from "./components/Slider";
import Login from "./components/Login";

function App() {

  const[login, setLogin] = useState(false);

  var data = {
    shopName : "Cake N Bake"
  }

  let myPhone = () => {
    setLogin(true);
  }

  return (
    <Router>
      <div className="App">
         <Navbar isLoggedIn={login} details={data}>HM</Navbar>
         <Slider/>
        <Switch>
            <Route exact path='/' component={() => (<div className="container mt-4">
              <div className="row">
                <CakeList/>
              </div>
            </div>)}/>
            <Route path="/signin" component={Login} />
            <Route path="/signup" component={() => (<Signup callme={myPhone} email={"hm@gmail.com"}/>)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
