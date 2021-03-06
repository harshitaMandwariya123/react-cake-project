import { Link, withRouter } from "react-router-dom";
import {toast} from 'react-toastify'
import {connect} from "react-redux"
import axios from "axios";
import { useEffect, useState } from 'react';

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
          }).then(res => {
              const cakeList = res.data.data
              props.dispatch({
                  type: "SHOW_CART",
                  payload: {
                      data: cakeList
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
              <Link className="nav-link" to="/"><b>Cake N Bake</b><span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link">Welcome  {localStorage.name && localStorage.name}</Link>
            </li>
            {(props.user_role === "harshitamandwariya@gmail.com" || props.user_role === "ashu.lekhi0540@gmail.com") &&
              <>
                <div className="dropdown d-inline-block ">
                  <button className="btn btn-primary dropdown-toggle" style={{"marginRight":"13px"}} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="fa fa-user-md" aria-hidden="true"></i> Admin
                  </button>
                  <div className="dropdown-menu bg-dark" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" style={{color:"white"}} href="/admin/addcakes">Add New Cake</a>
                    <a className="dropdown-item" style={{color:"white"}} href="/admin/allcakes">view Cakes</a>
                  </div>
                </div> 
              </> }
          </ul>
          {props.loginstatus && <Link to ="/cart"><button className="btn btn-warning">
              <i style={{width:"25px"}} className="fa fa-shopping-cart" aria-hidden="true">{props.totalItems}</i></button>
          </Link>}&nbsp;&nbsp;
          {props.loginstatus &&<Link to="/orders"><button className="search btn btn-primary "style={{"marginRight":"13px"}}><i className="fa fa-shopping-bag" aria-hidden="true"></i></button></Link>}
          &nbsp;&nbsp;
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
  return {
    totalItems: state?.CartReducer.totalItems,
    username:state?.AuthReducer.username,
    loginstatus:state?.AuthReducer.isloggedin,
    user_role:state?.AuthReducer.user_role
  }
})(Navbar);