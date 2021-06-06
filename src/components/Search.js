import querystring from "query-string";
import { useEffect, useState } from "react";
import axios from "axios";
import Cake from "./Cake";
import {toast} from 'react-toastify'

let Search = (props) => {

  const[search, setSearch] = useState([]);

  var query = querystring.parse(props.location.search)

  useEffect (() => {
      var apiurl = process.env.REACT_APP_BASE_URL+"/searchcakes?q="+query.q;

      axios({method:"GET", url:apiurl})
          .then((response) => {
            setSearch(response.data.data);
          },(error) => {
            toast.error(error);
          })
  },[query.q])

  return(
      <> 
      <div><b>Search Cakes for {query.q}</b>
        <div className="container">
          <div className="card-groups">
            { search.map((value, index) => {
              return ( 
                <div className="col-4">
                  <Cake cake={value} index ={index}></Cake> 
                </div>
              )
                })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Search

       