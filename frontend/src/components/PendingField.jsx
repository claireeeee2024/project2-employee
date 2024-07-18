import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { BASE_URL } from "../constants";

const PendingField = ({ data }) => {
  const {
    personalInfo,
    address,
    contactInfo,
    citizenshipStatus,
    reference,
    documents,
    visaStatus,
    workAuthorization,
    username,
    email,
    role,
    emergencyContacts,
    createdAt,
    updatedAt,
  } = data;

  return (
    <Container>
      <h1>Onboarding Information</h1>
      <Card className="mb-3">
        <Card.Body>
          <h2>Personal Information</h2>
          <Row>
            <Col>
              <strong>First Name:</strong> {personalInfo.firstName}
            </Col>
            <Col>
              <strong>Last Name:</strong> {personalInfo.lastName}
            </Col>
          </Row>
          <Row>
            <Col>
              <strong>Middle Name:</strong> {personalInfo.middleName}
            </Col>
            <Col>
              <strong>Preferred Name:</strong> {personalInfo.preferredName}
            </Col>
          </Row>
          <Row>
            <Col>
              <strong>SSN:</strong> {personalInfo.ssn}
            </Col>
            <Col>
              <strong>Date of Birth:</strong>{" "}
              {personalInfo.dateOfBirth.split("T")[0]}
            </Col>
          </Row>
          <Row>
            <Col>
              <strong>Gender:</strong> {personalInfo.gender}
            </Col>
          </Row>
          <Row>
            <Col>
              <strong>Profile Picture:</strong>{" "}
              <a href={`${BASE_URL}/${personalInfo.profilePicture}`} download>
                profile picture
              </a>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Body>
          <h2>Address</h2>
          <Row>
            <Col>
              <strong>Building/Apt #:</strong> {address.building}
            </Col>
            <Col>
              <strong>Street:</strong> {address.street}
            </Col>
          </Row>
          <Row>
            <Col>
              <strong>City:</strong> {address.city}
            </Col>
            <Col>
              <strong>State:</strong> {address.state}
            </Col>
            <Col>
              <strong>ZIP:</strong> {address.zip}
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Body>
          <h2>Contact Information</h2>
          <Row>
            <Col>
              <strong>Cell Phone:</strong> {contactInfo.cellPhone}
            </Col>
            <Col>
              <strong>Work Phone:</strong> {contactInfo.workPhone}
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Body>
          <h2>Citizenship Status</h2>
          <Row>
            <Col>
              <strong>Permanent Resident:</strong>{" "}
              {citizenshipStatus.isPermanentResident ? "Yes" : "No"}
            </Col>
            {citizenshipStatus.isPermanentResident && (
              <Col>
                <strong>Citizenship Type:</strong>{" "}
                {citizenshipStatus.citizenshipType}
              </Col>
            )}
          </Row>
          <Row>
            {!citizenshipStatus.isPermanentResident &&
              citizenshipStatus.visaTitle && (
                <Col>
                  <strong>Visa Title:</strong> {citizenshipStatus.visaTitle}
                </Col>
              )}
            {!citizenshipStatus.isPermanentResident && (
              <Col>
                <strong>Work Authorization Type:</strong>{" "}
                {citizenshipStatus.workAuthorizationType}
              </Col>
            )}
          </Row>
          {!citizenshipStatus.isPermanentResident && (
            <Row>
              <Col>
                <strong>Start Date:</strong>{" "}
                {citizenshipStatus.startDate.split("T")[0]}
              </Col>
              <Col>
                <strong>End Date:</strong>{" "}
                {citizenshipStatus.endDate.split("T")[0]}
              </Col>
            </Row>
          )}
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Body>
          <h2>Reference</h2>
          <Row>
            <Col>
              <strong>First Name:</strong> {reference.firstName}
            </Col>
            <Col>
              <strong>Last Name:</strong> {reference.lastName}
            </Col>
          </Row>
          <Row>
            <Col>
              <strong>Middle Name:</strong> {reference.middleName}
            </Col>
            <Col>
              <strong>Phone:</strong> {reference.phone}
            </Col>
            <Col>
              <strong>Email:</strong> {reference.email}
            </Col>
          </Row>
          <Row>
            <Col>
              <strong>Relationship:</strong> {reference.relationship}
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Body>
          <h2>Documents</h2>
          <Row>
            <Col>
              <strong>Driver's License: </strong>
              <a href={`${BASE_URL}/${documents.driverLicense}`} download>
                driver license
              </a>
            </Col>
            {!citizenshipStatus.isPermanentResident &&
              citizenshipStatus.workAuthorizationType === "F1(CPT/OPT)" && (
                <Col>
                  <strong>Work Authorization: </strong>
                  <a
                    href={`${BASE_URL}/${documents.workAuthorization}`}
                    download
                  >
                    work authorization
                  </a>
                </Col>
              )}
          </Row>
        </Card.Body>
      </Card>
      {!citizenshipStatus.isPermanentResident &&
        citizenshipStatus.workAuthorizationType === "F1(CPT/OPT)" && (
          <Card className="mb-3">
            <Card.Body>
              <h2>Visa Status</h2>
              <Row>
                <Col>
                  <strong>Current Document:</strong>{" "}
                  {visaStatus.currentDocument}
                </Col>
              </Row>
              <Row>
                <Col>
                  <strong>OPT Receipt:</strong>{" "}
                  <a
                    href={`${BASE_URL}/${visaStatus.documents.optReceipt.file}`}
                    download
                  >
                    opt receipt
                  </a>
                </Col>
                <Col>
                  <strong>Status:</strong>{" "}
                  {visaStatus.documents.optReceipt.status}
                </Col>
                <Col>
                  <strong>Feedback:</strong>{" "}
                  {visaStatus.documents.optReceipt.feedback}
                </Col>
              </Row>
              <Row>
                <Col>
                  <strong>OPT EAD:</strong> {visaStatus.documents.optEAD.file}
                </Col>
                <Col>
                  <strong>Status:</strong> {visaStatus.documents.optEAD.status}
                </Col>
                <Col>
                  <strong>Feedback:</strong>{" "}
                  {visaStatus.documents.optEAD.feedback}
                </Col>
              </Row>
              <Row>
                <Col>
                  <strong>I-983:</strong> {visaStatus.documents.i983.file}
                </Col>
                <Col>
                  <strong>Status:</strong> {visaStatus.documents.i983.status}
                </Col>
                <Col>
                  <strong>Feedback:</strong>{" "}
                  {visaStatus.documents.i983.feedback}
                </Col>
              </Row>
              <Row>
                <Col>
                  <strong>I-20:</strong> {visaStatus.documents.i20.file}
                </Col>
                <Col>
                  <strong>Status:</strong> {visaStatus.documents.i20.status}
                </Col>
                <Col>
                  <strong>Feedback:</strong> {visaStatus.documents.i20.feedback}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )}

      <Card className="mb-3">
        <Card.Body>
          <h2>Emergency Contacts</h2>
          {emergencyContacts.length > 0 ? (
            emergencyContacts.map((contact, index) => (
              <Card key={index} className="mb-2">
                <Card.Body>
                  <Row>
                    <Col>
                      <strong>First Name:</strong> {contact.firstName}
                    </Col>
                    <Col>
                      <strong>Last Name:</strong> {contact.lastName}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <strong>Middle Name:</strong> {contact.middleName}
                    </Col>
                    <Col>
                      <strong>Phone:</strong> {contact.phone}
                    </Col>
                    <Col>
                      <strong>Email:</strong> {contact.email}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <strong>Relationship:</strong> {contact.relationship}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No emergency contacts provided.</p>
          )}
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Body>
          <h2>Account Information</h2>
          <Row>
            <Col>
              <strong>Username:</strong> {username}
            </Col>
            <Col>
              <strong>Email:</strong> {email}
            </Col>
            <Col>
              <strong>Role:</strong> {role}
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Body>
          <h2>Timestamps</h2>
          <Row>
            <Col>
              <strong>Created At:</strong>{" "}
              {new Date(createdAt).toLocaleString()}
            </Col>
            <Col>
              <strong>Updated At:</strong>{" "}
              {new Date(updatedAt).toLocaleString()}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PendingField;
