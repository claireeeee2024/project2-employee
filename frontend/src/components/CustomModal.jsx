import { useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";

const CustomModal = ({ show, handleClose, handleSave, isUpdatingStatus }) => {
  const [status, setStatus] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackRequired, setFeedbackRequired] = useState(false);
  
  const handleStatusChange = (newStatus) => {
    if (newStatus === "Rejected") {
      setFeedbackRequired(true);
      setStatus(newStatus);
    } else if (newStatus === "Approved") {
      setFeedback("");
      setFeedbackRequired(false);
      setStatus(newStatus);
    }
  };
  const handleSubmit = () => {
    if (status === "Rejected" && !feedback) {
      return;
    }
    if (status === "Rejected" || status === "Approved")
      handleSave(status, feedback);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Application Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="status" className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option>Update the status</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </Form.Control>
        </Form.Group>
        {feedbackRequired && (
          <Form.Group controlId="feedback">
            <Form.Label>Feedback</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              isInvalid={!feedback}
            />
            {!feedback && (
              <Form.Control.Feedback type="invalid" className="text-end">
                Feedback is required to reject applications.
              </Form.Control.Feedback>
            )}
          </Form.Group>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          disabled={isUpdatingStatus}
          onClick={handleSubmit}
        >
          {isUpdatingStatus ? (
            <Spinner animation="border" size="sm" />
          ) : (
            "Save Changes"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
