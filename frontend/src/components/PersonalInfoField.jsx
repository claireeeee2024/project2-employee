import React, { useState } from "react";
import { Form, Image, Button } from "react-bootstrap";
const NameField = ({
  handleChange,
  formData,
  handlePictureChange,
  imagePreview,
  email,
}) => {
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
      <Form.Group controlId="email">
        <Form.Label>
          <strong>
            Email<span style={{ color: "red" }}>*</span>
          </strong>
        </Form.Label>
        <Form.Control type="email" name="email" value={email} />
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

const ContactInfoField = ({ handleChange, formData }) => {
  return (
    <>
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
    </>
  );
};
const Employment = ({ handleChange, formData }) => {
  return (
    <>
      <h2>visa title</h2>
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
const PersonalInfoField = ({
  handleChange,
  handleAddressChange,
  handleEmergencyContactChange,
  addEmergencyContact,
  formData,
  setFormData,
  email,
  handleSubmit,
}) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profilePicture: file });
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <NameField
          handleChange={handleChange}
          formData={formData}
          handlePictureChange={handlePictureChange}
          imagePreview={imagePreview}
          email={email}
        />
        <AddressField
          handleAddressChange={handleAddressChange}
          formData={formData}
        />
        <ContactInfoField handleChange={handleChange} formData={formData} />
        <Employment handleChange={handleChange} formData={formData} />
        <EmergencyContactsField
          handleEmergencyContactChange={handleEmergencyContactChange}
          addEmergencyContact={addEmergencyContact}
          formData={formData}
        />
      </Form>
    </>
  );
};
export default PersonalInfoField;
