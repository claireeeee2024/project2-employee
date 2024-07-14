import React, { useState } from "react";
import { Container, Button, Modal, Row, Col } from "react-bootstrap";
import RegistrationForm from "../../components/RegistrationForm";
import RegistrationHistory from "../../components/RegistrationHistory";
import Loader from "../../components/Loader";
import "./index.css";
const RegistrationManagementScreen = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col md={9}>
          <h3 className="fw-semibold">Registration History</h3>
        </Col>
        <Col>
          <Button
            variant="primary"
            onClick={handleShow}
            className="generate-token-btn"
          >
            <span className="d-none d-md-inline">
              Generate token and send email
            </span>
            <span className="d-inline d-md-none">
              <i className="bi bi-envelope-plus"></i>
            </span>
          </Button>
        </Col>
      </Row>
      <RegistrationHistory />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Generate Token and Send Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegistrationForm handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default RegistrationManagementScreen;
