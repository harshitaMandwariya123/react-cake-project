import { Link, withRouter } from "react-router-dom";
import {toast} from 'react-toastify'
import {connect} from "react-redux"
import axios from "axios";
import { useEffect, useState } from 'react';

toast.configure()

let Navbar = (props) => {
    let searchString;
    const[searchresult, setSearchResult] = useState([]);

    let onClickSearchEvent = (event) => {
      event.preventDefault();

      if(searchresult !== "") {
        props.history.push("/search/?q=" +searchresult)
      } else {
        toast.warning("Please Enter Any Query String.");
      }

    }

    let getSearchText = (event) => {
      searchString = event.target.value;   
      setSearchResult(searchString);  
      if(event.target.value === "") {
        props.history.push("/")
      } 
    }

    let logout = ()=>{
      props.dispatch({
        type:"LOGOUT"
      })
      props.history.push('/')
    }    

    useEffect(() => {
      if (localStorage.token) {
          axios({
              url: process.env.REACT_APP_BASE_URL + '/cakecart',
              method: 'post',
              headers: {
                  authtoken: localStorage.getItem('token')
              }
          }).then(res => {
              const cakeList = res.data.data
              props.dispatch({
                  type: "SHOW_CART",
                  payload: {
                      data: cakeList.length
                  }
              })
          }, err => {
          })
      }
    }, [])

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/"><i className="fa fa-birthday-cake" aria-hidden="true"></i></Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/"><b>Cake N Back</b><span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link">Welcome  {localStorage.name && localStorage.name}</Link>
            </li>
          </ul>
          {props.loginstatus && <Link to ="/cart"><button class="btn btn-warning">
              <i style={{width:"25px"}} class="fa fa-shopping-cart" aria-hidden="true"></i></button>{props.totalItems}
          </Link>}&nbsp;&nbsp;
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={getSearchText}/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={onClickSearchEvent}>Search</button>&nbsp;&nbsp;
           {!props.loginstatus && <Link to="/signin" className="btn btn-primary">Login</Link>}
           {props.loginstatus && <button className="btn btn-primary" onClick={logout} type="button">Logout</button>}
           
          </form>
        </div>
      </nav>
    );
}

Navbar = withRouter(Navbar);
export default connect((state) => {
  console.log(state,"state");
  return {
    // username: state.AuthReducer.username,
    // loginstatus: state.AuthReducer.isloggedin,
    totalItems: state?.CartReducer.totalItems,
    username:state?.AuthReducer.username,
    loginstatus:state?.AuthReducer.isloggedin
  }
})(Navbar);