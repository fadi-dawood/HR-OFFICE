import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Container } from "react-bootstrap";

export default function ClientListTable() {
  const [clients, setClients] = useState([]);
  const [editingClientId, setEditingClientId] = useState(null);
  const [updatedClient, setUpdatedClient] = useState({ company_name: '', email: '', phone_number: '', country: '' });
  const token = localStorage.getItem("token");

  async function getAllClients() {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/clients`, {
        method: "GET",
        headers: {
          "Authorization": token,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setClients(data);
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function updateClient(clientId) {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/client/${clientId}`, {
        method: "PUT",
        headers: {
          "Authorization": token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedClient)
      });
      if (response.ok) {
        await getAllClients();
        setEditingClientId(null);
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => { getAllClients(); }, []);

  const handleEditClick = (client) => {
    setEditingClientId(client._id);
    setUpdatedClient({
      company_name: client.company_name,
      email: client.email,
      phone_number: client.phone_number,
      country: client.country
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedClient({ ...updatedClient, [name]: value });
  };

  const handleCancelClick = () => {
    setEditingClientId(null);
  };

  return (
    <Container fluid="sm">
    <h3 className='f-poetsen f-green'>List of Clients: </h3>
    <Table striped bordered hover size='md'>
      <thead>
        <tr>
          <th className=' align-middle bg-dark f-white border-0'>#</th>
          <th className=' align-middle bg-dark f-white border-0'>Client</th>
          <th className=' align-middle bg-dark f-white border-0'>Email</th>
          <th className=' align-middle bg-dark f-white border-0'>Phone number</th>
          <th className=' align-middle bg-dark f-white border-0'>Nationality</th>
          <th className=' align-middle bg-dark f-white border-0'>Modify</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client, index) => (
          <tr key={client._id}>
            <td className=' align-middle bg-dark f-white border-0'>{index + 1}</td>
            <td className=' align-middle bg-dark f-white border-0'>
              {editingClientId === client._id ? (
                <input
                  type="text"
                  name="company_name"
                  value={updatedClient.company_name}
                  onChange={handleInputChange}
                  style={{ color: 'black' }}
                />
              ) : (
                client.company_name
              )}
            </td>
            <td className=' align-middle bg-dark f-white border-0'>
              {editingClientId === client._id ? (
                <input
                  type="text"
                  name="email"
                  value={updatedClient.email}
                  onChange={handleInputChange}
                  style={{ color: 'black' }}
                />
              ) : (
                client.email
              )}
            </td>
            <td className=' align-middle bg-dark f-white border-0'>
              {editingClientId === client._id ? (
                <input
                  type="text"
                  name="phone_number"
                  value={updatedClient.phone_number}
                  onChange={handleInputChange}
                  style={{ color: 'black' }}
                />
              ) : (
                client.phone_number
              )}
            </td>
            <td className=' align-middle bg-dark f-white border-0'>
              {editingClientId === client._id ? (
                <input
                  type="text"
                  name="country"
                  value={updatedClient.country}
                  onChange={handleInputChange}
                  style={{ color: 'black' }}
                />
              ) : (
                client.country
              )}
            </td>
            <td className=' align-middle bg-dark f-white border-0'>
              {editingClientId === client._id ? (
                <>
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    onClick={() => updateClient(client._id)}
                    style={{ cursor: 'pointer', marginRight: '10px' }}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    onClick={handleCancelClick}
                    style={{ cursor: 'pointer' }}
                  />
                </>
              ) : (
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  onClick={() => handleEditClick(client)}
                  style={{ cursor: 'pointer' }}
                />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    </Container>
  );
}
