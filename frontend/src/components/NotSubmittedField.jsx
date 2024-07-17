import React, { useState } from "react";
import { Form, Button, Row, Col, Container, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";

const NameField = ({ handleChange, formData }) => {
  return (
    <>
      <h2>Name Info</h2>
      <Form.Group controlId="firstName">
        <Form.Label>
          First Name
          <span style={{ color: "red" }}>*</span>
        </Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="lastName">
        <Form.Label>
          Last Name
          <span style={{ color: "red" }}>*</span>
        </Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="middleName">
        <Form.Label>Middle Name</Form.Label>
        <Form.Control
          type="text"
          name="middleName"
          value={formData.middleName}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="preferredName">
        <Form.Label>Preferred Name</Form.Label>
        <Form.Control
          type="text"
          name="preferredName"
          value={formData.preferredName}
          onChange={handleChange}
        />
      </Form.Group>
    </>
  );
};

const AddressField = ({ handleAddressChange, formData }) => {
  return (
    <>
      <h2>Current Address</h2>
      <Form.Group controlId="building">
        <Form.Label>
          Building/Apt #<span style={{ color: "red" }}>*</span>
        </Form.Label>
        <Form.Control
          type="text"
          name="building"
          value={formData.address.building}
          onChange={handleAddressChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="street">
        <Form.Label>
          Street Name<span style={{ color: "red" }}>*</span>
        </Form.Label>
        <Form.Control
          type="text"
          name="street"
          value={formData.address.street}
          onChange={handleAddressChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="city">
        <Form.Label>
          City<span style={{ color: "red" }}>*</span>
        </Form.Label>
        <Form.Control
          type="text"
          name="city"
          value={formData.address.city}
          onChange={handleAddressChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="state">
        <Form.Label>
          State<span style={{ color: "red" }}>*</span>
        </Form.Label>
        <Form.Control
          type="text"
          name="state"
          value={formData.address.state}
          onChange={handleAddressChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="zip">
        <Form.Label>
          ZIP<span style={{ color: "red" }}>*</span>
        </Form.Label>
        <Form.Control
          type="text"
          name="zip"
          value={formData.address.zip}
          onChange={handleAddressChange}
          required
        />
      </Form.Group>
    </>
  );
};

const PictureField = ({ handlePictureChange, formData, imagePreview }) => {
  return (
    <>
      <h2>Profile Picture</h2>
      <Form.Group controlId="profilePicture">
        <Form.Label>Profile Picture</Form.Label>
        <Form.Control
          type="file"
          name="profilePicture"
          onChange={handlePictureChange}
        />
      </Form.Group>
      {imagePreview && (
        <div>
          {/* <Image src={imagePreview} alt="Profile Preview" fluid /> */}
          <a href={imagePreview} download>
            Download Profile Picture
          </a>
        </div>
      )}
    </>
  );
};

const ReferenceField = ({ handleReferenceChange, formData }) => {
  return (
    <>
      <h2>Reference</h2>
      <Form.Group controlId="referenceFirstName">
        <Form.Label>
          First Name<span style={{ color: "red" }}>*</span>
        </Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          value={formData.reference.firstName}
          onChange={handleReferenceChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="referenceLastName">
        <Form.Label>
          Last Name<span style={{ color: "red" }}>*</span>
        </Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          value={formData.reference.lastName}
          onChange={handleReferenceChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="referenceMiddleName">
        <Form.Label>Middle Name</Form.Label>
        <Form.Control
          type="text"
          name="middleName"
          value={formData.reference.middleName}
          onChange={handleReferenceChange}
        />
      </Form.Group>
      <Form.Group controlId="referencePhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="text"
          name="phone"
          value={formData.reference.phone}
          onChange={handleReferenceChange}
        />
      </Form.Group>
      <Form.Group controlId="referenceEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.reference.email}
          onChange={handleReferenceChange}
        />
      </Form.Group>
      <Form.Group controlId="referenceRelationship">
        <Form.Label>
          Relationship<span style={{ color: "red" }}>*</span>
        </Form.Label>
        <Form.Control
          type="text"
          name="relationship"
          value={formData.reference.relationship}
          onChange={handleReferenceChange}
          required
        />
      </Form.Group>
    </>
  );
};

const EmergencyContactsField = ({
  handleEmergencyContactChange,
  addEmergencyContact,
  formData,
}) => {
  return (
    <>
      <h2>Emergency Contacts</h2>
      {formData.emergencyContacts.map((contact, index) => (
        <div key={index}>
          <h3>Contact {index + 1}</h3>
          <Form.Group controlId={`emergencyFirstName-${index}`}>
            <Form.Label>
              First Name<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={contact.firstName || ""}
              onChange={(e) => handleEmergencyContactChange(index, e)}
              required
            />
          </Form.Group>
          <Form.Group controlId={`emergencyLastName-${index}`}>
            <Form.Label>
              Last Name<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={contact.lastName || ""}
              onChange={(e) => handleEmergencyContactChange(index, e)}
              required
            />
          </Form.Group>
          <Form.Group controlId={`emergencyMiddleName-${index}`}>
            <Form.Label>Middle Name</Form.Label>
            <Form.Control
              type="text"
              name="middleName"
              value={contact.middleName || ""}
              onChange={(e) => handleEmergencyContactChange(index, e)}
            />
          </Form.Group>
          <Form.Group controlId={`emergencyPhone-${index}`}>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={contact.phone || ""}
              onChange={(e) => handleEmergencyContactChange(index, e)}
            />
          </Form.Group>
          <Form.Group controlId={`emergencyEmail-${index}`}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={contact.email || ""}
              onChange={(e) => handleEmergencyContactChange(index, e)}
            />
          </Form.Group>
          <Form.Group controlId={`emergencyRelationship-${index}`}>
            <Form.Label>
              Relationship<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="relationship"
              value={contact.relationship || ""}
              onChange={(e) => handleEmergencyContactChange(index, e)}
              required
            />
          </Form.Group>
        </div>
      ))}
      <Button variant="secondary" onClick={addEmergencyContact}>
        Add Emergency Contact
      </Button>
    </>
  );
};
const NotSubmittedField = ({
  formData,
  setFormData,
  handleChange,
  handleAddressChange,
  handleReferenceChange,
  handleEmergencyContactChange,
  addEmergencyContact,
  //   handleFileChange,

  handleSubmit,
}) => {
  console.log(formData);
  const { userInfo } = useSelector((state) => state.auth);
  //   const { email } = userInfo;
  const [imagePreview, setImagePreview] = useState(null);
  const [optPreview, setOptPreview] = useState(null);

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    setFormData({ ...formData, profilePicture: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    setFormData({
      ...formData,
      [name]: file,
    });
    setOptPreview(URL.createObjectURL(file));
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <NameField handleChange={handleChange} formData={formData} />
        <PictureField
          handlePictureChange={handlePictureChange}
          formData={formData}
          imagePreview={imagePreview}
        />
        <AddressField
          handleAddressChange={handleAddressChange}
          formData={formData}
        />
        <h2>Contact Info</h2>
        <Form.Group controlId="cellPhone">
          <Form.Label>
            Cell Phone Number<span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="cellPhone"
            value={formData.cellPhone}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="workPhone">
          <Form.Label>Work Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="workPhone"
            value={formData.workPhone}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>
            <strong>
              Email<span style={{ color: "red" }}>*</span>
            </strong>
          </Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            readOnly
          />
        </Form.Group>
        <Form.Group controlId="ssn">
          <Form.Label>
            SSN<span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="ssn"
            value={formData.ssn}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="dateOfBirth">
          <Form.Label>
            Date of Birth<span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="gender">
          <Form.Label>
            Gender<span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            as="select"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="do not wish to answer">Do not wish to answer</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="permanentResident">
          <Form.Label>
            <strong>
              Permanent resident or citizen of the U.S.?
              <span style={{ color: "red" }}>*</span>
            </strong>
          </Form.Label>
          <Form.Check
            type="radio"
            label="Yes"
            name="permanentResident"
            value="yes"
            checked={formData.permanentResident === true}
            onChange={() =>
              setFormData({ ...formData, permanentResident: true })
            }
            required
          />
          <Form.Check
            type="radio"
            label="No"
            name="permanentResident"
            value="no"
            checked={formData.permanentResident === false}
            onChange={() =>
              setFormData({ ...formData, permanentResident: false })
            }
          />
        </Form.Group>
        {formData.permanentResident && (
          <Form.Group controlId="citizenshipType">
            <Form.Label>Citizenship Type</Form.Label>
            <Form.Control
              as="select"
              name="citizenshipType"
              value={formData.citizenshipType}
              onChange={handleChange}
            >
              <option value="">Select...</option>
              <option value="Green Card">Green Card</option>
              <option value="Citizen">Citizen</option>
            </Form.Control>
          </Form.Group>
        )}
        {!formData.permanentResident && (
          <Form.Group controlId="workAuthorization">
            <Form.Label>Work Authorization</Form.Label>
            <Form.Control
              as="select"
              name="workAuthorization"
              value={formData.workAuthorization}
              onChange={handleChange}
            >
              <option value="">Select...</option>
              <option value="H1-B">H1-B</option>
              <option value="L2">L2</option>
              <option value="F1(CPT/OPT)">F1(CPT/OPT)</option>
              <option value="H4">H4</option>
              <option value="Other">Other</option>
            </Form.Control>
            {formData.workAuthorization === "F1(CPT/OPT)" && (
              <Form.Group controlId="optReceipt">
                <Form.Label>OPT Receipt</Form.Label>
                <Form.Control
                  type="file"
                  name="optReceipt"
                  onChange={handleFileChange}
                />
                {optPreview && (
                  <a href={optPreview} download>
                    Download Opt receipt
                  </a>
                )}
              </Form.Group>
            )}
            {formData.workAuthorization === "Other" && (
              <Form.Group controlId="visaTitle">
                <Form.Label>Visa Title</Form.Label>
                <Form.Control
                  type="text"
                  name="visaTitle"
                  value={formData.visaTitle}
                  onChange={handleChange}
                />
              </Form.Group>
            )}
            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
            </Form.Group>
          </Form.Group>
        )}
        <ReferenceField
          handleReferenceChange={handleReferenceChange}
          formData={formData}
        />
        <EmergencyContactsField
          handleEmergencyContactChange={handleEmergencyContactChange}
          addEmergencyContact={addEmergencyContact}
          formData={formData}
        />
        {/* <h2>Summary of Uploaded Files</h2>
        <ul>
          {formData.documents.profilePicture && <li>Profile Picture</li>}
          {formData.documents.driversLicense && <li>Driver’s License</li>}
          {formData.documents.workAuthorization && <li>Work Authorization</li>}
        </ul> */}
        <div>
          <Button type="submit">Submit</Button>
        </div>
      </Form>
    </Container>
  );
};

export default NotSubmittedField;
