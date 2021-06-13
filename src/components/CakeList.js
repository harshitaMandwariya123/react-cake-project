import React, { useState } from "react";
import Cake from "./Cake";
import axios from "axios";
import { useEffect } from "react";
import Loader from "react-loader-spinner";
import {toast} from 'react-toastify'
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

function CakeList(){

    const[cakes, setCakes] = useState([])
    const[isLoading, setLoading] = useState(false)

    var apiurl = process.env.REACT_APP_BASE_URL+"/allcakes";

    useEffect (() => {
        setLoading(true);
        axios({method:"GET", url:apiurl, data:JSON})
        .then((response) => {
            setLoading(false);
            setCakes(response.data.data);
        },(error) => {
            toast.error(error);
        })
    },[])

    
    return(
        <div className="container">
            <div className="card-groups">
            {isLoading && ( <div style={{marginLeft:"450px"}}><Loader type="TailSpin" height={200} width={200} /></div>) }
                {cakes.map((value,index) => {
                    return(
                        <div key={index} className="col-4">
                            <Cake cake={value} key={index}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
  
}

export default connect() (withRouter(CakeList))