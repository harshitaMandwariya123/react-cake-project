import data from "./data";

function CakeList(){
    return (
        data.map((each,item) => {
            return  <div className="container" key={item}>
                        <div className="row" style={{"marginTop": "30px"}}>
                            <div className="card" style={{"width":"18rem"}}>
                                <img src={each.image} className="card-img-top" alt="..."/>
                                <div className="card-body">
                                    <h5 className="card-title">{each.name}</h5>
                                    <p className="card-text">{each.price}</p>
                                    <a href="#" className="btn btn-primary">View</a>
                                </div>
                            </div>
                        </div>
                    </div>
        })
    )
}

export default CakeList