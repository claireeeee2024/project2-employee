// src/components/RegistrationForm.js
import React, { useState } from "react";
import { useSendTokenMutation } from "../slices/hrApiSlice";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import { validateName, validateEmail } from "../utils/validation";
const RegistrationForm = ({ handleClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({});

  const [sendToken, { isLoading: isSending, error: sendTokenError }] =
    useSendTokenMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const formErrors = {
      name: validateName(name),
      email: validateEmail(email),
    };
    setErrors(formErrors);
    if (Object.keys(formErrors).some((key) => formErrors[key])) {
      return;
    }

    try {
      await sendToken({ name, email }).unwrap();
      setSuccess("Token sent successfully");
      setName("");
      setEmail("");
      setTimeout(() => {
        setSuccess("");
        handleClose();
      }, 1000);
    } catch (err) {
      // console.log(err);
      setError(
        sendTokenError?.data?.message ||
          sendTokenError?.error ||
          err.data?.error ||
          "Failed to send token"
      );
    }
  };

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid" className="text-end">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="email" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid" className="text-end">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button type="submit" disabled={isSending} className="mt-3 ">
            {isSending ? <Spinner animation="border" size="sm" /> : "send"}
          </Button>
        </div>
      </Form>
    </>
  );
};

export default RegistrationForm;
