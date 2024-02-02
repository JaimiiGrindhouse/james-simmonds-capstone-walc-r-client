import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../partials/_header.scss";
import Logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary nav">
      <Container className="container">
        <Navbar.Brand>
          <Link to="/home">
            <img className="Logo" src={Logo} />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to="/home" className="no-decoration">
                Home
              </Link>
            </Nav.Link>

            <NavDropdown title="Site Map" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Link to="/routeplanner" className="no-decoration">
                  Route Planner
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/santanderbikefinder" className="no-decoration">
                  Santander Cycle Hire
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/bikestorage" className="no-decoration">
                  Cycle Parking Finder
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link
                  to="https://github.com/JaimiiGrindhouse/james-simmonds-capstone-walc-r-client"
                  className="no-decoration"
                >
                  Git Hub
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Header;
