import {applyMiddleware, combineReducers, createStore} from "redux"
import AuthReducer from "./AuthReducer"
import CartReducer from "./CartReducer"
import thunk from 'redux-thunk'
import createSaga from "redux-saga"
import RootSaga from "./sagas";

let middleware = store => next => action => {
    next(action);
}
let sagaMiddleware = createSaga()

var reducers = combineReducers({AuthReducer, CartReducer})
let store = createStore(reducers, applyMiddleware(middleware,thunk,sagaMiddleware))

sagaMiddleware.run(RootSaga)

export default store