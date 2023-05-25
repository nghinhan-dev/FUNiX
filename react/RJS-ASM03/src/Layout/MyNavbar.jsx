import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../Context/context";

export default function MyNavbar() {
  // !!! NavLink from "react-router-dom" NOT from"react-bootstrap"
  // const currentUser = useContext(Curre)
  // eslint-disable-next-line no-unused-vars
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  return (
    <Navbar className="fw-bold" sticky="top" expand="lg">
      <Container>
        <Row className="g-0 align-items-center w-100">
          <Col>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "active pe-5 nav-link" : "pe-5 nav-link"
                }
                style={({ isActive }) => {
                  return {
                    color: isActive ? "#dfb44f" : "#000",
                  };
                }}
              >
                Home
              </NavLink>
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  isActive ? "active nav-link" : "nav-link"
                }
                style={({ isActive }) => {
                  return {
                    color: isActive ? "#dfb44f" : "#000",
                  };
                }}
              >
                Shop
              </NavLink>
            </Navbar.Collapse>
          </Col>
          <Col className="d-flex justify-content-center">
            <Navbar.Brand className="fs-4">BOTIQUE</Navbar.Brand>
          </Col>
          <Col className="flex-row justify-content-end navbar-nav">
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? "active nav-link" : "nav-link"
              }
              style={({ isActive }) => {
                return {
                  color: isActive ? "#dfb44f" : "#000",
                };
              }}
            >
              <div className="d-flex align-items-center flex-row pe-5">
                <i className="fa-solid fa-cart-shopping pe-1"></i>
                <p className="d-none d-md-block">Cart</p>
              </div>
            </NavLink>

            {currentUser ? (
              <>
                <div className="d-flex  align-items-center flex-row">
                  <p className="pe-3">
                    Hello, {currentUser.email.split("@")[0]}
                  </p>
                  <i
                    style={{ color: "#dfb44f" }}
                    className="fa-solid fa-arrow-right-from-bracket icon-logout"
                    onClick={() => {
                      localStorage.setItem(
                        "CURRENT_USER",
                        JSON.stringify(null)
                      );
                      setCurrentUser(null);
                    }}
                  ></i>
                </div>
              </>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "active ps-1 nav-link " : "ps-1 nav-link "
                }
                style={({ isActive }) => {
                  return {
                    color: isActive ? "#dfb44f" : "#000",
                  };
                }}
              >
                <div className="d-flex  align-items-center flex-row ">
                  <i className="fa-solid fa-user pe-1"></i>
                  <p className="d-none d-md-block">Login</p>
                </div>
              </NavLink>
            )}
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}