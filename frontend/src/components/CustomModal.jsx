import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const CustomModal = ({ show, handleClose, handleSave }) => {
  const [status, setStatus] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackRequired, setFeedbackRequired] = useState(false);
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    if (newStatus === "Rejected") {
      setFeedbackRequired(true);
    } else {
      setFeedback("");
      setFeedbackRequired(false);
    }
  };
  const handleSubmit = () => {
    if (status === "Rejected" && !feedback) {
      return;
    }
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
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
