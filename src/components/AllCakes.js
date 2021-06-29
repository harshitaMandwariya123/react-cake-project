import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";

function AllCakes(props){
   
    if (!localStorage.token ||props.user_role!=="ashu.lekhi0540@gmail.com" && props.user_role !== "harshitamandwariya@gmail.com" ) {
        toast.warning("You don't have admin access")
        props.history.push('/signin')
    }

    var [isloading,setLoading]=useState(true)
    var [data, setData] = useState([])

    useEffect(()=>{
        axios({
            method:"get",
            url:process.env.REACT_APP_BASE_URL+"/allcakes",
            data:JSON
        }).then((response)=>{
            setData(response.data.data)
            setLoading(false)
        })
    },[])
   
    return(
        <>
            <div className="container card mt-5 p-5">
                <div className="table-responsive ">
                    <table className=" table table-striped">
                        <thead>
                            <tr>
                                <th className="text-center ">
                                    Cakes
                                </th>
                                <th className="text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {data.map((value,index)=>{
                            return (
                                <tr>
                                    <td >
                                        <div className="product-box " >
                                            <div className="product-image ml-4">
                                                <img src={value.image} alt="cake" height="100px" width="100px"/>
                                                <div className="d-inline-block">
                                                    <span className="d-block ml-5">
                                                        <small style={{fontFamily:"cursive",fontSize:"18px"}}> {value.name}</small>
                                                    </span>
                                                    <span  className="d-block ml-5">
                                                        <small style={{fontFamily:"cursive"}}>Rs {value.price} /-</small>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-center p-5">
                                        <div className="products-actions">
                                            <span><a href="/admin/cakes/update" ><button className="btn btn-primary"><i className="fa fa-wrench" aria-hidden="true"></i></button></a></span>
                                            <span><a href="/admin/cakes/delete" ><button className="btn btn-primary ml-5"><i className="fa fa-trash" aria-hidden="true"></i></button></a></span>
                                        
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
AllCakes = connect(
    function(state,props){
        return{
            user_role:state.AuthReducer?.user_role
        }
    }
)(AllCakes)

export default withRouter(AllCakes);