import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";

export default function MyNavbar() {
  return (
    <Navbar className="fw-bold" sticky="top" bg="light" expand="lg">
      <Container>
        <Row className="py-2 g-0 align-items-center w-100">
          <Col>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <LinkContainer to="/">
                <Nav.Link className="pe-5">Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/shop">
                <Nav.Link>Shop</Nav.Link>
              </LinkContainer>
            </Navbar.Collapse>
          </Col>
          <Col className="d-flex justify-content-center">
            <Navbar.Brand className="fs-4">BOTIQUE</Navbar.Brand>
          </Col>
          <Col className="flex-row justify-content-end navbar-nav">
            <LinkContainer to="/cart">
              <Nav.Link className="d-flex align-items-center flex-row pe-5">
                <i className="fa-solid fa-cart-shopping pe-1"></i>
                <p className="d-none d-md-block">Cart</p>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link className="d-flex  align-items-center flex-row ">
                <i className="fa-solid fa-user pe-1"></i>
                <p className="d-none d-md-block">Login</p>
              </Nav.Link>
            </LinkContainer>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}
