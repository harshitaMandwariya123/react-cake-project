function AuthReducer(state={
  isloggedin: localStorage.token?true:false,
  username: undefined,
  token: localStorage.token
}, action) {
    switch(action.type) {
        case "LOGIN" : {
            state = {...state}
            state.token = action.payload?.token
            state.username = action.payload?.username
            state.isloggedin = true
            return state
        }
        case "LOGOUT" : {
            state = {...state}
            localStorage.clear()
            state.isloggedin = false
            state.username = undefined
            return state
        }
        default :
        return state
    }
}
export default AuthReducer