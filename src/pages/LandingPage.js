import "../pages/LandingPage.scss";
import Logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import Enter from "../assets/icons/enter-button-icon.png";

function LandingPage() {
  console.log(window.location.pathname);
  return (
    <>
      <section className="landing">
        <div className="landing-container">
          <div className="landing-container_logo">
            <img className="landing-container_logo" src={Logo} />
          </div>

          <div className="landing-container_enter">
            <Link to="/home">
              <img className="landing-container_enter_button" src={Enter} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default LandingPage;
