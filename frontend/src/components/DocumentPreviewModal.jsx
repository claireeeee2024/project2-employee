import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export const DocumentPreviewModal = ({ show, onHide, document }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Document Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {document.file.endsWith('.pdf') ? (
          <embed src={document.file} type="application/pdf" width="100%" height="600px" />
        ) : (
          <img src={document.file} alt="Document Preview" style={{ maxWidth: '100%' }} />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
