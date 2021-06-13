import {useState} from "react";
import {withRouter} from "react-router-dom";

const Confirm = (props) => {
    const [payment, setPayment] = useState(0)

    const activeNextUrl = () => {
        props.onSubmit(props.data)
        props.history.push('/checkout/confirm')
    }

    return (
        <div className="container">
            <div>
                <input type="radio" value={payment} name='payment' onChange={e => setPayment(1)} className="form-control"/>
                <button className="btn btn-primary" style={{float: "right"}} onClick={activeNextUrl}>
                <span>
                    Proceed
                </span>
                </button>
            </div>
        </div>
    )
}

export default withRouter(Confirm)