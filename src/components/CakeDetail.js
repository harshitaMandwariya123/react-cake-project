import StarRatings from 'react-star-ratings';
import { useParams } from "react-router"
import Loader from "react-loader-spinner";
import axios from "axios";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import {connect} from "react-redux"

function CardDetails(props) {
    var [data,setData] = useState([]);
    var [islodding,setLodding] = useState(true)
    var params = useParams(props)

    var apiurl = process.env.REACT_APP_BASE_URL+'/cake/'+params.cakeid

    useEffect(()=>{
        axios({method:"GET",url:apiurl,data:JSON}).then((response)=>{
            setData(response.data.data)   
            setLodding(false)
        },(error)=>{
            setLodding(false)
        });
    },[params.cakeid])

    var addToCart = (cakeid,name,price,image,weight) => {
        if(localStorage.token) {
            var userToken = localStorage.token
            let addToCartUrl = process.env.REACT_APP_BASE_URL+"/addcaketocart"
            const data = {
                cakeid,
                name,
                image,
                price,
                weight
            }
        axios({method:"post", url:addToCartUrl, headers:{authtoken:userToken},data:data})
        .then((response) => {
                if(response.status = '200') {
                    toast.success("Added to cart..");
                    props.dispatch({
                        type:"ADDTOCART",
                        payload:response
                    })
                } else {
                    toast.error("Not added to cart...")
                }
        },(error) => { 
                toast.error("Error from addtocart api" , error)
            })
        } else {
            toast.warning("Please login first")
        }
    }

    return( 
        <>
            {islodding &&  <Loader type="TailSpin" height={300} width={300} />}
            {!islodding && <div className="container ">
                <div className="row card m-5">
                    <div className="card-block">
                        <div className="row">
                                <div className="col">
                                    <img className="img-fluid carddetails mb-3"  src={data.image}  alt=""/>
                                    <p className="card-text"><b>{data.name}</b></p>
                                    <button onClick={() => addToCart(data.cakeid,data.name,data.price,data.image,data.weight)} class="btn btn-success" type="button">
                                    <i className="fa fa-cart-plus" aria-hidden="true">Add to Cart</i></button>
                                    <Link className="nav-link" to="/">Go to Home</Link>
                                    <div class="card-footer text-muted"></div>
                                </div>
                                <div className="col">
                                    <p className="card-text"><b>{data.name}</b></p>
                                    <p className="text " style = {{"color":"red"}}> Rs {data.price}</p>
                                    <p className="card-text">{data.description}</p>
                                        <StarRatings
                                            rating={data.ratings}
                                            starRatedColor="yellow"
                                            numberOfStars={5}
                                            starDimension="25px"
                                            starSpacing="1px"
                                            name='rating'
                                        />
                                    <div className="col-lg-12"  style={{"marginTop":"50px" }}>
                                        <nav>
                                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                                <a className="nav-item nav-link active" id="nav-more-details-tab" data-toggle="tab" href="#nav-more-details" role="tab" aria-controls="nav-more-details" aria-selected="true">More Details</a>
                                                <a className="nav-item nav-link" id="nav-ingredients-tab" data-toggle="tab" href="#nav-ingredients" role="tab" aria-controls="nav-ingredients" aria-selected="false">Ingredients</a>
                                            </div>
                                        </nav>
                                        <div className="tab-content" id="nav-tabContent">
                                            <div className="tab-pane fade show active p-4 bg-white" id="nav-more-details" role="tabpanel" aria-labelledby="nav-more-details-tab">
                                                <p className="tag-section"><strong>Weight : </strong> {data.weight} Kg</p>
                                                <p className="tag-section"><strong>Flavour : </strong> {data.flavour}</p>
                                                <p className="tag-section"><strong>Occasion : </strong>{data.type}</p>
                                            </div>
                                            <div className="tab-pane p-4 fade bg-white" id="nav-ingredients" role="tabpanel" aria-labelledby="nav-ingredients-tab">
                                                <ul className="pl-3">
                                                {data.ingredients.map((value,index)=>{
                                                    return(
                                                    <li key={index}>{value}</li>
                                                    )   
                                                })}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>

    )
}
export default connect()(CardDetails);
