import React from 'react';
import { Table } from 'react-bootstrap';

export const SummaryList = ({ headers, data, handleClickName }) => {

    
  return (
    <>
      <p>Total Employees Found: {data.length}</p>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              {headers.map((header, index) => (
                <td key={index}>
                    {handleClickName ? 
                    handleClickName(header.key, item[header.key], item) : 
                    item[header.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
