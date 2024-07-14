import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-3">
      <Container fluid>
        <Row className="align-items-center">
          <Col xs={12} md={4} className="text-md-start">
            <p className="mb-0">&copy;{currentYear} All Rights Reserved.</p>
          </Col>
          <Col xs={12} md={4} className="text-center">
            <a
              href="https://youtube.com"
              className="text-white me-3"
              aria-label="YouTube"
            >
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a
              href="https://twitter.com"
              className="text-white me-3"
              aria-label="Twitter"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a
              href="https://facebook.com"
              className="text-white"
              aria-label="Facebook"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
          </Col>
          <Col xs={12} md={4} className="text-md-end">
            <a href="/contact" className="text-white me-3">
              Contact us
            </a>
            <a href="/privacy" className="text-white me-3">
              Privacy Policies
            </a>
            <a href="/help" className="text-white">
              Help
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
