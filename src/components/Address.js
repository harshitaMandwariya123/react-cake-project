import {Component} from "react";
import { withRouter } from "react-router-dom";

class Address extends Component {

    constructor(props){
        super(props)
        this.state = {
            name:'',
            phone:'',
            address:'',
            city:'',
            pincode:'',
            FormError:'',
            };
        }
        
    handleInputChange=(e)=>{
        this.setState({[e.target.name]: e.target.value },() => { this.validateForm() })
    }

    handleInputSubmit=(e)=>{
        e.preventDefault();
        this.props.click(this.state) ; 
        this.props.history.push('/checkout/confirm');
    }
        
    validateForm=()=>{
        return this.state.name !=="" && this.state.phone !==""  && this.state.city !==""  && this.state.address !==""  && this.state.total_price !==""  && this.state.phone !==""  ;
    }
    
    render(){
            return(
                <>
                    <div className="card" style={{minWidth: '1000px'}}>
                        <div className="form-title text-center"> <strong> Your Details</strong> </div>
                        <form className="address-details" onSubmit={this.handleInputSubmit} id="form" data-parsley-validate>
                            <div className="form-group">
                                <label htmlFor="address_name">Name</label>
                                <input type="text" className="form-control" id="address_name" name="name" value={this.state.name} onChange={this.handleInputChange} aria-describedby="emailHelp" placeholder="Enter your name"/>
                            
                            </div>
                            <div className="form-group">
                                <label htmlFor="address_address">Address</label>
                                <input type="text" className="form-control" id="address_address"  name="address"  onChange={this.handleInputChange} aria-describedby="addressHelp" value={this.state.address} placeholder="Enter your address"/>
                                
                            </div>
                            <div className="form-group">
                                <label htmlFor="address_phone">Phone</label>
                                <input type="text" className="form-control" id="address_phone" name="phone"  onChange={this.handleInputChange} aria-describedby="phoneHelp" value={this.state.phone} placeholder="Enter your phone"/>
                                
                            </div>
                            <div className="form-group">
                                <label htmlFor="address_city">City</label>
                                <input type="text" className="form-control" id="address_city"  name = "city"  onChange={this.handleInputChange} aria-describedby="cityHelp" value={this.state.city} placeholder="Enter your city"/>
                                
                            </div>
                            <div className="form-group">
                                <label htmlFor="address_pincode">Pincode</label>
                                <input type="text" className="form-control" id="address_pincode" name="pincode" onChange={this.handleInputChange}  aria-describedby="pincodeHelp" value={this.state.pincode} placeholder="Enter your pincode"/>
                                
                            </div>
                            <button type="btn" className="btn btn-primary" disabled={!this.validateForm()}>Place Order</button>
                        </form>
                    </div>
                </>
            )
    }
}

export default withRouter(Address)