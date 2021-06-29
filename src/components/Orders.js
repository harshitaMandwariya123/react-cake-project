
import axios from 'axios';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';

function Orders(props){

    var [data,setData] = useState([])
    var [isloading,setLoading] = useState(false)

    useEffect(()=>{
        if(localStorage.token){
            setLoading(true);
            axios({method:"POST",
            url:process.env.REACT_APP_BASE_URL+"/cakeorders",
            data:JSON}).then((response)=>{
            setData(response.data.cakeorders)
            setLoading(false)
        },(error)=>{
            setLoading(false)
            toast.error(error)
        });
        }
        else{
            toast.warning("please login")
            props.history.push("/signin")
        }
    },[])

    return (
        <div className="container mt-5 p-2">
            <div className="card m-2">
                <div className="card-title">
                    <strong className="font-style-change"> Your Orders</strong>
                </div>
                <div className="card-body p-4 orders">
                    {data && data.length>0?
                    <>
                        {data.map((value,index) => {
                            return(
                                <div className="accordion" id={`accordionExample${index}`}>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id={`headingOne${index}`}>
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseOne${index}`} aria-expanded="true" aria-controls="collapseOne">
                                            <strong> Orders {value.orderid}</strong>
                                        </button>
                                        </h2>
                                        <div id={`collapseOne${index}`} className="accordion-collapse collapse show" aria-labelledby={`headingOne${index}`} data-bs-parent={`#accordionExample${index}`}>
                                            <div className="accordion-body">
                                                <table>
                                                    <tr>
                                                        <td>
                                                            {value.cakes.map((cakevalue,index)=>{
                                                                return(
                                                                <div className="image" key={index}>
                                                                    <div className="image-orders-zoom"> <Link to={`/cake/${cakevalue.cakeid}`}><img src={cakevalue.image} alt={cakevalue.name} height="20px" width="20px"/></Link></div>
                                                                    <div className="cake-order-details">
                                                                    <span><small style={{color:"#a3a314", fontSize:"20px"}}>{cakevalue.name}</small></span>
                                                                    <span> <small>Quantity : {cakevalue.quantity}</small> </span>
                                                                    <span> <small>Price : ₹{cakevalue.price}</small> </span>
                                                                    <span> <small>weight : {cakevalue.weight} kg</small> </span>
                                                                    </div>
                                                                </div>
                                                                )
                                                            })}
                                                        </td>
                                                        <td className="text-left p-4">
                                                            <div className="order-person-details d-inline-block">
                                                                <span>
                                                                <strong style={{textTransform:"uppercase"}}> {value.name}</strong> |<small className="order-date" value={value.orderdate}> {value.orderdate} </small>
                                                                </span>
                                                                <span>
                                                                    <small>contact: {value.phone}</small>
                                                                </span>
                                                                <span>
                                                                    <small>email: {value.email}</small>
                                                                </span>
                                                                <span>
                                                                <small>address:  {value.city} {value.address} {value.pincode}</small>
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="text-right">
                                                            <div className="order-payment-mode">
                                                                <span><strong>Payment mode:</strong> {value.mode}</span>
                                                                <span><strong>Total Amount:</strong> ₹ {value.price}</span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )
                            })
                        }
                    </>
                    :<center><img src="/order_empty.png" style={{width:'500px'}} alt="empty" />
                    <p>You have no orders. <Link to="/"><strong>Click here </strong></Link>to see Cakes</p></center>} 
                </div>
            </div>
        </div>
    )
}
export default connect()( withRouter(Orders))