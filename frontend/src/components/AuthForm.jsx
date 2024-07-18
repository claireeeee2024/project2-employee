import React from "react";
// import { Link, useLocation } from "react-router-dom";
import { Row, Col, Form, Button, Container, Card } from "react-bootstrap";
import {
  validatePassword,
  validateEmail,
  validateUsername,
} from "../utils/validation";

export const UsernameField = ({ username, setUsername, errors, setErrors }) => {
  const handleChange = (e) => {
    setErrors({ ...errors, username: validateUsername(e.target.value) });
    setUsername(e.target.value);
  };

  return (
    <Form.Group controlId="username" className="mb-3">
      <Form.Label>Username</Form.Label>
      <Form.Control
        type="username"
        placeholder="Enter username"
        value={username}
        onChange={handleChange}
        isInvalid={!!errors.username}
      />
      <Form.Control.Feedback type="invalid">
        {errors.username}
      </Form.Control.Feedback>
    </Form.Group>
  );
};
export const EmailField = ({ email, setEmail, errors, setErrors }) => {
  const handleChange = (e) => {
    setErrors({ ...errors, email: validateEmail(e.target.value) });
    setEmail(e.target.value);
  };

  return (
    <Form.Group controlId="email" className="mb-3">
      <Form.Label>Email</Form.Label>
      <Form.Control
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={handleChange}
        isInvalid={!!errors.email}
      />
      <Form.Control.Feedback type="invalid">
        {errors.email}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export const PasswordField = ({ password, setPassword, errors, setErrors }) => {
  const handleChange = (e) => {
    setErrors({ ...errors, password: validatePassword(e.target.value) });
    setPassword(e.target.value);
  };
  return (
    <Form.Group controlId="password" className="mb-3">
      <Form.Label>Password</Form.Label>
      <Form.Control
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={handleChange}
        isInvalid={!!errors.password}
      />
      <Form.Control.Feedback type="invalid">
        {errors.password}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

const AuthForm = ({
  mode,
  title,
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
  errors,
  setErrors,
}) => {
  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit(e);
  };
  return (
    <Container>
      <Row className="py-lg-3">
        <Col lg={5} sm={12} className="mx-auto">
          <Card className="shadow-lg mt-5">
            <Card.Body className="mt-4 mx-3">
              <Form onSubmit={submitHandler}>
                <h3 className="text-center mb-3">{title}</h3>

                {mode !== "sent-reset-email" && (
                  <UsernameField
                    username={username}
                    setUsername={setUsername}
                    errors={errors}
                    setErrors={setErrors}
                  />
                )}
                {mode === "register" && (
                  <EmailField
                    email={email}
                    setEmail={setEmail}
                    errors={errors}
                    setErrors={setErrors}
                  />
                )}

                {(mode === "login" || mode === "register") && (
                  <PasswordField
                    password={password}
                    setPassword={setPassword}
                    errors={errors}
                    setErrors={setErrors}
                  />
                )}
                {mode !== "sent-reset-email" ? (
                  <>
                    <div className="d-grid my-4">
                      <Button type="submit" variant="primary">
                        {mode === "login" && "Sign In"}
                        {mode === "register" && "Create Account"}
                        {mode === "update-password" && "Update Password"}
                      </Button>
                    </div>
                  </>
                ) : (
                  <Row className="justify-content-center">
                    <Col className="my-4 mx-4 text-center">
                      <i
                        className="bi bi-envelope-check"
                        style={{ fontSize: "100px" }}
                      ></i>
                      <p>
                        We have sent the update password link to your email,
                        please check that!
                      </p>
                    </Col>
                  </Row>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthForm;
