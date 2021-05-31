import './App.css';
import CakeList from './components/CakeList';
import Cake from './components/Cake';
import Navbar from "./components/Navbar";
import Signup from './components/Signup';
import Slider from "./components/Slider";


var data = {
  shopName : "Cake N Bake"
}

function App() {

  return (
    <div className="App">
      <Navbar  details={data}>HM</Navbar>
      <Slider/>
      <CakeList/>
    </div>
  );
}

export default App;
