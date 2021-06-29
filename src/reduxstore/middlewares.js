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
                    user_role:localStorage.email
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
            url: process.env.REACT_APP_BASE_URL +'/addcaketocart',
            method: 'post',
            data: {cakeid: data.cakeid, image: data.image, name: data.name, price: data.price, weight: data.weight}
        }).then(response => {
            if(response.data.message === "Added to cart") {
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
            } else {
                toast.error(response.data.message);
            }
           
        }, err => {
            toast.error(err);
        })
    }
}

export const addCartMiddleware = (data) => {
    return function (dispatch) {
        axios({
            url: process.env.REACT_APP_BASE_URL +'/addcaketocart',
            method: 'post',
            data: {cakeid: data.cakeid, image: data.image, name: data.name, price: data.price, weight: data.weight}
        }).then(res => {
            if(res.data.message === "Added to cart") {
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
            } else {
                toast.error(res.data.message);
            }
        }, err => {
            toast.error(err);
        })
    }
}

export const emptyCartMiddleware = () => {

    return function (dispatch) {
        axios({
            url: process.env.REACT_APP_BASE_URL + '/clearcart',
            method: 'post'
        }).then(res => {
            if(res.data.message === "Removed all item from cart") {
                dispatch({
                    type: 'EMPTY_CART',
                    payload : {
                        data: res.data
                    }
                })
                toast.success("Cart has been empty")
            } else {
                toast.error(res.data.message);
            }
        }, err => {
            toast.error(err);
        })
    }
}

export const removeOneCakeFromCartMiddleware = (cakeId, cakes) => {
    return function (dispatch) {
        axios({
            url: process.env.REACT_APP_BASE_URL + '/removeonecakefromcart',
            method: 'post',
            data: {cakeid: cakeId}
        }).then(res => {
            if(res.data.message === "Removed item from cart") {
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
            } else {
                toast.error(res.data.message);
            }
        }, err => {
            toast.error(err);
        })
    }
}

export const removeCakeFromCartMiddleware = (cakeId, cakes) => {
    return function (dispatch) {
        axios({
            url: process.env.REACT_APP_BASE_URL + '/removecakefromcart',
            method: 'post',
            data: {cakeid: cakeId}
        }).then(res => {
            if(res.data.message === "Removed whole cake itme from cart") {
                var cart = cakes
                    cart.splice(cart.findIndex(e => e.cakeid === cakeId),1);
                    dispatch({
                    type:"UPDATE_CART_ITEM",
                    payload:cart,
                    updatecart:true
                })
                toast.success("Cake removed from cart")
            } else {
                toast.error(res.data.message);
            }
        }, err => {
            toast.error(err);
        })
    }
}

export const placeOrderMiddleware = (data,cart,price) => {
    return function (dispatch) {
        axios({
            url: process.env.REACT_APP_BASE_URL + '/addcakeorder',
            method: 'post',
            headers:{
                authtoken:localStorage.token
             },
            data:{
                address:data.address,
                city:data.city,
                pincode:data.pincode,
                phone:data.phone,
                name:data.name,
                price:price,
                cakes:cart
              }
        }).then(res => {
            if(res.data.message === "order placed") {
                dispatch({
                    type: 'PLACE_ORDER',
                    payload: {
                        data: res.data
                    }
                })
                toast.success("Order Placed")
            } else {
                toast.error(res.data.message)
            }
        }, err => {
            toast.error(err);
        })
    }
}