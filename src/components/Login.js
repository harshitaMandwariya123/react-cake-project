import { useState } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import {toast} from 'react-toastify'
toast.configure()

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
        axios({method:"POST", url:"https://apibyashu.herokuapp.com/api/login", data:{email:inputs.email, password:inputs.password}})
        .then((response) => {
            console.log(response);
            if(response.data.token) {
                toast.success("Logged in Successfully");
                localStorage.setItem('name',response.data.name);
                localStorage.setItem('loggedin',true);
                props.history.push("/");
            } else {
                toast.error("Invalid Credentials");
            }
        },(error) => {
            toast.error("Some Error Occured");
        })
	}

    return (
        <form className="container mt-3" onSubmit={onSubmitHandler}  data-parsley-validate="">
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
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block">Submit</button>
            <p className="text-right">
                <a href="#">Forget password?</a>
            </p>
            <p className="text-left">
                <Link to="/signup">Don't have account? Signup</Link>
            </p>
        </form>
    );
}

Login = withRouter(Login)
export default Login;