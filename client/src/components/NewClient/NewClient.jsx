import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { getCountryDataList } from 'countries-list';
import Alert from 'react-bootstrap/Alert';



export default function NewClient() {

  //^ Variables
  const [client, setClient] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const countryList = getCountryDataList();
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("danger");



  //^ Check that the form is competed (Submit Function)
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




  //^ Add new Client - fetch function
  async function addClientFetch() {
    const payload = {
      company_name: client,
      email: email,
      phone_number: phone,
      country: country
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/client`, {
        method: 'POST',
        headers: {
          "Authorization": token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        setAlertType("success");
        setAlertMsg("Client is added successfully");
        setTimeout(() => { setAlertMsg(""); }, 5000);
        setValidated(false);

        setClient("");
        setEmail("");
        setPhone("");
        setCountry("");
      }else{
        setAlertType("danger");
        setAlertMsg("Somthing went wrong, please try later!");
        setTimeout(() => { setAlertMsg(""); }, 5000)
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
      {alertMsg && <Alert className='my-3' variant={alertType}>{alertMsg}</Alert>}
    </div>
  )
}
