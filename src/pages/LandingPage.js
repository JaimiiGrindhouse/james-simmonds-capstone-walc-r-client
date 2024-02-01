import "../pages/LandingPage.scss";
import Logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

function LandingPage() {
  console.log(window.location.pathname);
  return (
    <>
      <section className="landing">
        <div className="landing-container">
          <div className="landing-container_logo">
            <img className="landing-container_logo" src={Logo} />
          </div>

          <div className="landing_button">
            <Link to="/home">
              <img />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default LandingPage;
