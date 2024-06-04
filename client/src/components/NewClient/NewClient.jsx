import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/Container"
import { getCountryDataList } from 'countries-list';

export default function NewClient() {
  const [client, setClient] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const countryList = getCountryDataList();

  // submit function
  const [validated, setValidated] = useState(false);
  const token = localStorage.getItem("token");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      addClientFetch();
    }
    setValidated(true);
  };

  //^ fetch function
  async function addClientFetch() {
    const payload = {
      company_name: client,
      email: email,
      phone_number: phone,
      country: country
    }

    try {
      console.log(process.env.REACT_APP_API_URL);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/client`, {
        method: 'POST',
        headers: {
          "Authorization": token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Si è verificato un errore:', error);
    }
  }





  return (
    <div>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="6">
              <Form.Label>Client *</Form.Label>
              <Form.Control
                onChange={(e) => setClient(e.target.value)}
                value={client}
                data-bs-theme="dark"
                required
                type="text"
                placeholder="Enter the name of the client"
              />
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                data-bs-theme="dark"
                type="text"
                placeholder="Enter the mail of the client"
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="6">
              <Form.Label>Phone Number *</Form.Label>
              <Form.Control
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                data-bs-theme="dark"
                required
                type="text"
                placeholder="Enter the phone number of the client"
              />
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>Nationality *</Form.Label>
              <Form.Select
                onChange={(e) => setCountry(e.target.value)}
                value={country}
                data-bs-theme="dark"
                required
              >
                <option value="">Select Nationality of the client</option>
                {countryList.map((country, index) => (
                  <option key={index} value={country.name}>{country.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>
          <Button className="mt-5" type="submit">Add Client</Button>
        </Form>
    </div>
  )
}
