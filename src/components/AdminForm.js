import { withRouter } from "react-router-dom"
import AddCakeForm from "./AddCakeForm";
import AllProducts from "./AllProducts";

function Admin(){
    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-title text-center">
                    <p className="admin-main-title">Hi Admin</p>
                </div>
                <div className="card-body row">
                    <div className="col-md-5">
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne2">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne2" aria-expanded="true" aria-controls="collapseOne">
                                <p  className="admin-heading"> Add New Cakes</p>
                                </button>
                                </h2>
                                <div id="collapseOne2" className="accordion-collapse collapse " aria-labelledby="headingOne2" data-bs-parent="#accordionExample2">
                                    <div className="accordion-body">
                                        <AddCakeForm></AddCakeForm>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="accordion" id="accordionExample2">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse"        data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    <p className="admin-heading"> AllCakes</p>
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <div className="full-container">
                                            <AllProducts></AllProducts>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Admin)