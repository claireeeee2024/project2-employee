import React, { useMemo } from "react";
import { Container, Row, Col, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useGetEmployeeProfilesQuery } from "../../slices/hrApiSlice";
import { setSearchTerm } from "../../slices/profileSlice";
import { SummaryList } from "../../components/SummaryList";
import Loader from "../../components/Loader";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.profile.searchTerm);

  const { data, isLoading, isError } = useGetEmployeeProfilesQuery();

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleClickName = (key, value, item) => {
    if (key === "name") {
      return <Link to={`/profiles/${item.username}`}>{value}</Link>;
    }
    return value;
  };
  console.log(data);

  const headers = [
    { key: "name", label: "Name" },
    { key: "ssn", label: "SSN" },
    { key: "workAuthorizationTitle", label: "Work Authorization" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "email", label: "Email" },
  ];

  const filteredEmployees = useMemo(() => {
    if (!data || !Array.isArray(data.employees)) return [];
    if (searchTerm.trim() === "") return data.employees;

    return data.employees.filter((employee) => {
      if (!employee) return false;
      const searchLower = searchTerm.toLowerCase();
      return employee.name.toLowerCase().includes(searchLower);
    });
  }, [data, searchTerm]);

  const renderEmployeeList = () => {
    if (filteredEmployees.length === 0) {
      return <Alert variant="info">No records found</Alert>;
    }

    return (
      <>
        {searchTerm.trim() !== "" && (
          <Alert variant="success">
            {filteredEmployees.length} record
            {filteredEmployees.length !== 1 ? "s" : ""} found
          </Alert>
        )}
        <SummaryList
          headers={headers}
          data={filteredEmployees}
          handleClickName={handleClickName}
        />
      </>
    );
  };

  return (
    <Container>
      <h1>Employee Profiles</h1>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </Form.Group>
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <Alert variant="danger">Error loading employee profiles</Alert>
          ) : (
            renderEmployeeList()
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileScreen;