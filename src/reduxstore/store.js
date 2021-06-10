import {applyMiddleware, combineReducers, createStore} from "redux"
import AuthReducer from "./AuthReducer"
import CartReducer from "./CartReducer"
import thunk from 'redux-thunk'

let middleware = store => next => action => {
    next(action);
}
var reducers = combineReducers({AuthReducer, CartReducer})
let store = createStore(reducers, applyMiddleware(middleware,thunk))

export default store