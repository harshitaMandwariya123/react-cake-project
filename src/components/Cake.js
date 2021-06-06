import {Link} from "react-router-dom"

function Cake(props) {
    return(
        <>
            <div className="card border zoom m-5" style={{"width":" 20rem","height":"28rem","margin":"auto" }}>   
                 <Link to={'/cake/'+props.cake.cakeid}><img className="card-img-top img-fluid rounded image-size" src={props.cake.image} alt=""/>    
                </Link>

                <div className="card-body">
                    <h5 className="card-title">Name : {props.cake.name}</h5>
                    <p className="card-text">Price : {props.cake.price}</p>
                </div>
            </div>
        </>
    )
}

export default Cake