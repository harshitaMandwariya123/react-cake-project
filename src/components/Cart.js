import {Link, withRouter} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Cake from "./Cake";
import {connect} from "react-redux";
import {toast} from 'react-toastify'

const Cart = (props) => {
    const [cakes, getCakes] = useState([]);
    let totalPrice = 0

    useEffect(() => {
        axios({
            url: process.env.REACT_APP_BASE_URL +'/cakecart',
            method: 'post',
            headers: {
                authtoken: localStorage.getItem('token')
            }
        }).then(res => {
            if (res.data !== 'Session Expired') {
                const cakeList = res.data.data
                getCakes(cakeList);
                props.dispatch({
                    type: "SHOW_CART",
                    payload: {
                        data: cakeList.length
                    }
                })
            } else {
                props.history.push('/login')
            }
        }, (err) => {
          toast.error(err);
        })
    }, [])

    return (
        <div className="container" style={{marginTop: "100px"}}>
            <h1>My Cart Items</h1>
            <div className="row">
                {
                  cakes.map((each, index) => {
                      totalPrice += each.price
                      return (
                        <div key={index} className="col-4">

                          <Cake cake={each} key={index} page="cart"/>
                        </div>
                      )
                  })
                }
            </div>
            <span style={{float : "left", marginTop : "31px"}}>
                <h5>Total Price: </h5> <span>Rs. {totalPrice}/-</span>
            </span>
            <span style={{float : "right", marginTop : "31px"}}>
                <Link to={'/checkout'} className="btn btn-primary">Checkout</Link>
            </span>
        </div>
    )
}

export default connect() (withRouter(Cart))