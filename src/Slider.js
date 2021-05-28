import "./slider.css";

let Slider = () => {
    return (
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="/one.jpeg" class="d-block w-100 Coursel-img" alt="one.jpeg"/>
          </div>
          <div class="carousel-item">
            <img src="/two.jpeg" class="d-block w-100 Coursel-img" alt="two.jpeg"/>
          </div>
          <div class="carousel-item">
            <img src="/three.jpeg" class="d-block w-100 Coursel-img" alt="three.jpeg"/>
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    )
}

export default Slider;