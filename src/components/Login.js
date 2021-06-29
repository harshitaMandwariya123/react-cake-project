import { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import {toast} from 'react-toastify'
import {connect} from "react-redux";
import {loginmiddleware} from "../reduxstore/middlewares";

let Login = (props) => {

    const initialValues = {
        email:"",
        password:""
    }

    const [inputs, setInputs] = useState(initialValues)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs({ ...inputs, [name]: value });
    };

    let onSubmitHandler = (event) => {
		event.preventDefault();
        var middlefunction = loginmiddleware(inputs)
		props.dispatch(middlefunction)
	}

    return (
        <form className="container mt-3" onSubmit={onSubmitHandler}  data-parsley-validate>
            <h3>Login</h3>

            <div className="form-group">
                <label>Email address</label>
                <input type="email" name="email" className="form-control" placeholder="Enter email" value={inputs.email} onChange={handleChange} required/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" className="form-control" placeholder="Enter password" value={inputs.password} onChange={handleChange} required/>
            </div>

            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlhtmlFor="customCheck1">Remember me</label>
                </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block">Submit</button>
            <p className="text-left">
                <Link to="/signup">Don't have account? Signup</Link>
            </p>
        </form> 
    );
}

Login = connect(function(state,props){
  if(state.AuthReducer?.isloggedin === true){
      props.history.push("/")
  }else{
	  return {
		  isloading:state.AuthReducer?.isloading
	  }
  }
})(Login) 

export default withRouter(Login)