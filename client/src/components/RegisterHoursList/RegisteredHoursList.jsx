import React from 'react';
import 'react-calendar/dist/Calendar.css';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table';

export default function RegisteredHoursList({registeredHours,deleteHour}) {
  return (
    <div>
        {registeredHours.length > 0 &&
            <>
              <h3 className='f-poetsen f-green'>Registered hours: </h3>
              <Table striped bordered hover size="sm" >
                <thead >
                  <tr>
                    <th className='bg-dark f-white border-0'>Client</th>
                    <th className='bg-dark f-white border-0'>Hours N#</th>
                    <th className='bg-dark f-white border-0'>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {registeredHours.map((element, index) => (
                    <tr>
                      <td className='bg-dark f-white border-0'>{element.client.company_name} </td>
                      <td className='bg-dark f-white border-0'>{element.hours_number} h</td>
                      <td className='bg-dark f-white border-0 '>
                        <Button variant="danger" onClick={() => deleteHour(element._id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <br />
            </>
          }
    </div>
  )
}
