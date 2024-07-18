import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useUpdateVisaDocumentStatusMutation } from "../slices/hrApiSlice";
import { mapDocumentType } from "../utils/validation";
import { BASE_URL } from "../constants";

const VisaActionModal = ({ show, onHide, employee }) => {
  const [feedback, setFeedback] = useState("");
  const [updateVisaDocumentStatus] = useUpdateVisaDocumentStatusMutation();
  const [documentType, setDocumentType] = useState(
    mapDocumentType(employee?.visaStatus.currentDocument) || ""
  );

  const handleAction = async (status) => {
    await updateVisaDocumentStatus({
      id: employee._id,
      document: employee.visaStatus.currentDocument,
      status,
      feedback: status === "Rejected" ? feedback : "",
    });
    onHide();
  };

  const handlePreview = () => {
    const documentPath = employee.visaStatus.documents[documentType]?.file;
    if (documentPath) {
      let fullPath = `${BASE_URL}/${documentPath}`;
      window.open(fullPath, "_blank");
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Visa Document Action</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Employee: {employee?.personalInfo.firstName}{" "}
          {employee?.personalInfo.lastName}
        </p>
        <p>
          Current Document: {employee?.visaStatus.currentDocument}{" "}
          {employee?.visaStatus.documents[documentType]?.file ? (
            <Button variant="link" onClick={handlePreview}>
              Preview
            </Button>
          ) : (
            <Button variant="link" disabled>
              unable to preview
            </Button>
          )}
          {console.log(employee?.visaStatus.documents, documentType)}
        </p>
        <Form.Group>
          <Form.Label>Feedback (required for rejection)</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button
          variant="danger"
          onClick={() => handleAction("Rejected")}
          disabled={!feedback.trim()}
        >
          Reject
        </Button>
        <Button variant="success" onClick={() => handleAction("Approved")}>
          Approve
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VisaActionModal;
