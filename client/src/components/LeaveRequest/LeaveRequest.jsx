import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function LeaveRequest() {


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
        <div>
            <h3 className='mb-5'>New leave request:</h3>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>Request Type</Form.Label>
                        <Form.Select
                            required
                            type="text"
                            data-bs-theme="dark"
                        >
                            <option value="">Select Request</option>
                            <option value="Day off">Day off</option>
                            <option value="Permission">Permission</option>
                            <option value="Maternity">Maternity</option>
                            <option value="Widding">Widding</option>
                            <option value="Son's sikness">Son's sikness</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Please choose a Request Type.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} md="4">
                        <Form.Label>Start on</Form.Label>
                        <Form.Control
                            data-bs-theme="dark"
                            required
                            type="date"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid date.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4">
                        <Form.Label>Start at</Form.Label>
                        <Form.Control
                            data-bs-theme="dark"
                            required
                            type="time"
                        />
                                                                        <Form.Control.Feedback type="invalid">
                            Please enter a valid time.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4">
                        <Form.Label>End on</Form.Label>
                        <Form.Control
                            data-bs-theme="dark"
                            required
                            type="date"
                        />
                                                <Form.Control.Feedback type="invalid">
                            Please enter a valid date.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4">
                        <Form.Label>End at</Form.Label>
                        <Form.Control
                            data-bs-theme="dark"
                            required
                            type="time"
                        />
                                                <Form.Control.Feedback type="invalid">
                            Please enter a valid time.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="12">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control
                            data-bs-theme="dark"
                            type="text"
                            placeholder="Notes"
                        />
                    </Form.Group>
                </Row>
                <Button className="my-5" type="submit">Send request</Button>
            </Form>
        </div>
    )
}
