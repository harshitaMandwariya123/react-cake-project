import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

const Address = (props) => {
    const [disablePaymentLink, setDisablePaymentLink] = useState(true)
    const [fullname, setFullName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [pincode, setPincode] = useState('')
    const [phone, setPhone] = useState('')

    const submitAddress = (event) => {
        event.preventDefault()
        const finalValue = fullname + '_' + address + '_' + city + '_' + pincode + '_' + phone
        props.onSubmit(finalValue)
        setDisablePaymentLink(false)
        props.onChange(disablePaymentLink)
    }

    return (
        <div className="container">
            <form onSubmit={submitAddress} data-parsley-validate="">
            <div className="form-group address">
                    <input required value={fullname} name='fullname' onChange={e => setFullName(e.target.value)} className="form-control" placeholder="Enter Your Fullname"/>
                </div>
                <div className="form-group address">
                    <input required value={address} name='address' onChange={e => setAddress(e.target.value)} className="form-control" placeholder="Enter Address"/>
                </div>
                <div className="form-group city">
                    <input required value={city} name='city' onChange={e => setCity(e.target.value)} className="form-control" placeholder="Enter City"/>
                </div>
                <div className="form-group pincode">
                    <input required value={pincode} name='pincode' onChange={e => setPincode(e.target.value)} className="form-control" placeholder="Enter Pin Code"/>
                </div>
                <div className="form-group phone">
                    <input required value={phone} name='phone' onChange={e => setPhone(e.target.value)} className="form-control" placeholder="Enter Phone"/>
                </div>
                <button className="btn btn-primary" style={{float: "right"}}>
                   Place Order
                </button>
            </form>
        </div>
    )
}

export default connect() (withRouter(Address))