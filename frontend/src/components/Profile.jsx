import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { useGetEmployeeFullProfileQuery } from '../slices/hrApiSlice';
import Loader from './Loader';

export const Profile = () => {

    // merge with personalInfo page maybe
    const { employeeId } = useParams();
    console.log(employeeId);
    
    const { data: employee, isLoading, isError } = useGetEmployeeFullProfileQuery(employeeId);

    const handleClick = () => {
        window.history.back();
    }

  if (isLoading) return <Loader />;
  if (isError) return <p>Error loading profile</p>;
  if (!employee) return null;

  return (
    <>
    <Button variant="primary" onClick={handleClick}>Go Back</Button>
    <Card className='mt-2'>
      <Card.Header>Employee Profile</Card.Header>
      <Card.Body>
        <Card.Title>{`${employee.personalInfo.firstName} ${employee.personalInfo.middleName || ''} ${employee.personalInfo.lastName}`}</Card.Title>
        <Card.Text>
          <strong>Preferred Name:</strong> {employee.personalInfo.preferredName}<br />
          <strong>SSN:</strong> {employee.personalInfo.ssn}<br />
          <strong>Work Authorization:</strong> {employee.citizenshipStatus.workAuthorizationType}<br />
          <strong>Phone:</strong> {employee.contactInfo.cellPhone}<br />
          <strong>Email:</strong> {employee.email}<br />
          <strong>Address:</strong> {`${employee.address.street}, ${employee.address.city}, ${employee.address.state} ${employee.address.zipCode}`}<br />
          <strong>Date of Birth:</strong> {new Date(employee.personalInfo.dateOfBirth).toLocaleDateString()}<br />
          <strong>Gender:</strong> {employee.personalInfo.gender}
        </Card.Text>
      </Card.Body>
    </Card>
    </>
  );
};
