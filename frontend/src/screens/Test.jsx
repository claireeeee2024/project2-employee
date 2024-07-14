import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  useGetApplicationByIdQuery,
  useUpdateApplicationStatusMutation,
} from "../slices/onboardingApiSlice";
import { Button, Alert } from "react-bootstrap";
import CustomModal from "../components/CustomModal";

const Test = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    data: application,
    error,
    isLoading,
  } = useGetApplicationByIdQuery(id);

  const [updateApplicationStatus] = useUpdateApplicationStatusMutation();

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleSave = async (status, feedback) => {
    try {
      await updateApplicationStatus({
        id,
        status,
        feedback,
      }).unwrap();
      handleCloseModal();
    } catch (err) {
      console.error("Failed to update application status:", err);
    }
  };
  const renderAlert = () => {
    switch (application.onboardingStatus) {
      case "Pending":
        return (
          <Alert variant="primary">
            This application is Pending.
            <Button variant="link" className="m-0 p-1" onClick={handleShowModal}>
              Click here to update status
            </Button>
          </Alert>
        );
      case "Approved":
        return <Alert variant="success">This application is Approved.</Alert>;
      case "Rejected":
        return (
          <Alert variant="danger">
            This application is Rejected. Feedback:{" "}
            {application.onboardingFeedback}
          </Alert>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: Failed to load application</div>;
  }

  return (
    <div>
      {renderAlert()}
      <h4>Test</h4>

      <CustomModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSave={handleSave}
      />
    </div>
  );
};

export default Test;
