function CartReducer(state={
    cart: [],
    totalItems: 0,
    success: false
  }, action) {
    switch (action.type) {
        case "ADDTOCART" : {
            state = {...state}
            state.cart.push(action.payload?.data)
            state["totalItems"] += state.cart.length
            state["success"] = true
            return state
        }
        case "SHOW_CART" : {
            state = {...state}
            state["totalItems"] = action.payload?.data
            state["success"] = false
            return state
        }
        case "EMPTYCART" : {
            state = {...state}
            state.cart = []
            return state
        }
        case "REMOVEFROMCART" : {
            state = {...state}
            return state
        }
        default : return state
    }
}

export default CartReducer