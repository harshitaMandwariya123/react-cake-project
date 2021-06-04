import querystring from "query-string";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import Navbar from "./Navbar";


let Search = (props) => {

    const[search, setSearch] = useState([]);

    var query = querystring.parse(props.location.search)

    useEffect (() => {
        var apiurl = "https://apibyashu.herokuapp.com/api/searchcakes?q="+query.q;

        axios({method:"GET", url:apiurl})
           .then((response) => {
             setSearch(response.data.data);
           },(error) => {
             console.log(error);
           })
    })
   

    return(
       <> 
        <Navbar/>
            <div>Search Cakes for {query.q}
                { search.map((value, index) => {
                    return          <div className="container mt-4">
                    <div className="row">
                    <div className="card" style={{width: "17rem"}}>
                    <img style={{height: "13rem"}} className="card-img-top" src={value.image} alt="Card image cap" />
                    <div style={{textAlign:"center"}} className="card-body">
                    <h5 className="card-title">{value.name}</h5>
                    <Link to={'/cake/'+value.cakeid}><button style={{color:"white"}} className="btn btn-secondary">
                    <i className="fa fa-eye" aria-hidden="true"> View</i></button></Link>
                    </div></div></div>
             </div> 
        })}

         </div></>
    )
}

export default Search

       