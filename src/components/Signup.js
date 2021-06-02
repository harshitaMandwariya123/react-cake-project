import {useState} from "react"
import axios from "axios";

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
	
	let onSubmitHandler = (event) => {
		event.preventDefault();
		// props.callme();
        axios({method:"POST", url:"http://apibyashu.herokuapp.com/api/register", data:{name:name, email:email, password:password}})
        .then((response) => {
            console.log(response);
            if(response.data.message == "User Registered") {
                props.history.push("/signin");
            } else {
                alert(response.data.message)
            }
        },(error) => {
            console.log(error);
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
            </form>
		)
	}
	
export default Signup;