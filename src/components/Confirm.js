function Confirm(props){
    return(
        <div>
        <center><h3>Confirm Details</h3></center>
        <div className="container ">
            <div className="card mb-3 cakeDetails" style={{minWidth: '700px'}}>
                <div className="row g-0">
                    <div className="col-md-12">
                        <div className="card-body">
                            <p className="card-text myClass2 head"> Name : <small className="text-muted">{props.data?.name}</small> </p>
                            <p className="card-text myClass2 head"> Phone Number: <small className="text-muted"> {props.data?.phone}</small> </p>
                            <p className="card-text myClass2 head"> Delivery Area:  <small className="text-muted"> {props.data?.address}</small> </p>
                            <p className="card-text myClass2 head"> Payment Mode : <small className="text-muted"> Cash on Delivery</small> </p>
                            <button className="button" style={{borderRadius:'0px'}} onClick={(e)=>props.click()}> Place order </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Confirm