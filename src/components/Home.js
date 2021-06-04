import CakeList from "./CakeList"
import Navbar from "./Navbar"
import Slider from "./Slider"

let Home = () => {
   return <>
        <Navbar>HM</Navbar>
         <Slider/> 
         <div className="container mt-2">
            <div className="row">
                <CakeList/>
            </div>
        </div>
    </>
}

export default Home;