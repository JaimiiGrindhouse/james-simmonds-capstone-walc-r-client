import "../partials/_buttonsnavbar.scss";
import { Link } from "react-router-dom";
import cycle_parking from "../assets/icons/cycle_parking.jpg";
import cycle_hire from "../assets/icons/bike_icon.png";

function ButtonsNavBar() {
  return (
    <>
      <section className="button-nav">
        <div className="button-container">
          <Link to="/bikestorage">
            <img className="button-img" src={cycle_parking} />
          </Link>
        </div>
        <div className="button-container">
          <Link to="/santanderbikefinder">
            <img className="button-img" src={cycle_hire} />
          </Link>
        </div>
        <div className="button-container">
          <Link to="/santanderbikefinder">
            <img className="button-img" src={cycle_hire} />
          </Link>
        </div>
      </section>
    </>
  );
}

export default ButtonsNavBar;
