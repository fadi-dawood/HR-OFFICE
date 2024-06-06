import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/Container";


export default function NewEvent() {

    //^ Variables
    const [event, setEvent] = useState("");
    const [date, setDate] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [organizer, setOrganizer] = useState("");
    const [summary, setSummary] = useState("");
    const token = localStorage.getItem("token");




    //^ Check that the form is competed (Submit Function)
    const [validated, setValidated] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            addEventFetch();
        }
        setValidated(true);
    };




    //^ Add new Event - fetch function
    async function addEventFetch() {
        const payload = {
            event_name: event,
            date: date,
            start_at: start,
            end_at: end,
            organizer: organizer,
            summary: summary
        }

        try {
            console.log(process.env.REACT_APP_API_URL);
            const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/event`, {
                method: 'POST',
                headers: {
                    "Authorization": token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                setEvent("");
                setDate("");
                setStart("");
                setEnd("");
                setOrganizer("");
                setSummary("");
                setValidated(false);
            }
        } catch (error) {
            console.error('Si è verificato un errore:', error);
        }
    }





    return (
        <div>
            <Container>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="3">
                            <Form.Label>Event title *</Form.Label>
                            <Form.Control
                                onChange={(e) => setEvent(e.target.value)}
                                value={event}
                                data-bs-theme="dark"
                                required
                                type="text"
                                placeholder="Enter the title of the event"
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="3">
                            <Form.Label>Event's Date *</Form.Label>
                            <Form.Control
                                onChange={(e) => setDate(e.target.value)}
                                value={date}
                                required
                                data-bs-theme="dark"
                                type="date"
                                placeholder="Enter the date of the event"
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Label>From *</Form.Label>
                            <Form.Control
                                onChange={(e) => setStart(e.target.value)}
                                value={start}
                                required
                                data-bs-theme="dark"
                                type="time"
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Label>To *</Form.Label>
                            <Form.Control
                                onChange={(e) => setEnd(e.target.value)}
                                value={end}
                                required
                                data-bs-theme="dark"
                                type="time"
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6">
                            <Form.Label>Organizer *</Form.Label>
                            <Form.Control
                                onChange={(e) => setOrganizer(e.target.value)}
                                value={organizer}
                                data-bs-theme="dark"
                                required
                                type="text"
                                placeholder="Enter the organizer of the event"
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12">
                            <Form.Label>Summary *</Form.Label>
                            <Form.Control
                                onChange={(e) => setSummary(e.target.value)}
                                value={summary}
                                data-bs-theme="dark"
                                required
                                type="text"
                                placeholder="Enter the summary of the event"
                            />
                        </Form.Group>
                    </Row>
                    <Button className="mt-5" type="submit">Add Client</Button>
                </Form>
            </Container>
        </div>
    )
}
