import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function RefundRequest() {
    //^ form validation
    const [validated, setValidated] = useState(false);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };


    const [requestType, setRequestType] = useState('');
    const [notesRequired, setNotesRequired] = useState(false);


    const handleRequestTypeChange = (event) => {
        const selectedType = event.target.value;
        setRequestType(selectedType);
        if (selectedType === 'Other') {
            setNotesRequired(true);
        } else {
            setNotesRequired(false);
        }
    };

    return (
        <div>
            <h3 className='mb-5'>New Refund request:</h3>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>Request Type</Form.Label>
                        <Form.Select
                            required
                            type="text"
                            data-bs-theme="dark"
                            onChange={handleRequestTypeChange}
                        >
                            <option value="">Select Request</option>
                            <option value="Transport">Transport</option>
                            <option value="Hotel">Hotel</option>
                            <option value="Dinner">Dinner</option>
                            <option value="Lunch">Lunch</option>
                            <option value="Car rent">Car rent</option>
                            <option value="KM">KM</option>
                            <option value="Taxi">Taxi</option>
                            <option value="Other">Other</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Please choose a Request Type.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4">
                        <Form.Label>Expense date</Form.Label>
                        <Form.Control
                            data-bs-theme="dark"
                            required
                            type="date"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please choose a valid date.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Payment type</Form.Label>
                        <Form.Select
                            required
                            type="text"
                            data-bs-theme="dark"
                        >
                            <option value="">Select Payment type</option>
                            <option value="Cash">Cash</option>
                            <option value="Electronic">Electronic</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Please choose a Payment type.
                        </Form.Control.Feedback>
                    </Form.Group>
                    {requestType === 'KM' && (
                        <Form.Group as={Col} md="4" controlId="validationCustom03">
                            <Form.Label>How many KM</Form.Label>
                            <Form.Control
                                data-bs-theme="dark"
                                required
                                type="number"
                                max={8}
                                min={1}
                                placeholder="Enter KM"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter the number of kilometers.
                            </Form.Control.Feedback>
                        </Form.Group>
                    )}
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="12">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control
                            data-bs-theme="dark"
                            required={notesRequired}
                            type="text"
                            placeholder={notesRequired ? "Please put the type of your request here" : "Notes"}
                        />
                        <Form.Control.Feedback type="invalid">
                            {notesRequired ? "Please put the type of your request here." : "Please enter some notes."}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Button className="my-5" type="submit">Send request</Button>
            </Form>
        </div>
    );
}
