import {Link, Route} from "react-router-dom";
import Summary from "./Summary";
import Address from "./Address";
import Confirm from "./Confirm";

const Checkout = () => {
    return (
        <div className="container" style={{marginTop: "50px"}}>
            <h1>Checkout</h1>
            <div className="row" style={{marginTop: "50px"}}>
                <div className="card" style={{width: '18rem'}}>
                    <div className="card-body">
                        <p className="card-text text-justify"><Link to={'/checkout/summary'}>Order Summary</Link></p>
                        <p className="card-text text-justify"><Link to={'/checkout/address'}>Address Details</Link></p>
                        <p className="card-text text-justify"><Link to={'/checkout/confirm'}>Payment</Link></p>
                    </div>
                </div>
                <div className="card" style={{width: '50rem'}}>
                    <div className="card-body">
                        <Route exact path="/checkout/summary" component={Summary}>Order Summary</Route>
                        <Route exact path="/checkout/address" component={Address}>Address Details</Route>
                        <Route exact path="/checkout/confirm" component={Confirm}>Payment</Route>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout