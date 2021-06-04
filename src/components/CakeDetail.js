import { useParams } from "react-router"
import Loader from "react-loader-spinner";
import axios from "axios";
import { useEffect, useState } from 'react';
import Navbar from "./Navbar";
import { Link } from "react-router-dom";


function CardDetails(props){
var [data,setData] = useState([]);
var [islodding,setLodding]=useState(true)
var params = useParams(props)

var apiurl=`https://apibyashu.herokuapp.com/api/cake/${params.cakeid}`

    useEffect(()=>{
        axios({method:"GET",url:apiurl,data:JSON}).then((response)=>{
            setData(response.data.data)
            setLodding(false)
        },(error)=>{
            setLodding(false)
        });
    
},islodding)

    return( 
        <>
            <Navbar/>
            {islodding &&  <Loader type="TailSpin" height={300} width={300} />}
            {!islodding && <div className="container ">
                <div className=" row card m-5">
                        <div className="card-block">
                            <div className="row">
                                <div className="col ">
                                    <img className="img-fluid carddetails mb-3"  src={data.image}  alt="image"/>
                                    <p className="card-text">{data.name}</p>
                                </div>
                                <div className="col">
                                <p className="card-text">{data.name}</p>
                                <p className="text " style = {{"color":"red"}}> Rs {data.price}</p>
                                <p className="card-text">{data.description}</p>
                                <Link className="nav-link" to="/">Go to Home</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>

    )
}
export default CardDetails
