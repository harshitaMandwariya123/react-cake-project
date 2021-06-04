import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Signup from './components/Signup';
import Login from "./components/Login";
import PageNotFound from "./components/PageNotFound"
import Home from "./components/Home"
import Search from "./components/Search"
import CakeDetail from "./components/CakeDetail";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/signin" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/cake/:cakeid" component={CakeDetail} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/*" component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
