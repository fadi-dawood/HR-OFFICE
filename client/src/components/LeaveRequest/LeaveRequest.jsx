import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';

export default function LeaveRequest() {
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

    //^ Variables
    const [type, setType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [startHour, setStartHour] = useState("");
    const [endDate, setEndDate] = useState("");
    const [endHour, setEndHour] = useState("");
    const [note, setNote] = useState("");
    const [alertMsg, setAlertMsg] = useState("");
    const token = localStorage.getItem("token");

    //^ Request Leave - call function
    async function askPermission() {
        const payload = {
            type: type,
            startDate: startDate,
            startHour: startHour,
            endDate: endDate,
            endHour: endHour,
            note: note
        }
        console.log(payload)
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/user/permission`, {
                method: "POST",
                headers: {
                    "Authorization": token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                setEndDate("");
                setEndHour("");
                setNote("");
                setStartDate("");
                setStartHour("");
                setType("");
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
            <h1 className='mb-4'>New leave request:</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>Request Type</Form.Label>
                        <Form.Select
                            onChange={(e) => { setType(e.target.value) }}
                            value={type}
                            required
                            type="text"
                            data-bs-theme="dark"
                        >
                            <option value="">Select Request</option>
                            <option value="Day Off">Day Off</option>
                            <option value="Permission">Permission</option>
                            <option value="Sickness">Sickness</option>
                            <option value="Maternity">Maternity</option>
                            <option value="Wedding">Wedding</option>
                            <option value="Child's Sickness">Child's Sickness</option>
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
                            onChange={(e) => { setStartDate(e.target.value) }}
                            value={startDate}
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
                            onChange={(e) => { setStartHour(e.target.value)}}
                            value={startHour}
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
                            onChange={(e) => { setEndDate(e.target.value) }}
                            value={endDate}
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
                            onChange={(e) => { setEndHour(e.target.value) }}
                            value={endHour}
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
                            onChange={(e) => { setNote(e.target.value) }}
                            value={note}
                            data-bs-theme="dark"
                            type="text"
                            placeholder="Notes"
                        />
                    </Form.Group>
                </Row>
                <Button onClick={askPermission} className="my-5" type="button">Send request</Button>
                {alertMsg && <Alert variant="danger">{alertMsg}</Alert>}
            </Form>
        </div>
    )
}
