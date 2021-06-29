function AuthReducer(state = {
  isloggedin: localStorage.token?true:false,
  username: undefined,
  token: localStorage.token,
  user_role:localStorage.email?localStorage.email:null,

}, action) {
    switch(action.type) {
        case "LOGIN" : {
            state = {...state}
            state.token = action.payload?.token
            state.username = action.payload?.username
            state.isloggedin = true
            state.user_role = action.payload?.user_role
            return state
        }
        case "LOGOUT" : {
            state = {...state}
            localStorage.clear()
            state.isloggedin = false
            state.username = undefined
            state.user_role = undefined
            return state
        }
        default :
        return state
    }
}
export default AuthReducer