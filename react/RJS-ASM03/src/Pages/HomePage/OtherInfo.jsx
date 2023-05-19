import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export default function OtherInfo() {
  return (
    <>
      <Container className="py-5">
        <Row className="bg-light py-5">
          <Col className="text-center" style={{ fontSize: "18px" }}>
            <p className="text-uppercase fw-bold">free shipping</p>
            <p>Free shipping worldwide</p>
          </Col>
          <Col className="text-center" style={{ fontSize: "18px" }}>
            <p className="text-uppercase fw-bold">24x7 services</p>
            <p>Free shipping worldwide</p>
          </Col>
          <Col className="text-center" style={{ fontSize: "18px" }}>
            <p className="text-uppercase fw-bold">festival offer</p>
            <p>Free shipping worldwide</p>
          </Col>
        </Row>
        <Row className="py-5">
          <Col>
            <p className="fs-2">LET&apos;S BE FRIENDS</p>
            <p className="opacity-75">
              Nisi nisi tempor consequat laboris nini!
            </p>
          </Col>
          <Col className="d-flex align-items-center">
            <label
              className="subscribe-form form-label d-flex align-items-center"
              htmlFor="email"
            >
              <input
                className="form-control"
                type="email"
                placeholder="Enter your email address"
              />
              <button className="btn bg-black text-white">Subscribe</button>
            </label>
          </Col>
        </Row>
      </Container>
    </>
  );
}
