import { Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
const UnauthorizedScreen = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col className="my-4 mx-4 text-center">
          <i className="bi-person-lock" style={{ fontSize: "100px" }}></i>
          <h4 className="fw-bolder">
            Sorry, the requested source is not available for you
          </h4>
        </Col>
      </Row>
    </Container>
  );
};

export default UnauthorizedScreen;
