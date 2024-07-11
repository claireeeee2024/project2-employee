import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import {
  usePostOnboardingMutation,
  useGetOnboardingQuery,
} from "../slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import PendingField from "../components/PendingField";

const NameField = ({ handleChange, formData }) => {
  return (
    <>
      <Form.Group controlId="firstName">
        <Form.Label>
          <strong>First Name</strong>
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
          <strong>Last Name</strong>
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
        <Form.Label>Building/Apt #</Form.Label>
        <Form.Control
          type="text"
          name="building"
          value={formData.address.building}
          onChange={handleAddressChange}
        />
      </Form.Group>
      <Form.Group controlId="street">
        <Form.Label>Street Name</Form.Label>
        <Form.Control
          type="text"
          name="street"
          value={formData.address.street}
          onChange={handleAddressChange}
        />
      </Form.Group>
      <Form.Group controlId="city">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          name="city"
          value={formData.address.city}
          onChange={handleAddressChange}
        />
      </Form.Group>
      <Form.Group controlId="state">
        <Form.Label>State</Form.Label>
        <Form.Control
          type="text"
          name="state"
          value={formData.address.state}
          onChange={handleAddressChange}
        />
      </Form.Group>
      <Form.Group controlId="zip">
        <Form.Label>ZIP</Form.Label>
        <Form.Control
          type="text"
          name="zip"
          value={formData.address.zip}
          onChange={handleAddressChange}
        />
      </Form.Group>
    </>
  );
};

const PhoneField = () => {};
const OnboardingScreen = () => {
  const [postOnboarding] = usePostOnboardingMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { username, onboarding } = userInfo;
  const { data, isLoading, error } = useGetOnboardingQuery({
    username: username,
  });

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    preferredName: "",
    profilePicture: null,
    address: {
      building: "",
      street: "",
      city: "",
      state: "",
      zip: "",
    },
    cellPhone: "",
    workPhone: "",
    ssn: "",
    dateOfBirth: "",
    gender: "",
    permanentResident: false,
    citizenshipType: "",
    workAuthorization: "",
    optReceipt: null,
    visaTitle: "",
    startDate: "",
    endDate: "",
    reference: {
      firstName: "",
      lastName: "",
      middleName: "",
      phone: "",
      email: "",
      relationship: "",
    },
    emergencyContacts: [],
    documents: {
      profilePicture: null,
      driversLicense: null,
      workAuthorization: null,
    },
  });

  useEffect(() => {
    if (data) {
      const onboardingStatus = data.onboardingStatus;
      dispatch(setCredentials({ ...userInfo, onboarding: onboardingStatus }));
      setFormData({
        firstName: data.personalInfo.firstName,
        lastName: data.personalInfo.lastName,
        middleName: data.personalInfo.middleName,
        preferredName: data.personalInfo.preferredName,
        profilePicture: data.personalInfo.profilePicture,
        address: {
          building: data.address.building,
          street: data.address.street,
          city: data.address.city,
          state: data.address.state,
          zip: data.address.zip,
        },
        cellPhone: data.contactInfo.cellPhone,
        workPhone: data.contactInfo.workPhone,
        ssn: data.personalInfo.ssn,
        dateOfBirth: data.personalInfo.dateOfBirth,
        gender: data.personalInfo.gender,
        permanentResident: data.citizenshipStatus.isPermanentResident,
        citizenshipType: data.citizenshipStatus.citizenshipType,
        workAuthorization: data.citizenshipStatus.workAuthorizationType,
        optReceipt: data.visaStatus.documents.optReceipt.file,
        visaTitle: data.citizenshipStatus.visaTitle,
        startDate: data.citizenshipStatus.startDate,
        endDate: data.citizenshipStatus.endDate,
        reference: {
          firstName: data.reference.firstName,
          lastName: data.reference.lastName,
          middleName: data.reference.middleName,
          phone: data.reference.phone,
          email: data.reference.email,
          relationship: data.reference.relationship,
        },
        emergencyContacts: data.emergencyContacts,
        documents: {
          profilePicture: data.personalInfo.profilePicture,
          driversLicense: data.documents.driverLicense,
          workAuthorization: data.documents.workAuthorization,
        },
      });
    }
  }, [data, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      address: { ...formData.address, [name]: value },
    });
  };

  const handleReferenceChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      reference: { ...formData.reference, [name]: value },
    });
  };

  const handleEmergencyContactChange = (index, e) => {
    const { name, value } = e.target;
    const updatedContacts = [...formData.emergencyContacts];
    updatedContacts[index][name] = value;
    setFormData({ ...formData, emergencyContacts: updatedContacts });
  };

  const addEmergencyContact = () => {
    setFormData({
      ...formData,
      emergencyContacts: [...formData.emergencyContacts, {}],
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      documents: { ...formData.documents, [name]: files[0] },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await postOnboarding({ username, formData }).unwrap();
    dispatch(setCredentials({ ...res }));
    console.log(res);
    // handle form submission
  };
  if (isLoading) {
    return <div>Loading</div>;
  }
  return onboarding === "Not Submitted" ? (
    <Container>
      <h1>Onboarding</h1>
      <Form onSubmit={handleSubmit}>
        <NameField handleChange={handleChange} formData={formData} />
        <Form.Group controlId="profilePicture">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control
            type="file"
            name="profilePicture"
            onChange={handleFileChange}
          />
        </Form.Group>
        <AddressField
          handleAddressChange={handleAddressChange}
          formData={formData}
        />
        <h2>Contact Info</h2>
        <Form.Group controlId="cellPhone">
          <Form.Label>Cell Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="cellPhone"
            value={formData.cellPhone}
            onChange={handleChange}
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
            <strong>Email</strong>
          </Form.Label>
          <Form.Control type="email" name="email" value="email" readOnly />
        </Form.Group>
        <Form.Group controlId="ssn">
          <Form.Label>SSN</Form.Label>
          <Form.Control
            type="text"
            name="ssn"
            value={formData.ssn}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="dateOfBirth">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="gender">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            as="select"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="do not wish to answer">Do not wish to answer</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="permanentResident">
          <Form.Label>
            <strong>Permanent resident or citizen of the U.S.?</strong>
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
        <h2>Reference</h2>
        <Form.Group controlId="referenceFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={formData.reference.firstName}
            onChange={handleReferenceChange}
          />
        </Form.Group>
        <Form.Group controlId="referenceLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={formData.reference.lastName}
            onChange={handleReferenceChange}
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
          <Form.Label>Relationship</Form.Label>
          <Form.Control
            type="text"
            name="relationship"
            value={formData.reference.relationship}
            onChange={handleReferenceChange}
          />
        </Form.Group>
        <h2>Emergency Contacts</h2>
        {formData.emergencyContacts.map((contact, index) => (
          <div key={index}>
            <h3>Contact {index + 1}</h3>
            <Form.Group controlId={`emergencyFirstName-${index}`}>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={contact.firstName || ""}
                onChange={(e) => handleEmergencyContactChange(index, e)}
              />
            </Form.Group>
            <Form.Group controlId={`emergencyLastName-${index}`}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={contact.lastName || ""}
                onChange={(e) => handleEmergencyContactChange(index, e)}
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
              <Form.Label>Relationship</Form.Label>
              <Form.Control
                type="text"
                name="relationship"
                value={contact.relationship || ""}
                onChange={(e) => handleEmergencyContactChange(index, e)}
              />
            </Form.Group>
          </div>
        ))}
        <Button variant="secondary" onClick={addEmergencyContact}>
          Add Emergency Contact
        </Button>
        <h2>Summary of Uploaded Files</h2>
        <ul>
          {formData.documents.profilePicture && <li>Profile Picture</li>}
          {formData.documents.driversLicense && <li>Driver’s License</li>}
          {formData.documents.workAuthorization && <li>Work Authorization</li>}
        </ul>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  ) : onboarding === "Pending" ? (
    <>
      <h1>Please wait for HR to review your application.</h1>
      <PendingField data={data} />
    </>
  ) : (
    <>
      <h1>rejected reason: {data.onboardingFeedback}</h1>
      <Container>
        <h1>Onboarding</h1>
        <Form onSubmit={handleSubmit}>
          <NameField handleChange={handleChange} formData={formData} />
          <Form.Group controlId="profilePicture">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="file"
              name="profilePicture"
              onChange={handleFileChange}
            />
          </Form.Group>
          <AddressField
            handleAddressChange={handleAddressChange}
            formData={formData}
          />
          <h2>Contact Info</h2>
          <Form.Group controlId="cellPhone">
            <Form.Label>Cell Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="cellPhone"
              value={formData.cellPhone}
              onChange={handleChange}
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
              <strong>Email</strong>
            </Form.Label>
            <Form.Control type="email" name="email" value="email" readOnly />
          </Form.Group>
          <Form.Group controlId="ssn">
            <Form.Label>SSN</Form.Label>
            <Form.Control
              type="text"
              name="ssn"
              value={formData.ssn}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="dateOfBirth">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="gender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="do not wish to answer">
                Do not wish to answer
              </option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="permanentResident">
            <Form.Label>
              <strong>Permanent resident or citizen of the U.S.?</strong>
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
          <h2>Reference</h2>
          <Form.Group controlId="referenceFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.reference.firstName}
              onChange={handleReferenceChange}
            />
          </Form.Group>
          <Form.Group controlId="referenceLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.reference.lastName}
              onChange={handleReferenceChange}
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
            <Form.Label>Relationship</Form.Label>
            <Form.Control
              type="text"
              name="relationship"
              value={formData.reference.relationship}
              onChange={handleReferenceChange}
            />
          </Form.Group>
          <h2>Emergency Contacts</h2>
          {formData.emergencyContacts.map((contact, index) => (
            <div key={index}>
              <h3>Contact {index + 1}</h3>
              <Form.Group controlId={`emergencyFirstName-${index}`}>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={contact.firstName || ""}
                  onChange={(e) => handleEmergencyContactChange(index, e)}
                />
              </Form.Group>
              <Form.Group controlId={`emergencyLastName-${index}`}>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={contact.lastName || ""}
                  onChange={(e) => handleEmergencyContactChange(index, e)}
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
                <Form.Label>Relationship</Form.Label>
                <Form.Control
                  type="text"
                  name="relationship"
                  value={contact.relationship || ""}
                  onChange={(e) => handleEmergencyContactChange(index, e)}
                />
              </Form.Group>
            </div>
          ))}
          <Button variant="secondary" onClick={addEmergencyContact}>
            Add Emergency Contact
          </Button>
          <h2>Summary of Uploaded Files</h2>
          <ul>
            {formData.documents.profilePicture && <li>Profile Picture</li>}
            {formData.documents.driversLicense && <li>Driver’s License</li>}
            {formData.documents.workAuthorization && (
              <li>Work Authorization</li>
            )}
          </ul>
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    </>
  );
};

export default OnboardingScreen;
