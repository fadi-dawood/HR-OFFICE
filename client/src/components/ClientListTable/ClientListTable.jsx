import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Container } from 'react-bootstrap';
import "./ClientListTable.css";

export default function ClientListTable() {



  //^ Variables
  // State Variable
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingClientId, setEditingClientId] = useState(null);
  const [updatedClient, setUpdatedClient] = useState({ company_name: '', email: '', phone_number: '', country: '' });
  // other Variable
  const token = localStorage.getItem("token");




  //^ Get all clients - fetch
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
        setClients(data);
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (err) {
      console.error(err);
    }
  }



  //^ Update a client info - fetch
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
        setShowModal(false);
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (err) {
      console.error(err);
    }
  }



  //^ UseEffect
  useEffect(() => { getAllClients(); }, []);



  //^ Open Modal
  const handleEditClick = (client) => {
    setEditingClientId(client._id);
    setUpdatedClient({
      company_name: client.company_name,
      email: client.email,
      phone_number: client.phone_number,
      country: client.country
    });
    setShowModal(true);
  };



  //^ preparing the updated info in  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedClient({ ...updatedClient, [name]: value });
  };


  //^ close Modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingClientId(null);
  };



  
  return (
    <Container fluid="sm">
      <h3 className='f-poetsen f-green'>List of Clients: </h3>
      <Table striped bordered hover size='md'>
        <thead>
          <tr>
            <th className='align-middle bg-dark f-white border-0'>#</th>
            <th className='align-middle bg-dark f-white border-0'>Client</th>
            <th className='align-middle bg-dark f-white border-0'>Email</th>
            <th className='align-middle bg-dark f-white border-0'>Phone number</th>
            <th className='align-middle bg-dark f-white border-0'>Nationality</th>
            <th className='align-middle bg-dark f-white border-0'>Modify</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={client._id}>
              <td className='align-middle bg-dark f-white border-0'>{index + 1}</td>
              <td className='align-middle bg-dark f-white border-0'>{client.company_name}</td>
              <td className='align-middle bg-dark f-white border-0'>{client.email}</td>
              <td className='align-middle bg-dark f-white border-0'>{client.phone_number}</td>
              <td className='align-middle bg-dark f-white border-0'>{client.country}</td>
              <td className='align-middle bg-dark f-white border-0'>
                <Button onClick={() => handleEditClick(client)} className='mx-1' variant="primary">
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal className='edit-client-modal' show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCompanyName">
              <Form.Label>Company Name:</Form.Label>
              <Form.Control
                type="text"
                name="company_name"
                value={updatedClient.company_name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={updatedClient.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formPhoneNumber">
              <Form.Label>Phone Number:</Form.Label>
              <Form.Control
                type="text"
                name="phone_number"
                value={updatedClient.phone_number}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formCountry">
              <Form.Label>Country:</Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={updatedClient.country}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="success" onClick={() => updateClient(editingClientId)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}