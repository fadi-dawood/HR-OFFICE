import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';

export default function OverTimeRequest() {
    //^ Validation form
    const [validated, setValidated] = useState(false);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    //^ variables
    const [date, setDate] = useState("");
    const [hourNumber, setHourNumber] = useState("");
    const [note, setNote] = useState("");
    const [alertMsg, setAlertMsg] = useState("");
    const token = localStorage.getItem("token");

    //^ Overtime request- call function
    async function askOverTime() {
        const payload = {
            date: date,
            hours_number: hourNumber,
            note: note
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/user/overtime`, {
                method: "POST",
                headers: {
                    "Authorization": token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                setDate("");
                setHourNumber("");
                setNote("");
                setAlertMsg("");
            } else {
                setAlertMsg("Somthing went wrong, please try later!");
                setTimeout(() => { setAlertMsg(""); }, 5000)
            }
        } catch (err) {
            console.error(err);
        };

    }


    return (
        <div>
            <h3 className='mb-5'>New Over Time request:</h3>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4">
                        <Form.Label>Date of overtime work</Form.Label>
                        <Form.Control
                            onChange={(e) => { setDate(e.target.value) }}
                            value={date}
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
                            onChange={(e) => { setHourNumber(e.target.value) }}
                            value={hourNumber}
                            data-bs-theme="dark"
                            required
                            type="number"
                            max={8}
                            min={1}
                            placeholder="Number of hours"
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
                            onChange={(e) => { setNote(e.target.value) }}
                            value={note}
                            data-bs-theme="dark"
                            type="text"
                            placeholder="Notes"
                        />
                    </Form.Group>
                </Row>
                <Button onClick={askOverTime} className="my-5" type="button">Send request</Button>
                {alertMsg && <Alert variant="danger">{alertMsg}</Alert>}
            </Form>
        </div>
    )
}
