import CakeList from "./CakeList"
import Navbar from "./Navbar"
import Slider from "./Slider"

var data = {
    shopName : "Cake N Bake"
  }

let Home = () => {
   return <>
        <Navbar details={data}>HM</Navbar>
         <Slider/> 
         <div className="container mt-4">
            <div className="row">
                <CakeList/>
            </div>
        </div>
    </>
}

export default Home;