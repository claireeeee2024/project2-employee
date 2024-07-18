import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Alert, Container } from "react-bootstrap";
import CustomModal from "../components/CustomModal";

import {
  usePostOnboardingMutation,
  useGetOnboardingQuery,
} from "../slices/usersApiSlice";
import { useUpdateOnboardingStatusMutation } from "../slices/hrApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import PendingField from "../components/PendingField";
import NotSubmittedField from "../components/NotSubmittedField";
import { useUploadDocsMutation } from "../slices/usersApiSlice";
import { useParams, useNavigate } from "react-router-dom";

const OnboardingScreen = () => {
  const [postOnboarding] = usePostOnboardingMutation();
  const [uploadDocs] = useUploadDocsMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const username = useParams().username || userInfo.username;

  const { data, isLoading, error, refetch } = useGetOnboardingQuery({
    username: username,
  });
  //   const onboardingStatus =
  //     userInfo.role === "hr" && data
  //       ? data.onboardingStatus
  //       : userInfo.onboardingStatus;
  const onboardingStatus = data
    ? data.onboardingStatus
    : userInfo.onboardingStatus;
  const [fetchError, setFetchError] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!userInfo) {
  //     navigate("/");
  //   }
  // }, [userInfo, navigate]);

  const dispatch = useDispatch();
  const [updateApplicationStatus, { isLoading: isUpdatingStatus }] =
    useUpdateOnboardingStatusMutation();

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleSave = async (status, feedback) => {
    try {
      await updateApplicationStatus({
        username,
        status,
        feedback,
      }).unwrap();
      console.log("handleSave", status, feedback);

      handleCloseModal();
      refetch();
    } catch (err) {
      console.error("Failed to update application status:", err);
    }
  };

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
      optReceipt: null,
    },
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      const onboardingStatus = data.onboardingStatus;
      dispatch(
        setCredentials({ ...userInfo, onboardingStatus: onboardingStatus })
      );
      if (onboardingStatus === "Not Submitted") {
        setFormData({
          ...formData,
          email: data.email,
        });
      }
      if (onboardingStatus === "Pending" || onboardingStatus === "Rejected") {
        const tempData = {
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
            optReceipt: data.documents.workAuthorization,
          },
        };
        console.log(tempData);
        setFormData(tempData);
      }
      if (userInfo.role === "employee" && onboardingStatus === "Approved") {
        navigate("/");
      }
    } else if (error) {
      setFetchError(error.data?.message || "Invalid username.");
    }
  }, [data, error, dispatch]);

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

  const removeEmergencyContact = (index) => {
    const updatedContacts = formData.emergencyContacts.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, emergencyContacts: updatedContacts });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.emergencyContacts.length < 1) {
      alert("Please input at least one contact");
      return;
    }
    const data = new FormData();
    data.append("profilePicture", formData.profilePicture);
    data.append("optReceipt", formData.documents.workAuthorization);
    data.append("driverLicense", formData.documents.driverLicense);
    const uploadRes = await uploadDocs(data).unwrap();
    console.log(uploadRes);
    const updatedForm = {
      ...formData,
      profilePicture: uploadRes.profilePicture,
      documents: {
        ...formData.documents,
        workAuthorization: uploadRes.optReceipt,
        driverLicense: uploadRes.driverLicense,
      },
    };
    console.log(updatedForm);

    const res = await postOnboarding({
      username,
      formData: updatedForm,
    }).unwrap();
    dispatch(setCredentials({ ...res }));
    // handle form submission
    setFormData(updatedForm);
    refetch();
    navigate("/onboarding");
  };

  if (isLoading) {
    return <div>Loading</div>;
  }
  if (error) {
    return (
      <Container>
        <Alert variant="danger">{fetchError}</Alert>
      </Container>
    );
  }

  if (userInfo.role === "hr") {
    if (onboardingStatus === "Pending") {
      return (
        <Container>
          <Alert variant="primary">
            This application is Pending.
            <Button
              variant="link"
              className="m-0 p-1"
              onClick={handleShowModal}
            >
              Click here to update status
            </Button>
          </Alert>
          <PendingField data={data} />
          <CustomModal
            show={showModal}
            handleClose={handleCloseModal}
            handleSave={handleSave}
            isUpdatingStatus={isUpdatingStatus}
          />
        </Container>
      );
    } else if (onboardingStatus === "Approved") {
      return (
        <Container>
          <Alert variant="success">This application is Approved.</Alert>
          <PendingField data={data} />
        </Container>
      );
    } else if (onboardingStatus === "Rejected") {
      return (
        <Container>
          <Alert variant="danger">
            This application is Rejected. Feedback: {data.onboardingFeedback}
          </Alert>
          <PendingField data={data} />
        </Container>
      );
    }
  } else {
    return onboardingStatus === "Not Submitted" ? (
      <NotSubmittedField
        formData={formData}
        setFormData={setFormData}
        handleChange={handleChange}
        handleAddressChange={handleAddressChange}
        handleReferenceChange={handleReferenceChange}
        handleEmergencyContactChange={handleEmergencyContactChange}
        addEmergencyContact={addEmergencyContact}
        removeEmergencyContact={removeEmergencyContact}
        handleSubmit={handleSubmit}
      />
    ) : onboardingStatus === "Pending" ? (
      <Container>
        <h1>Please wait for HR to review your application.</h1>
        <PendingField data={data} />
      </Container>
    ) : (
      <Container>
        <h1>Rejected Reason: {data.onboardingFeedback}</h1>
        <NotSubmittedField
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          handleAddressChange={handleAddressChange}
          handleReferenceChange={handleReferenceChange}
          handleEmergencyContactChange={handleEmergencyContactChange}
          addEmergencyContact={addEmergencyContact}
          removeEmergencyContact={removeEmergencyContact}
          handleSubmit={handleSubmit}
        />
      </Container>
    );
  }
};

export default OnboardingScreen;
