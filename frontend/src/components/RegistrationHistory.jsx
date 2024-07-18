import React from "react";
import { useGetRegistrationHistoryQuery } from "../slices/hrApiSlice";
import { Table } from "react-bootstrap";
import Loader from "./Loader";

const RegistrationHistory = () => {
  const { data: history, error, isLoading } = useGetRegistrationHistoryQuery();

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="mt-3 ">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Registration Token</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry) => (
                <tr key={entry._id}>
                  <td>{entry.email}</td>
                  <td>{entry.name}</td>
                  <td>
                    <a
                      href={`http://localhost:3000/register?token=${entry.registrationToken}`}
                    >
                      {entry.registrationToken}
                    </a>
                  </td>
                  <td>{entry.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default RegistrationHistory;
