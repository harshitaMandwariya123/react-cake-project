import {Link} from "react-router-dom"

function Cake(props) {
    return(
        <>
        <div className="card zoom" id={props.index}  style={{height:"26rem",width: "20rem",margin: "auto"}}>
        <Link to={'/cake/'+props.cake.cakeid}><img className="card-img-top img-fluid rounded image-size" src={props.cake.image} alt="Card image cap"/></Link>
            <div className="card-body">
                <h5 className="card-title">Name : {props.cake.name}</h5>
                <p className="card-text">Price : {props.cake.price}</p>
                    {props.cake.discount && <p className="card-text">Discount: {props.cake.discount}</p>}
            </div>
        </div>
        </>
    )
}

export default Cake