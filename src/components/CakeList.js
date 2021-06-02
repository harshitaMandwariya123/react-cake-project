import React, { useState } from "react";
import Cake from "./Cake";
import axios from "axios";
import { useEffect } from "react";
import Loader from "react-loader-spinner";

function CakeList(){

    const[cakes, setCakes] = useState([])
    const[loading, setLoading] = useState(false)
    const style = {marginLeft:"450px"};

    useEffect (() => {
        setLoading(true);
        axios({method:"GET", url:"https://apibyashu.herokuapp.com/api/allcakes", data:JSON})
        .then((response) => {
            setLoading(false);
            setCakes(response.data.data);
        },(error) => {
            console.log(error);
        })
    },[])

    if (loading) return ( <div style={style}><Loader type="TailSpin" height={200} width={200} /></div>); 

    var cakeList = cakes.map((value,index) => {
		var cakeobj={name:value.name, image:value.image, price:value.price}
		return(
           
            <div key={index} className="col-3">
                 <Cake cake={cakeobj} index={index}/>
            </div>
           
	    )
    })
	return cakeList
}

export default CakeList