import data from "./data";

function Cake(props) {
    return(
        <div className="card mt-4" style={{width: "18rem"}} id={props.index}>
            <img className="card-img-top" src={props.cake.image} alt="Card cap" style={{maxHeight:"190px"}}/>
            <div className="card-body">
                <h5 className="card-title">Name : {props.cake.name}</h5>
                <p className="card-text">Price : {props.cake.price}</p>
                    {props.cake.discount && <p className="card-text">Discount: {props.cake.discount}</p>}
            </div>
        </div>
    )
}

export default Cake