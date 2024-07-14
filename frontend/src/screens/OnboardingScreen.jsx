import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import {
  usePostOnboardingMutation,
  useGetOnboardingQuery,
} from "../slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import PendingField from "../components/PendingField";
import NotSubmittedField from "../components/NotSubmittedField";
import { useUploadProfileMutation } from "../slices/usersApiSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OnboardingScreen = () => {
  const [postOnboarding] = usePostOnboardingMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);
  const { username, onboardingStatus } = userInfo;
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
  });
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    if (data) {
      const onboardingStatus = data.onboardingStatus;
      dispatch(
        setCredentials({ ...userInfo, onboardingStatus: onboardingStatus })
      );
      if (onboardingStatus === "Pending") {
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
          email: data.email,
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
      if (onboardingStatus === "Approved") {
        navigate("/");
      }
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

  const handlePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };
  const handlePictureUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profilePicture", profilePicture);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);

      // setFilePath(res.data.filePath);
      // setFileName(res.data.fileName);
    } catch (err) {
      console.error("Error uploading file:", err);
    }
    // try {
    //   const res = await uploadProfile(profilePicture).unwrap();
    //   console.log(res);
    //   //   setFilePath(res.data.filePath);
    //   //   setFileName(res.data.fileName);
    // } catch (err) {
    //   console.error("Error uploading file:", err);
    // }
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
  if (error) {
    navigate("/");
  }
  return onboardingStatus === "Not Submitted" ? (
    <NotSubmittedField
      formData={formData}
      setFormData={setFormData}
      handleChange={handleChange}
      handleAddressChange={handleAddressChange}
      handleReferenceChange={handleReferenceChange}
      handleEmergencyContactChange={handleEmergencyContactChange}
      addEmergencyContact={addEmergencyContact}
      handleFileChange={handleFileChange}
      handlePictureUpload={handlePictureUpload}
      handlePictureChange={handlePictureChange}
      handleSubmit={handleSubmit}
    />
  ) : onboardingStatus === "Pending" ? (
    <>
      <h1>Please wait for HR to review your application.</h1>
      <PendingField data={data} />
    </>
  ) : (
    <>
      <h1>rejected reason: {data.onboardingFeedback}</h1>
      <NotSubmittedField
        formData={formData}
        setFormData={setFormData}
        handleChange={handleChange}
        handleAddressChange={handleAddressChange}
        handleReferenceChange={handleReferenceChange}
        handleEmergencyContactChange={handleEmergencyContactChange}
        addEmergencyContact={addEmergencyContact}
        handleFileChange={handleFileChange}
        handlePictureUpload={handlePictureUpload}
        handlePictureChange={handlePictureChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default OnboardingScreen;
