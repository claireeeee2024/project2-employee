import React, { useState, useEffect } from "react";
import { Container, Alert, Button, Form, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  useGetVisaStatusByIdQuery,
  useUpdateVisaStatusMutation,
  useUploadVisaDocumentMutation,
} from "../slices/usersApiSlice";
import {mapDocumentType} from "../utils/validation";
import { BASE_URL } from "../constants";

export const EmployeeVisaManagement = () => {
  const [file, setFile] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: visaStatus,
    isLoading,
    isError,
  } = useGetVisaStatusByIdQuery(userInfo._id);

  const [updateVisaStatus, { isLoading: isUpdating }] =
    useUpdateVisaStatusMutation();
  
  const [uploadVisaDocument, { isLoading: isUploading, error: uploadError }] = useUploadVisaDocumentMutation();

  const [currentStep, setCurrentStep] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (visaStatus) {
      setCurrentStep(visaStatus.visaStatus.currentDocument);
      updateMessage(visaStatus.visaStatus);
    }
  }, [visaStatus]);

  const updateMessage = (status) => {
    switch (status.currentDocument) {
      case "OPT Receipt":
        if (status.documents.optReceipt.status === "Pending") {
          setMessage("Waiting for HR to approve your OPT Receipt");
        } else if (status.documents.optReceipt.status === "Rejected") {
          setMessage(
            `Your OPT Receipt was rejected. Feedback: ${status.documents.optReceipt.feedback}`
          );
        } else if (status.documents.optReceipt.status === "Approved") {
          setMessage("Please upload a copy of your OPT EAD");
          setCurrentStep("OPT EAD");
        }
        break;
      case "OPT EAD":
        if (status.documents.optEAD.status === "Pending") {
          setMessage("Waiting for HR to approve your OPT EAD");
        } else if (status.documents.optEAD.status === "Rejected") {
          setMessage(
            `Your OPT EAD was rejected. Feedback: ${status.documents.optEAD.feedback}`
          );
        } else if (status.documents.optEAD.status === "Approved") {
          setMessage("Please download and fill out the I-983 form");
          setCurrentStep("I-983");
        }
        break;
      case "I-983":
        if (status.documents.i983.status === "Pending") {
          setMessage("Waiting for HR to approve and sign your I-983");
        } else if (status.documents.i983.status === "Rejected") {
          setMessage(
            `Your I-983 was rejected. Feedback: ${status.documents.i983.feedback}`
          );
        } else if (status.documents.i983.status === "Approved") {
          setMessage(
            "Please send the I-983 along with all necessary documents to your school and upload the new I-20"
          );
          setCurrentStep("I-20");
        }
        break;
      case "I-20":
        if (status.documents.i20.status === "Pending") {
          setMessage("Waiting for HR to approve your I-20");
        } else if (status.documents.i20.status === "Rejected") {
          setMessage(
            `Your I-20 was rejected. Feedback: ${status.documents.i20.feedback}`
          );
        } else if (status.documents.i20.status === "Approved") {
          setMessage("All documents have been approved");
        }
        break;
      default:
        setMessage("");
    }
  };

  const mapDocumentType = (documentType) => {
    const mapping = {
      "OPT Receipt": "optReceipt",
      "OPT EAD": "optEAD",
      "I-983": "i983",
      "I-20": "i20",
    };
    return mapping[documentType] || documentType;
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const uploadResult = await uploadVisaDocument(formData).unwrap();
      // update the visa status with the file path
      console.log("uploadResult", uploadResult);
      await updateVisaStatus({
        id: userInfo._id,
        documentType: currentStep,
        filePath: uploadResult.file,
      }).unwrap();

      setFile(null);
      setMessage("File uploaded successfully");
      // The query will automatically refetch due to invalidation
    } catch (err) {
      console.error("Failed to upload document", err);
      setMessage(`Upload failed: ${err.data?.message || "Unknown error"}`);
    }
  };

  const isAllDocumentsApproved = () => {
    if (!visaStatus) return false;
    const documents = visaStatus.visaStatus.documents;
    return ["optReceipt", "optEAD", "i983", "i20"].every(
      (docType) => documents[docType].status === "Approved"
    );
  };

  const renderDocumentList = () => {
    const documents = visaStatus.visaStatus.documents;
    return (
      <ListGroup className="mt-3">
        {Object.entries(documents).map(([docType, doc]) => (
          <ListGroup.Item key={docType}>
            {mapDocumentType(docType)}:{" "}
            {doc.file ? (
              <a href={BASE_URL + "/" + doc.file} target="_blank" rel="noopener noreferrer">
                View Document
              </a>
            ) : (
              "Not uploaded"
            )}
            {" - "}
            Status: {doc.status}
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <Alert variant="danger">Error loading visa status</Alert>;
  if (visaStatus?.citizenshipStatus?.workAuthorizationType !== 'F1(CPT/OPT)') {
    return <Alert variant="info">This page is only applicable for F1(CPT/OPT) visa holders.</Alert>;
  }

  return (
    <Container>
      <h1>My Visa Status</h1>
      {message && (message !== "") && <Alert variant="info">{message}</Alert>}

      {isAllDocumentsApproved() ? (
        <>
          {renderDocumentList()}
        </>
      ) : (
        <>
          {["OPT Receipt", "OPT EAD", "I-983", "I-20"].includes(
            currentStep
          ) && (
            <>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload {currentStep}</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
              </Form.Group>
              <Button
                onClick={handleUpload}
                disabled={
                  !file ||
                  visaStatus.visaStatus.documents[mapDocumentType(currentStep)]
                    .status === "Approved" ||
                  isUpdating
                }
              >
                {isUpdating ? "Uploading..." : "Upload"}
              </Button>
            </>
          )}

          {currentStep === "I-983" && (
            <div className="mt-3">
              <Button href="I-983.pdf" download className="me-2">
                Download Empty I-983 Template
              </Button>
              <Button href="Sample_I983.pdf" download>
                Download Sample I-983 Template
              </Button>
            </div>
          )}

          {renderDocumentList()}
        </>
      )}
    </Container>
  );
};
