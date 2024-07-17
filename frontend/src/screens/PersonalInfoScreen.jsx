import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { useGetOnboardingQuery } from "../slices/usersApiSlice";
import { useDispatch } from "react-redux";
import { Form, Button, Row, Col, Container, Image } from "react-bootstrap";
import {
  usePostOnboardingMutation,
  useUpdateInfoMutation,
} from "../slices/usersApiSlice";
import PersonalInfoField from "../components/PersonalInfoField";
import PersonalInfoViewField from "../components/PersonalInfoViewField";
import { useGetEmployeeFullProfileQuery } from '../slices/hrApiSlice';

const PersonalInfoScreen = (user) => {
  const { userInfo } = useSelector((state) => state.auth);
  const { EmployeeUsername } = useParams();
  const { username, email } = userInfo;
  const { data, isLoading, error } = useGetOnboardingQuery({
    username: EmployeeUsername && user && userInfo.role === "hr" ? EmployeeUsername : username,
  });
  const [updateInfo] = useUpdateInfoMutation();
  const [initialFormData, setInitialFormData] = useState({
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
    email: "",
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
    createdAt: null,
    updatedAt: null,
  });
  const [formData, setFormData] = useState(initialFormData);
  const [info, setInfo] = useState(initialFormData);
  const [editMode, setEditMode] = useState(false);

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

  const handleEmergencyContactChange = (index, e) => {
    const { name, value } = e.target;
    const updatedContacts = [...formData.emergencyContacts];
    updatedContacts[index] = { ...updatedContacts[index], [name]: value };
    setFormData({ ...formData, emergencyContacts: updatedContacts });
  };

  const addEmergencyContact = () => {
    setFormData({
      ...formData,
      emergencyContacts: [...formData.emergencyContacts, {}],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateInfo({ username, formData }).unwrap();
    setInfo(formData);
    setEditMode(false);
  };

  useEffect(() => {
    if (data) {
      const updatedData = {
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
        email: data.email,
        ssn: data.personalInfo.ssn,
        dateOfBirth: data.personalInfo.dateOfBirth
          ? data.personalInfo.dateOfBirth.split("T")[0]
          : "",
        gender: data.personalInfo.gender,
        permanentResident: data.citizenshipStatus.isPermanentResident,
        citizenshipType: data.citizenshipStatus.citizenshipType,
        workAuthorization: data.citizenshipStatus.workAuthorizationType,
        optReceipt: data.visaStatus.documents.optReceipt.file,
        visaTitle: data.citizenshipStatus.visaTitle,
        startDate: data.citizenshipStatus.startDate
          ? data.citizenshipStatus.startDate.split("T")[0]
          : "",
        endDate: data.citizenshipStatus.endDate
          ? data.citizenshipStatus.endDate.split("T")[0]
          : "",
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
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };
      setInfo(updatedData);
      setFormData(updatedData);
    }
  }, [data]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    if (window.confirm("Do you want to discard all of your changes?")) {
      setFormData(info); // 恢复到原始数据
      setEditMode(false);
    }
  };

  if (isLoading) {
    return <div>loading</div>;
  }
  return (
    <>
      {editMode ? (
        <div>
          <PersonalInfoField
            handleChange={handleChange}
            handleAddressChange={handleAddressChange}
            handleEmergencyContactChange={handleEmergencyContactChange}
            addEmergencyContact={addEmergencyContact}
            formData={formData}
            setFormData={setFormData}
            email={email}
          />
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </div>
      ) : (
        <div>
          <PersonalInfoViewField data={info} />
        
          {userInfo.role !== "hr" && <Button onClick={handleEdit}>Edit</Button>}
        </div>
      )}
    </>
  );
};
export default PersonalInfoScreen;
