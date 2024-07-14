import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const PersonalInfoViewField = ({ data }) => {
  const {
    personalInfo,
    address,
    contactInfo,
    citizenshipStatus,
    reference,
    documents,
    visaStatus,
    registrationToken,
    username,
    email,
    role,
    emergencyContacts,
    createdAt,
    updatedAt,
  } = data;

  return (
    <Container>
      <h1>Personal Information</h1>
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
              <strong>Date of Birth:</strong> {personalInfo.dateOfBirth}
            </Col>
          </Row>
          <Row>
            <Col>
              <strong>Gender:</strong> {personalInfo.gender}
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
            <Col>
              <strong>Citizenship Type:</strong>{" "}
              {citizenshipStatus.citizenshipType}
            </Col>
          </Row>
          <Row>
            <Col>
              <strong>Visa Title:</strong> {citizenshipStatus.visaTitle}
            </Col>
            <Col>
              <strong>Work Authorization Type:</strong>{" "}
              {citizenshipStatus.workAuthorizationType}
            </Col>
          </Row>
          <Row>
            <Col>
              <strong>Start Date:</strong> {citizenshipStatus.startDate}
            </Col>
            <Col>
              <strong>End Date:</strong> {citizenshipStatus.endDate}
            </Col>
          </Row>
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
              <strong>Driver's License:</strong> {documents.driverLicense}
            </Col>
            <Col>
              <strong>Work Authorization:</strong> {documents.workAuthorization}
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Body>
          <h2>Visa Status</h2>
          <Row>
            <Col>
              <strong>Current Document:</strong> {visaStatus.currentDocument}
            </Col>
          </Row>
          <Row>
            <Col>
              <strong>OPT Receipt:</strong>{" "}
              {visaStatus.documents.optReceipt.file}
            </Col>
            <Col>
              <strong>Status:</strong> {visaStatus.documents.optReceipt.status}
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
              <strong>Feedback:</strong> {visaStatus.documents.optEAD.feedback}
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
              <strong>Feedback:</strong> {visaStatus.documents.i983.feedback}
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

export default PersonalInfoViewField;
