import { Link } from "react-router-dom";

let Cart = (props) => {
  return(
    <> 
        <Link to="/checkout"><button style={{marginLeft:"80px",marginTop:"40px",marginBottom:"20px"}} 
            className="btn btn-success">Checkout</button></Link>
    </>)


}

export default Cart;