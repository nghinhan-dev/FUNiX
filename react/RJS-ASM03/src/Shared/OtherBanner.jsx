/* eslint-disable react/prop-types */
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function OtherBanner({ bigTitle, smallTitle, subName = "" }) {
  return (
    <div className="bg-light" id="other-banner">
      <Container>
        <Row>
          <Col>
            <h3>{bigTitle}</h3>
          </Col>
          <Col className="text-end">
            <p className="fs-5 opacity-75">
              <span className="opacity-100 fw-bold">{subName}</span>
              {smallTitle}
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
