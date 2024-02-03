import "../partials/_buttonsnavbar.scss";
import { Link } from "react-router-dom";
import cycle_parking from "../assets/icons/cycle_parking.jpg";
import cycle_hire from "../assets/icons/bike_icon.png";
import sign_post from "../assets/icons/sign_post.jpg";
import home_icon from "../assets/icons/home_icon.jpg";

function ButtonsNavBar() {
  return (
    <>
      <section className="button-nav">
        <div className="buttons-container">
          <div className="buttons-container_build">
            <Link to="/home">
              <img className="buttons-container_build_img" src={home_icon} />
            </Link>
          </div>
          <div className="buttons-container_build">
            <Link to="/bikestorage">
              <img
                className="buttons-container_build_img"
                src={cycle_parking}
              />
            </Link>
          </div>
          <div className="buttons-container_build">
            <Link to="/routeplanner">
              <img className="buttons-container_build_img" src={sign_post} />
            </Link>
          </div>
          <div className="buttons-container_build santander">
            <Link to="/santanderbikefinder">
              <img className="buttons-container_build_img" src={cycle_hire} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default ButtonsNavBar;
