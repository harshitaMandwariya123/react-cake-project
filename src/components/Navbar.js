import { Link, withRouter } from "react-router-dom";
import { useState } from "react";
import {toast} from 'react-toastify'
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
      localStorage.clear();
      props.history.push("/signin")
    }    

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
          <Link to ="/cart"><button class="btn btn-warning">
              <i style={{width:"25px"}} class="fa fa-shopping-cart" aria-hidden="true"></i></button>
          </Link>&nbsp;&nbsp;
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={getSearchText}/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={onClickSearchEvent}>Search</button>&nbsp;&nbsp;
           {!localStorage.loggedin && <Link to="/signin" className="btn btn-primary">Login</Link>}
           {localStorage.loggedin && <button className="btn btn-primary" onClick={logout} type="button">Logout</button>}
          </form>
        </div>
      </nav>
    );
}

Navbar = withRouter(Navbar);
export default Navbar;