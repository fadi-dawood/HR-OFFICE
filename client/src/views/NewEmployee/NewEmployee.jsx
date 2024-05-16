import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/Container"

export default function NewEmployee() {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <div className='bg-dark py-5'>
            <Container>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <h3 className='my-3'>Personal Information:</h3>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4">
                            <Form.Label>First name *</Form.Label>
                            <Form.Control data-bs-theme="dark" required type="text" placeholder="First name" />
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Last name *</Form.Label>
                            <Form.Control data-bs-theme="dark" required type="text" placeholder="Last name" />
                        </Form.Group>
                        <Form.Group as={Col} md="2">
                            <Form.Label>Gender *</Form.Label>
                            <Form.Select data-bs-theme="dark" required>
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="3">
                            <Form.Label>Date of birth *</Form.Label>
                            <Form.Control data-bs-theme="dark" required type="date" placeholder="Last name" />
                        </Form.Group>
                        <Form.Group as={Col} md="5">
                            <Form.Label>Birth place *</Form.Label>
                            <Form.Control data-bs-theme="dark" required type="text" placeholder="Birth place" />
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Nationality *</Form.Label>
                            <Form.Control data-bs-theme="dark" required type="text" placeholder="Nationality" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="3">
                            <Form.Label>ID Card Number *</Form.Label>
                            <Form.Control data-bs-theme="dark" required type="text" placeholder="ID Card Number" />
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Label>Tax ID *</Form.Label>
                            <Form.Control data-bs-theme="dark" required type="text" placeholder="Tax ID" />
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Label>Personal mail *</Form.Label>
                            <Form.Control data-bs-theme="dark" required type="text" placeholder="Personal mail" />
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Label>Phone number *</Form.Label>
                            <Form.Control data-bs-theme="dark" required type="number" placeholder="Phone number" />
                        </Form.Group>
                    </Row>




                    <h3 className='mt-5'>Residence:</h3>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4">
                            <Form.Label>State</Form.Label>
                            <Form.Control data-bs-theme="dark" type="text" placeholder="State" required />
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Region</Form.Label>
                            <Form.Control data-bs-theme="dark" type="text" placeholder="Region" required />
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>City</Form.Label>
                            <Form.Control data-bs-theme="dark" type="text" placeholder="City" required />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6">
                            <Form.Label>Street</Form.Label>
                            <Form.Control data-bs-theme="dark" type="text" placeholder="Street" required />
                        </Form.Group>
                        <Form.Group as={Col} md="2">
                            <Form.Label>House number</Form.Label>
                            <Form.Control data-bs-theme="dark" type="text" placeholder="House number" required />
                        </Form.Group>
                        <Form.Group as={Col} md="2">
                            <Form.Label>Zip</Form.Label>
                            <Form.Control data-bs-theme="dark" type="text" placeholder="Zip" required />
                        </Form.Group>
                    </Row>






                    <h3 className='mt-5'>Contract Information:</h3>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4">
                            <Form.Label>Department</Form.Label>
                            <Form.Select data-bs-theme="dark">
                                <option value="">Select one</option>
                                <option value="Green Power">Green Power</option>
                                <option value="Telecomunication">Telecomunication</option>
                                <option value="Environmental">Environmental</option>
                                <option value="Stracture engineering">Stracture engineering</option>
                                <option value="Permit">Permit</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Salary</Form.Label>
                            <Form.Control data-bs-theme="dark" min={0} type="number" placeholder="Salary" />
                        </Form.Group>
                        <Form.Group as={Col} md="2">
                            <Form.Label>Contract level *</Form.Label>
                            <Form.Select data-bs-theme="dark">
                                <option value="">Select one</option>
                                <option value="Q">Q</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3S">3S</option>
                                <option value="3">3</option>
                                <option value="4S">4S</option>
                                <option value="4">4</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} md="2">
                            <Form.Label>Role *</Form.Label>
                            <Form.Select data-bs-theme="dark">
                                <option value="">Select one</option>
                                <option value="Project Manger">Project Manger</option>
                                <option value="Employee">Employee</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="2">
                            <Form.Label>Working hours *</Form.Label>
                            <Form.Select data-bs-theme="dark">
                                <option value="">Select one</option>
                                <option value="Full time">Full time</option>
                                <option value="Part time">Part time</option>

                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} md="2">
                            <Form.Label>Contract type *</Form.Label>
                            <Form.Select data-bs-theme="dark">
                                <option value="">Select one</option>
                                <option value="Period contract">Period contract</option>
                                <option value="Permanent contract">Permanent contract</option>
                                <option value="Unit price contract">Unit price contract</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Hire date *</Form.Label>
                            <Form.Control data-bs-theme="dark" type="date" placeholder="Hire date" required />
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Contract expiry *</Form.Label>
                            <Form.Control data-bs-theme="dark" type="date" placeholder="Contract expiry" />
                        </Form.Group>
                    </Row>

                    <Button className="mt-5" type="button">Submit form</Button>
                </Form>
            </Container>
        </div>
    );
}
