import "../partials/_buttonsnavbar.scss";
import { Link } from "react-router-dom";

function ButtonsNavBar() {
  return (
    <>
      <section className="btn-nav">
        <article className="btn-nav_container">
          <Link className="btn-nav_container_btn" to="/home">
            <button>Home</button>
          </Link>
          <Link className="btn-nav_container_btn" to="/santanderbikefinder">
            <button>Santander</button>
          </Link>
          <Link className="btn-nav_container_btn" to="/routeplanner">
            <button>Routes</button>
          </Link>
          <Link className="btn-nav_container_btn" to="/bikestorage">
            <button>Storage</button>
          </Link>
        </article>
      </section>
    </>
  );
}

export default ButtonsNavBar;
