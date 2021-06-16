import {Link, withRouter} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Cake from "./Cake";
import {connect} from "react-redux";
import {toast} from 'react-toastify'
import {
    addOneCartMiddleware,
    removeCakeFromCartMiddleware,
    removeOneCakeFromCartMiddleware,
    emptyCartMiddleware
} from "../reduxstore/middlewares"

const Cart = (props) => {
    const cartEmpty = "/cart-empty.jpg"
    const [cakes, getCakes] = useState([]);
    let totalPrice = 0

    var addOneCakeToCart = (cakeId) => {
        props.dispatch(addOneCartMiddleware(cakeId,cakes))
    }

    var removeOneCakeFromCart = (cakeId) => {
        props.dispatch(removeOneCakeFromCartMiddleware(cakeId, cakes))
    }

    var removeCakeFromCart = (cakeId) => {
        props.dispatch(removeCakeFromCartMiddleware(cakeId, cakes))
    }

    var emptyCart = () => {
        props.dispatch(emptyCartMiddleware())
    }

    useEffect(() => {
        axios({
            url: process.env.REACT_APP_BASE_URL +'/cakecart',
            method: 'post',
        }).then(res => {
            if (res.data !== 'Session Expired') {
                const cakeList = res.data.data
                getCakes(cakeList);
                props.dispatch({
                    type: "SHOW_CART",
                    payload: {
                        data: cakeList
                    }
                })
            } else {
                props.history.push('/signin')
            }
        }, (err) => {
          toast.error(err);
        })
    }, [props.cart_update])

    return (

        <div style={{marginTop:"50px"}} className="container">
                            <h1>My Cake Cart</h1>

            { cakes.length == 0 || props.loginStatus == false  ?
            <div className="row"> 
                <div style={{marginTop:"50px",marginLeft:"300px"}}>
                    <img src = {cartEmpty} />
                </div>
            </div> : 
            <div className="row">
                <button className="btn btn-danger" onClick={emptyCart} style={{marginBottom:"30px",textAlign:"right"}}>
                    <span>
                        Empty Cart
                    </span>
                </button>
                <div className="col-md-12 border">
                    <table className="table">
                        <thead>
                            <tr>
                            <th style={{border: "none"}} scope="col">Image</th>
                            <th style={{border: "none"}} scope="col">Name</th>
                            <th  style={{border: "none"}} scope="col">Price</th>
                            <th  style={{border: "none"}} scope="col">Quantity</th>
                            <th  style={{border: "none"}} scope="col">Remove/Add Quantity</th>
                            <th style={{border: "none"}} scope="col">Action</th>
                            </tr>
                        </thead>
                    <tbody>
            {
                cakes.map((each , index) => {
                    totalPrice += each.price
                return(
                <tr>
                <th style={{border: "none"}} scope="row"><img style={{width:"100px",height:"100px"}} src={each.image} /></th>
                <td style={{border: "none"}}>{each.name}</td>
                <td style={{border: "none"}}><b>{each.price} INR</b></td>
                <td style={{border: "none"}}><b>{each.quantity}</b></td>
                 <td style={{border: "none"}}> <button className="btn btn-success" onClick={() => addOneCakeToCart(each)}>
                        <span>
                            +
                        </span>
                    </button>
                <button className="btn btn-warning" onClick={() => removeOneCakeFromCart(each.cakeid)}>
                    <span>
                        -
                    </span>
                </button>
                </td>
                <td style={{border: "none"}}><button onClick={() => removeCakeFromCart(each.cakeid)} type="button" className="btn btn-danger">Remove</button></td>
                </tr> 
                )
                
                })
                
                }
                
            
            </tbody>
            </table>
            </div>
            <div className="col-md-2">
            </div>
            <div style={{marginTop:"100px",height:"20%" }}className="col-md-4 border">
            <div style={{marginTop:"20px"}}><b>
            <p style={{float:"left"}}>Total</p>
            <p style={{float:"right"}}>{totalPrice} INR</p></b>
            </div>
            <Link to="/checkout"><button style={{marginLeft:"80px",marginTop:"40px",marginBottom:"20px"}} 
            className="btn btn-success">Checkout</button></Link>
            </div>
            </div>
            }
            </div>
    )
}

var cart = connect(function (state,props) {
    if (state.CartReducer.removed) {
        state.CartReducer.removed = false
    }
   return {
        cart_update:state.CartReducer?.updatecart
   }
}) (Cart)

export default (withRouter(cart))