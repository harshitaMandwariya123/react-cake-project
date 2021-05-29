import "../assests/slider.css";

let Slider = () => {
    return (
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/one.jpeg" className="d-block w-100 Coursel-img" alt="one.jpeg"/>
          </div>
          <div className="carousel-item">
            <img src="/two.jpeg" className="d-block w-100 Coursel-img" alt="two.jpeg"/>
          </div>
          <div className="carousel-item">
            <img src="/three.jpeg" className="d-block w-100 Coursel-img" alt="three.jpeg"/>
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    )
}

export default Slider;