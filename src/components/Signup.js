import {Component} from "react"

class Signup extends Component {
	constructor(props) {
		super(props)
		this.emailError="";
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
		this.emailError=""
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
        this.emailError="";
		var inputEmail=this.state.email
		var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
		
		if(!inputEmail){
			this.emailError="Email is required Field"
		}else if(!pattern.test(inputEmail)){
			this.emailError="Invalid Email Format"
		}

		this.setState({
			emailError:this.emailError
		})
	}
	
	render(){
		return(
            <form className="container mt-3" onSubmit={this.onSubmitHandler}>
                <div className="form-group">
                    <label htmlFor="name">Enter Name</label>
                    <input type="name"
                        className="form-control" 
                        id="name" placeholder="name"  
                        value={this.state.name} 
                        onChange={this.changeNameHandler}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="text" 
                        className="form-control" 
                        id="email" aria-describedby="emailHelp" 
                        placeholder="Enter email" 
                        value={this.state.email} 
                        onChange={this.changeEmailHandler}
                    />
                    {this.emailError && <small id="emailError" className="form-text form-error">{this.emailError}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Password"  
                        value={this.state.password} 
                        onChange={this.changePasswordHandler}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
		)
	}
	
}

export default Signup;