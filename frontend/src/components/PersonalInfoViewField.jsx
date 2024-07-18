import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { BASE_URL } from "../constants";
const PersonalInfoViewField = ({ data }) => {
  if (!data) return <div>loading</div>;
  const {
    personalInfo,
    address,
    contactInfo,
    citizenshipStatus,
    permanentResident,
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
              <strong>First Name:</strong> {data.firstName}
            </Col>
            <Col>
              <strong>Last Name:</strong> {data.lastName}
            </Col>
          </Row>
          <Row>
            <Col>
              <strong>Middle Name:</strong> {data.middleName}
            </Col>
            <Col>
              <strong>Preferred Name:</strong> {data.preferredName}
            </Col>
          </Row>
          <Row>
            <Col>
              <strong>SSN:</strong> {data.ssn}
            </Col>
            <Col>
              <strong>Date of Birth:</strong> {data.dateOfBirth.split("T")[0]}
            </Col>
          </Row>
          <Row>
            <Col>
              <strong>Gender:</strong> {data.gender}
            </Col>
          </Row>
          <Row>
            <Col>
              <strong>Profile Picture:</strong>{" "}
              <a href={`${BASE_URL}/${data.profilePicture}`} download>
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
              <strong>Cell Phone:</strong> {data.cellPhone}
            </Col>
            <Col>
              <strong>Work Phone:</strong> {data.workPhone}
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Body>
          <h2>Employment</h2>
          <Row>
            <Col>
              <strong>Permanent Resident:</strong>{" "}
              {permanentResident ? "Yes" : "No"}
            </Col>
            {permanentResident && (
              <Col>
                <strong>Citizenship Type:</strong> {data.citizenshipType}
              </Col>
            )}
          </Row>
          {!permanentResident && (
            <>
              <Row>
                <Col>
                  <strong>Visa Title:</strong> {data.visaTitle}
                </Col>
                <Col>
                  <strong>Work Authorization Type:</strong>{" "}
                  {data.workAuthorization}
                </Col>
              </Row>
              <Row>
                <Col>
                  <strong>Start Date:</strong> {data.startDate}
                </Col>
                <Col>
                  <strong>End Date:</strong> {data.endDate}
                </Col>
              </Row>
            </>
          )}
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
          <h2>Documents</h2>
          <Row>
            {documents.driverLicense && (
              <>
                <Col>
                  <strong>Driver's License:</strong>
                  <a href={`${BASE_URL}/${documents.driverLicense}`} download>
                    driver's license
                  </a>
                </Col>
              </>
            )}
            {documents.workAuthorization && (
              <>
                <Col>
                  <strong>Work Authorization:</strong>
                  <a
                    href={`${BASE_URL}/${documents.workAuthorization}`}
                    download
                  >
                    work authorization
                  </a>
                </Col>
              </>
            )}
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
