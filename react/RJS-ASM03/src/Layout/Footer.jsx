import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export default function Footer() {
  return (
    <div id="footer" className="bg-dark">
      <Container>
        <Row className="py-3 text-light">
          <Col className="d-flex flex-column">
            <p className="fw-semibold">CUSTOMER SERVICES</p>
            <a href="#">Help & Contact Us</a>
            <a href="#">Returns & Refunds</a>
            <a href="#">Online Stores</a>
            <a href="#">Terms & Conditions</a>
          </Col>
          <Col className="d-flex flex-column">
            <p className="fw-semibold">COMPANY</p>
            <a href="#">What We Do</a>
            <a href="#">Availabel Services</a>
            <a href="#">Latest Posts</a>
            <a href="#">FAQs</a>
          </Col>
          <Col className="d-flex flex-column">
            <p className="fw-semibold">SOCIAL MEDIA</p>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">Printerest</a>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
