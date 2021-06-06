import {useState} from "react"
import axios from "axios";
import { Link } from "react-router-dom";
import {toast} from 'react-toastify'
toast.configure()

let Signup = (props) =>  {

    const[name,setName] = useState();
    const[email,setEmail] = useState();
    const[password,setPassword] = useState();

    let changeNameHandler = (event) => {
		setName(event.target.value)
	}

	let changeEmailHandler = (event)=> { 
        setEmail(event.target.value)
	}
	
	let changePasswordHandler = (event) => {
        setPassword(event.target.value)
	}
	
    var apiurl = process.env.REACT_APP_BASE_URL+"/register";
    
	let onSubmitHandler = (event) => {
		event.preventDefault();
        axios({method:"POST", url:apiurl, data:{name:name, email:email, password:password}})
        .then((response) => {
            if(response.data.message === "User Registered") {
                toast.success("Registered Successfully");
                props.history.push("/signin");
            } else {
                toast.error("User Already Exists");
            }
        },(error) => {
            toast.error("Some Error Occured");
        })
	}
	
		return(
            <form className="container mt-3" onSubmit={onSubmitHandler} data-parsley-validate="">
				<h3>Register</h3>
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input type="name"
                        className="form-control" 
                        id="name"
                        placeholder="Enter Full Name"  
                        value={name} 
                        onChange={changeNameHandler}
						required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" 
                        className="form-control" 
                        id="email" aria-describedby="emailHelp" 
                        placeholder="Enter Email" 
                        value={email} 
                        onChange={changeEmailHandler}
						required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Enter Password"  
                        value={password} 
                        onChange={changePasswordHandler}
						required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <p className="text-left">
                    <Link to="/signin">Already have account? Login</Link>
                </p>
            </form>
		)
	}
	
export default Signup;