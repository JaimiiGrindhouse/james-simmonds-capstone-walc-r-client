import "../partials/_imageGallery.scss";
import Hampstead from "../assets/images/Hampstead_heath.png";
import Westminster from "../assets/images/westminster.png";
import Walthamstow from "../assets/images/Walthamstow_wetlands.png";
import bike_safety from "../assets/images/bike_safety.png";
import { Link } from "react-router-dom";

function ImageGallery() {
  return (
    <>
      <div className="articles-title">FEATURED ARTICLES </div>
      <section className="image-gallery">
        <div class="gallery">
          <a target="_blank" href="img_5terre.jpg">
            <Link to="https://www.komoot.com/smarttour/10053018">
              <img
                className="gallery-image"
                src={Westminster}
                alt="The London eye"
                width="600"
                height="400"
              />
            </Link>
          </a>
          <div class="desc">Cycle the Mall Loop in Central London</div>
        </div>

        <div class="gallery">
          <Link to="https://www.goatsontheroad.com/hikes-near-london/">
            <img
              className="gallery-image"
              src={Hampstead}
              alt="Walkers on Hampstead Heath"
              width="600"
              height="400"
            />
          </Link>
          <div class="desc">10 Best Hikes near London</div>
        </div>

        <div class="gallery">
          <a target="_blank" href="img_lights.jpg">
            <Link to="https://www.alltrails.com/en-gb/trail/england/london/walthamstow-wetlands-and-banbury-reservoir-circular">
              <img
                className="gallery-image"
                src={Walthamstow}
                alt="Walthamstow Wetland Circular Route"
                width="600"
                height="400"
              />
            </Link>
          </a>
          <div class="desc">Walthamstow Wetlands Circular</div>
        </div>

        <div class="gallery">
          <a target="_blank" href="img_mountains.jpg">
            <Link to="https://lcc.org.uk/advice/bike-security/">
              <img
                className="gallery-image"
                src={bike_safety}
                alt="Bicycle being locked"
                width="600"
                height="400"
              />
            </Link>
          </a>
          <div class="desc">Stop your bike being stolen</div>
        </div>
      </section>
    </>
  );
}
export default ImageGallery;
