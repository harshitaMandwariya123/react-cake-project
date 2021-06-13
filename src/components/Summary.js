import {useEffect, useState} from "react";
import axios from "axios";
import {connect} from "react-redux";
import Cake from "./Cake";
import {withRouter} from "react-router-dom";

const Summary = (props) => {
    const [disableAddressLink, setDisableAddressLink] = useState(true)
    const [cakes, getCakes] = useState([]);

    let totalPrice = 0

    const activeNextUrl = () => {
        props.history.push('/checkout/address')
        setDisableAddressLink(false)
        props.onChange(disableAddressLink)
    }

    useEffect(() => {
        axios({
            url: process.env.REACT_APP_BASE_URL +'/cakecart', headers: {
                authtoken: localStorage.getItem('token')
            },
            method: 'post'
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
        }, err => {
        })
    }, [])

    return (
        <div className="container">
            <div className="row">
                {
                    cakes.map((each, index) => {
                        totalPrice += each.price
                        return (
                            <Cake cake={each} key={index} page="cart_summary"/>
                        )
                    })
                }
            </div>
            <div>
                <span style={{float: "left"}}>Total Price: Rs. {totalPrice} /-</span>
                <button className="btn btn-primary" style={{float: "right"}} onClick={activeNextUrl}>
                <span>
                    CONFIRM
                </span>
                </button>
            </div>
        </div>
    )
}

export default connect() (withRouter(Summary))