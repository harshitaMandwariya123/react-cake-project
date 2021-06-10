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