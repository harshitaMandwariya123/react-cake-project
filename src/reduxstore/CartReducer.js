function CartReducer(state={
    cart: [],
    totalItems: 0,
    success: false,
    removed: false
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
            state.cart = action.payload?.data
            state["totalItems"] = action.payload?.data.length
            state["success"] = false
            return state
        }
        case "EMPTYCART" : {
            state = {...state}
            state["removed"] = true
            state.cart = []
            return state
        }
        case "REMOVEFROMCART" : {
            state = {...state}
            state["removed"] = true
            return state
        }
        case "PLACE_ORDER" : {
            state = {...state}
            state["success"] = true
            return state
        }
        default : return state
    }
}

export default CartReducer