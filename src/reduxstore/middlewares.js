import axios from "axios";
import {toast} from 'react-toastify'

export function loginmiddleware(inputs){
    var apiurl = process.env.REACT_APP_BASE_URL+"/login";

    return function(dispatch){
        dispatch({
            type:"LOGIN_STARTED"
        })
        axios({method:"POST", url:apiurl, data:{email:inputs.email, password:inputs.password}})
        .then((response) => {
        if(response.data.token) {
            toast.success("Logged in Successfully");
            localStorage.setItem('name',response.data.name);
            localStorage.setItem('token',response.data.token);
            localStorage.setItem('email',response.data.email);
            localStorage.setItem('userData', JSON.stringify(response.data))
            dispatch({
                type:"LOGIN",
                payload:{
                    token:localStorage.token,
                    username:localStorage.name,
                }
            })
        } else {
            toast.error("Invalid Credentials");
            }
            
        }, (err) => {
            dispatch({
                type: "LOGIN_FAIL"
            })
            toast.error(err);
        })
    }
}

export const addOneCartMiddleware = (data,cakes) => {
    return function (dispatch) {

        axios({
            url: process.env.REACT_APP_BASE_URL +'/addcaketocart', headers:{authtoken:localStorage.token},
            method: 'post',
            data: {cakeid: data.cakeid, image: data.image, name: data.name, price: data.price, weight: data.weight}
        }).then(res => {
            console.log(cakes);
            var cart = cakes
              const check_index = cart.findIndex(e => e.cakeid === data.cakeid)
                if (check_index !== -1) {
                cart[check_index].quantity++
              } 
              dispatch({
                type:"UPDATE_CART_ITEM",
                payload:cart,
                updatecart:true
             })
            toast.success("Added to Cart")
        }, err => {
            toast.error(err);
        })
    }
}

export const addCartMiddleware = (data) => {
    return function (dispatch) {
        axios({
            url: process.env.REACT_APP_BASE_URL +'/addcaketocart', headers:{authtoken:localStorage.token},
            method: 'post',
            data: {cakeid: data.cakeid, image: data.image, name: data.name, price: data.price, weight: data.weight}
        }).then(res => {
            dispatch({
                type: "ADDTOCART",
                payload: {
                    data: res.data.data
                }
            })
            dispatch({
                type: "UPDATE_CART",
            })
            toast.success("Added to Cart")
        }, err => {
            toast.error(err);
        })
    }
}

export const emptyCartMiddleware = () => {
    return function (dispatch) {
        axios({
            url: process.env.REACT_APP_BASE_URL + '/clearcart',headers:{authtoken:localStorage.token},
            method: 'post'
        }).then(res => {
            dispatch({
                type: 'EMPTY_CART',
                payload : {
                    data: res.data
                }
            })
            toast.success("Cart has been empty")
        }, err => {
            toast.error(err);
        })
    }
}

export const removeOneCakeFromCartMiddleware = (cakeId, cakes) => {
    return function (dispatch) {
        axios({
            url: process.env.REACT_APP_BASE_URL + '/removeonecakefromcart',headers:{authtoken:localStorage.token},
            method: 'post',
            data: {cakeid: cakeId}
        }).then(res => {
            var cart = cakes
            const check_index = cart.findIndex(e => e.cakeid === cakeId)
              if (check_index !== -1) {
              cart[check_index].quantity--
            } 
            dispatch({
              type:"UPDATE_CART_ITEM",
              payload:cart,
              updatecart:true
           })
            toast.success("One quantity has been removed")
        }, err => {
            toast.error(err);
        })
    }
}

export const removeCakeFromCartMiddleware = (cakeId, cakes) => {
    return function (dispatch) {
        axios({
            url: process.env.REACT_APP_BASE_URL + '/removecakefromcart',headers:{authtoken:localStorage.token},
            method: 'post',
            data: {cakeid: cakeId}
        }).then(res => {
            var cart = cakes
                cart.splice(cart.findIndex(e => e.cakeid === cakeId),1);
                dispatch({
                type:"UPDATE_CART_ITEM",
                payload:cart,
                updatecart:true
             })
             toast.success("Cake removed from cart")
        }, err => {
            toast.error(err);
        })
    }
}

export const placeOrderMiddleware = (data) => {
    return function (dispatch) {
        axios({
            url: process.env.REACT_APP_BASE_URL + '/addorder',
            method: 'post',
            data: data
        }).then(res => {
            dispatch({
                type: 'PLACE_ORDER',
                payload: {
                    data: res.data
                }
            })
            toast.success("Order Placed")
        }, err => {
            toast.error(err);
        })
    }
}