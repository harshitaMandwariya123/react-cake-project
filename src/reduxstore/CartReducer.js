function CartReducer(state={
    cart: [],
    totalItems: 0,
    success: false,
    removed: false,
    updatecart:false
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
            state["updatecart"] = action.updatecart
            return state
        }
        case "EMPTY_CART" : {
            state = {...state}
            state["updatecart"] = true
            state.cart = []
            return state
        }
        case "PLACE_ORDER" : {
            state = {...state}
            state["success"] = true
            return state
        }
        case "UPDATE_CART" : {
            state = {...state}
            state["updatecart"] = true
            return state
        }
        case "UPDATE_CART_ITEM" : {
            state = {...state}
            state["cart"] = action.payload
            state["updatecart"] = action.updatecart
            return state
        }
        default : return state
    }
}

export default CartReducer