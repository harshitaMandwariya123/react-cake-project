import {Component} from "react"

class Signup extends Component {
	constructor(props) {
		super(props)
		this.state={
            name:"",
			email:"",
			password:"",
		}
	}

    changeNameHandler = (event) => {
		this.setState({
			name:event.target.value
		})
	}

	changeEmailHandler = (event)=> { 
		this.setState({
			email:event.target.value
		})
	}
	
	changePasswordHandler = (event) => {
		this.setState({
			password:event.target.value
		})
	}
	
	onSubmitHandler = (event) => {
		event.preventDefault();
		this.props.callme();
	}
	
	render(){
		return(
            <form className="container mt-3" onSubmit={this.onSubmitHandler} data-parsley-validate="">
				<h3>Sign Up</h3>
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input type="name"
                        className="form-control" 
                        id="name"
                        placeholder="Enter Full Name"  
                        value={this.state.name} 
                        onChange={this.changeNameHandler}
						required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" 
                        className="form-control" 
                        id="email" aria-describedby="emailHelp" 
                        placeholder="Enter Email" 
                        value={this.state.email} 
                        onChange={this.changeEmailHandler}
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
                        value={this.state.password} 
                        onChange={this.changePasswordHandler}
						required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
		)
	}
	
}

export default Signup;