import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export default function Categories() {
  return (
    <>
      <Container className="text-center">
        <p className="fs-6 pt-5 opacity-75 text-uppercase">
          carefully created collections
        </p>
        <p className="fs-4 pb-5 text-uppercase">browse our categories</p>
        <Row className="flex-nowrap pb-5 justify-content-between">
          <Col className="img-wrap">
            <img
              className="img-fluid"
              src="./image/product_1.png"
              alt="product_1.png"
            />
          </Col>
          <Col className="img-wrap">
            <img
              className="img-fluid"
              src="./image/product_2.png"
              alt="product_2.png"
            />
          </Col>
        </Row>
        <Row className="flex-nowrap pb-5 justify-content-between">
          <Col className="img-wrap">
            <img
              className="img-fluid"
              src="./image/product_3.png"
              alt="product_3.png"
            />
          </Col>
          <Col className="img-wrap">
            <img
              className="img-fluid"
              src="./image/product_4.png"
              alt="product_4.png"
            />
          </Col>
          <Col className="img-wrap">
            <img
              className="img-fluid"
              src="./image/product_5.png"
              alt="product_5.png"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
