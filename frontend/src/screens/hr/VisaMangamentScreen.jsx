import React, { useState, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Alert,
  Tabs,
  Tab,
  Modal,
  Button,
} from "react-bootstrap";
import {
  useGetAllVisaStatusQuery,
  useGetVisaStatusInProgressQuery,
  useSendNotificationMutation,
} from "../../slices/hrApiSlice";
import { SummaryList } from "../../components/SummaryList";
import Loader from "../../components/Loader";
import VisaActionModal from "../../components/VisaActionModal";
import { DocumentPreviewModal } from "../../components/DocumentPreviewModal";
import { BASE_URL } from "../../constants";

const VisaManagementScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [sendNotificationMutation] = useSendNotificationMutation();
  //   const [showPreviewModal, setShowPreviewModal] = useState(false);
  //   const [previewDocument, setPreviewDocument] = useState(null);

  const {
    data: allEmployees,
    isLoading: isLoadingAll,
    isError: isErrorAll,
  } = useGetAllVisaStatusQuery();
  const {
    data: inProgressEmployees,
    isLoading: isLoadingInProgress,
    isError: isErrorInProgress,
  } = useGetVisaStatusInProgressQuery();

  const handleSendNotification = async (employeeId, nextStep) => {
    try {
      console.log("send notification to employee", employeeId);
      const response = await sendNotificationMutation({
        employeeId,
        nextStep,
      });
      console.log(employeeId, nextStep, response);

      alert(response.data.message);
    } catch (error) {
      alert("Failed to send notification");
    }
  };

  //   const handlePreviewDocument = (document) => {
  //     setPreviewDocument(document);
  //     setShowPreviewModal(true);
  //   };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEmployeeAction = (employee) => {
    setSelectedEmployee(employee);
    setShowActionModal(true);
  };

  const filteredEmployees = useMemo(() => {
    if (!allEmployees) return [];
    if (searchTerm.trim() === "") return allEmployees;

    return allEmployees.filter((employee) => {
      const fullName = `${employee.personalInfo.firstName} ${
        employee.personalInfo.lastName
      } ${employee.personalInfo.preferredName || ""}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    });
  }, [allEmployees, searchTerm]);

  const inProgressHeaders = [
    { key: "name", label: "Name" },
    { key: "workAuthorization", label: "Work Authorization" },
    { key: "daysRemaining", label: "Days Remaining" },
    { key: "nextStep", label: "Next Step" },
    { key: "action", label: "Action" },
  ];

  const allEmployeesHeaders = [
    { key: "name", label: "Name" },
    { key: "workAuthorization", label: "Work Authorization" },
    { key: "daysRemaining", label: "Days Remaining" },
    { key: "documents", label: "Documents" },
  ];

  const calculateDaysRemaining = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const renderAction = (employee) => {
    const nextStep = getNextStep(employee);
    if (nextStep.includes("Waiting for HR approval")) {
      return (
        <>
          <Button
            variant="secondary"
            onClick={() => handleEmployeeAction(employee)}
          >
            Take Action
          </Button>
        </>
      );
    } else if (nextStep.includes("Upload")) {
      return (
        <Button
          variant="secondary"
          onClick={() => handleSendNotification(employee._id, nextStep)}
        >
          Send Notification
        </Button>
      );
    }
    return null;
  };

  const formatEmployeeData = (emps, includeAction = false) => {
    return emps.map((emp) => ({
      id: emp._id,
      name: `${emp.personalInfo.lastName}, ${emp.personalInfo.firstName}`,
      workAuthorization: `${
        emp.citizenshipStatus.workAuthorizationType
      } (${new Date(
        emp.citizenshipStatus.startDate
      ).toLocaleDateString()} - ${new Date(
        emp.citizenshipStatus.endDate
      ).toLocaleDateString()})`,
      daysRemaining: calculateDaysRemaining(emp.citizenshipStatus.endDate),
      nextStep: getNextStep(emp),
      action: includeAction ? renderAction(emp) : null,
      documents: getDocumentLinks(emp),
    }));
  };

  const getNextStep = (employee) => {
    // Logic to determine next step based on visa status
    if (!employee.visaStatus.currentDocument) {
      return "Submit onboarding application";
    }
    switch (employee.visaStatus.currentDocument) {
      case "OPT Receipt":
        return employee.visaStatus.documents.optReceipt.status === "Pending"
          ? "Waiting for HR approval"
          : employee.visaStatus.documents.optReceipt.status === "Rejected"
          ? "Upload New OPT Receipt"
          : "Upload OPT EAD";
      case "OPT EAD":
        return employee.visaStatus.documents.optEAD.status === "Pending"
          ? "Waiting for HR approval"
          : employee.visaStatus.documents.optEAD.status === "Rejected"
          ? "Upload New OPT EAD"
          : "Upload I-983";
      case "I-983":
        return employee.visaStatus.documents.i983.status === "Pending"
          ? "Waiting for HR approval"
          : employee.visaStatus.documents.i983.status === "Rejected"
          ? "Upload New I-983"
          : "Upload I-20";
      case "I-20":
        return employee.visaStatus.documents.i20.status === "Pending"
          ? "Waiting for HR approval"
          : employee.visaStatus.documents.i20.status === "Rejected"
          ? "Upload New I-20"
          : "All documents approved";
      default:
        return "Unknown status";
    }
  };

  const getDocumentLinks = (employee) => {
    // Logic to create document download/preview links
    const documents = employee.visaStatus.documents;
    console.log(documents);
    return Object.entries(documents)
      .filter(([_, doc]) => doc.file)
      .map(([docName, doc]) => (
        <div key={docName}>
          <a
            href={BASE_URL + "/" + doc.file}
            target="_blank"
            rel="noopener noreferrer"
          >
            {docName}
          </a>
          {doc.status === "Approved" && " (Approved)"}
        </div>
      ));
  };

  const renderEmployeeList = (employees, headers, includeAction = false) => {
    if (!employees || employees.length === 0) {
      return <Alert variant="info">No records found</Alert>;
    }

    return (
      <SummaryList
        headers={headers}
        data={formatEmployeeData(employees, includeAction)}
      />
    );
  };

  if (isLoadingAll || isLoadingInProgress) return <Loader />;
  if (isErrorAll || isErrorInProgress)
    return (
      <Alert variant="danger">Error loading visa status information</Alert>
    );

  return (
    <Container>
      <h1>Visa Status Management</h1>
      <Tabs defaultActiveKey="inProgress" id="visa-management-tabs">
        <Tab eventKey="inProgress" title="In Progress">
          {renderEmployeeList(inProgressEmployees, inProgressHeaders, true)}
        </Tab>
        <Tab eventKey="allEmployees" title="All Employees">
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </Form.Group>
          {renderEmployeeList(filteredEmployees, allEmployeesHeaders)}
        </Tab>
      </Tabs>
      {selectedEmployee && (
        <VisaActionModal
          show={showActionModal}
          onHide={() => setShowActionModal(false)}
          employee={selectedEmployee}
        />
      )}
      {/* {previewDocument && (
        <DocumentPreviewModal
          show={showPreviewModal}
          onHide={() => setShowPreviewModal(false)}
          document={previewDocument}
        />
      )} */}
    </Container>
  );
};

export default VisaManagementScreen;
