import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function OverTimeRequest() {


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
            <h3 className='mb-5'>New Over Time request:</h3>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4">
                        <Form.Label>Date of overtime work</Form.Label>
                        <Form.Control
                            data-bs-theme="dark"
                            required
                            type="date"
                            placeholder="Last name"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid date.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4">
                        <Form.Label>How many hours</Form.Label>
                        <Form.Control
                            data-bs-theme="dark"
                            required
                            type="number"
                            max={8}
                            min={1}
                            placeholder="Last name"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid number of hours.
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
