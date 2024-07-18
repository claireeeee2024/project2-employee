import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetOnboardingQuery } from "../slices/usersApiSlice";
import { useDispatch } from "react-redux";
import { Form, Button, Row, Col, Container, Image } from "react-bootstrap";
import {
  usePostOnboardingMutation,
  useUpdateInfoMutation,
  useUploadDocsMutation,
} from "../slices/usersApiSlice";
import PersonalInfoField from "../components/PersonalInfoField";
import PersonalInfoViewField from "../components/PersonalInfoViewField";
import { useGetEmployeeFullProfileQuery } from "../slices/hrApiSlice";

const PersonalInfoScreen = (user) => {
  const { userInfo } = useSelector((state) => state.auth);
  const { EmployeeUsername } = useParams();
  const { username, email } = userInfo;
  const { data, isLoading, error } = useGetOnboardingQuery({
    username:
      EmployeeUsername && user && userInfo.role === "hr"
        ? EmployeeUsername
        : username,
  });
  const [updateInfo] = useUpdateInfoMutation();
  const [uploadDocs] = useUploadDocsMutation();
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
      driverLicense: null,
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

  const removeEmergencyContact = (index) => {
    const updatedContacts = formData.emergencyContacts.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, emergencyContacts: updatedContacts });
  };

  useEffect(() => {
    if (data) {
      console.log(data);
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
          driverLicense: data.documents.driverLicense,
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

  const validateForm = () => {
    let isValid = true;
    const requiredFields = [
      "firstName",
      "lastName",
      "ssn",
      "dateOfBirth",
      "gender",
      "email",
      "address.building",
      "address.street",
      "address.city",
      "address.state",
      "address.zip",
      "cellPhone",
    ];

    requiredFields.forEach((field) => {
      const fieldValue = field
        .split(".")
        .reduce((obj, key) => obj && obj[key], formData);
      if (!fieldValue) {
        isValid = false;
      }
    });

    formData.emergencyContacts.forEach((contact, index) => {
      if (!contact.firstName || !contact.lastName || !contact.relationship) {
        isValid = false;
      }
    });

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form data submitted:", formData);
      const data = new FormData();
      data.append("profilePicture", formData.profilePicture);

      const uploadRes = await uploadDocs(data).unwrap();
      console.log(uploadRes);
      const updatedForm = uploadRes.profilePicture
        ? { ...formData, profilePicture: uploadRes.profilePicture }
        : { ...formData };

      const res = await updateInfo({
        username,
        formData: updatedForm,
      }).unwrap();
      setInfo(updatedForm);
      setEditMode(false);
      // 执行提交逻辑
    } else {
      alert("Please fill all required fields.");
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
            removeEmergencyContact={removeEmergencyContact}
            formData={formData}
            setFormData={setFormData}
            email={email}
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
          />
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
