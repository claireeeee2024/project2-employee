import { Row, Col } from "react-bootstrap";
const TokenInvalidScreen = () => {
  return (
    <Row className="justify-content-center">
      <Col className="my-4 mx-4 text-center">
        <i
          className="bi bi bi-exclamation-triangle-fill"
          style={{ fontSize: "100px" }}
        ></i>
        <p>The token provided is invalid or has expired.</p>
      </Col>
    </Row>
  );
};

export default TokenInvalidScreen;
