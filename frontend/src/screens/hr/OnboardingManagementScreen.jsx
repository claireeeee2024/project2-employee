import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetOnboardingApplicationsQuery } from "../../slices/hrApiSlice";
import "./index.css";
import {
  setSelectedUsername,
  setSortOption,
  setOnboardingStatus,
} from "../../slices/onboardingSlice"; // Import your Redux action for setting sort option
import {
  Row,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Table,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import Loader from "../../components/Loader";
const OnboardingManagementScreen = () => {
  const sortOption =
    useSelector((state) => state.onboarding.sortOption) || "Pending";
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const {
    data: applications,
    error,
    isLoading,
    refetch,
  } = useGetOnboardingApplicationsQuery({
    sort: sortOption,
  });
  useEffect(() => {
    // Fetch applications initially or on sort option change
    refetch();
  }, [sortOption, refetch]);

  const handleSortChange = (option) => {
    dispatch(setSortOption(option)); // Dispatch action to set sort option in Redux state
  };

  const handleViewApplication = (username) => {
    // console.log(username);
    // navigate(`/test/${application._id}`);
    dispatch(setSelectedUsername(username));
    dispatch(setOnboardingStatus(sortOption));
    navigate("/onboarding");
  };

  if (error) {
    return <div>Error: Failed to load data</div>;
  }

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col md={9}>
          <h3 className="fw-semibold">Onboarding Application Review</h3>
        </Col>
        <Col>
          <DropdownButton
            id="sort-dropdown"
            title={sortOption + " "}
            className="float-end"
          >
            <Dropdown.Item onClick={() => handleSortChange("Pending")}>
              Pending
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSortChange("Approved")}>
              Approved
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSortChange("Rejected")}>
              Rejected
            </Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>
      {isLoading ? (
        <Loader />
      ) : (
        <Row className="d-flex justify-content-center">
          <ul>
            <div className="mt-3">
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((application) => (
                    <tr key={application._id}>
                      <td>
                        {application.personalInfo.firstName}{" "}
                        {application.personalInfo.lastName}
                      </td>
                      <td>{application.email}</td>
                      <td className="d-flex gap-1 justify-content-start">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() =>
                            handleViewApplication(application.username)
                          }
                        >
                          View Application
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </ul>
        </Row>
      )}
    </Container>
  );
};

export default OnboardingManagementScreen;
