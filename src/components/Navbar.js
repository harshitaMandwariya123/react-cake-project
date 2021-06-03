import { Link } from "react-router-dom";

let Navbar = (props) => {
 
    let name = "Harshita Mandwariya";
    let getTargetValue;

    let onClickEvent = (event) => {
      event.preventDefault();
    }

    let getSearchText = (event) => {
      getTargetValue = event.target.value;      
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
              <Link className="nav-link" to="/"><b>{props.details.shopName}</b><span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link">Welcome {name} {props.children}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">Orders</Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Categories
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="#">Birthdays</Link>
                <Link className="dropdown-item" to="#">Anniversarys</Link>
                <Link className="dropdown-item" to="#">Other</Link>
              </div>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={getSearchText}/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={onClickEvent}>Search</button>
           {!props.isLoggedIn && <Link to="/signin" className="btn btn-primary">Login</Link>}
           {props.isLoggedIn && <button className="btn btn-primary">Logout</button>}
          </form>
        </div>
      </nav>
    );
}

export default Navbar;