import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import React, {Suspense} from 'react';
import Signup from './components/Signup';
import Login from "./components/Login";
import PageNotFound from "./components/PageNotFound"
import Home from "./components/Home"
import Search from "./components/Search"
import CakeDetail from "./components/CakeDetail";
import Navbar from "./components/Navbar";
import Checkout from "./components/Checkout";
import {toast} from 'react-toastify'
import axios from "axios";
import Orders from './components/Orders';
import admin from './components/admin';

var Cart = React.lazy(() => import('./components/Cart'))

Cart = <Suspense fallback={<div>Loading...</div>}><Cart/></Suspense>


function App() {

  if(localStorage.token) {
    var userToken = localStorage.token
    var getUserUrl  = process.env.REACT_APP_BASE_URL+"/getuserdetails"
    axios({
      method:"get",
      url:getUserUrl,
      headers:{
        authtoken:userToken
      }
    }).then((response) => {
      toast.success(response);
    },(error) =>{
        toast.error(error);
      })
    }

  axios.interceptors.request.use((request) => {
      request.headers["authtoken"] = localStorage.getItem('token')
      return request
  })

  return (
    <Router>
      <div className="App">
      <Navbar/>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/signin" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/cake/:cakeid" component={CakeDetail} />
            <Route exact path="/cart">{Cart}</Route>
            <Route path="/checkout" component={Checkout} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/orders" component={Orders} />
            <Route exact path="/admin" component={admin} />
            <Route exact path="/*" component={PageNotFound} />
            <Redirect to="/"></Redirect>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
