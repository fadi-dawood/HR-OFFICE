import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Container } from 'react-bootstrap';
import "./EventListTable.css"
export default function EventListTable() {
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingEventId, setEditingEventId] = useState(null);
    const [updatedEvent, setUpdatedEvent] = useState({
        event_name: '',
        date: '',
        start_at: '',
        end_at: '',
        organizer: '',
        summary: ''
    });
    const token = localStorage.getItem("token");

    async function getAllEvents() {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/user/event`, {
                method: "GET",
                headers: {
                    "Authorization": token,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setEvents(data);
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (err) {
            console.error(err);
        }
    }

    async function updateEvent(eventId) {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/event/${eventId}`, {
                method: "PUT",
                headers: {
                    "Authorization": token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedEvent)
            });
            if (response.ok) {
                await getAllEvents();
                setShowModal(false);
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (err) {
            console.error(err);
        }
    }

    async function deleteEvent(eventId) {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/event/${eventId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": token,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                await getAllEvents();
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => { getAllEvents(); }, []);

    const handleEditClick = (event) => {
        setEditingEventId(event._id);
        setUpdatedEvent({
            event_name: event.event_name,
            date: event.date.substring(0, 10),
            start_at: event.start_at,
            end_at: event.end_at,
            organizer: event.organizer,
            summary: event.summary
        });
        setShowModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedEvent({ ...updatedEvent, [name]: value });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingEventId(null);
    };

    return (
        <Container fluid="sm">
            <h3 className='f-poetsen f-green'>List of Events: </h3>
            <Table striped bordered hover size='md'>
                <thead>
                    <tr>
                        <th className='align-middle bg-dark f-white border-0'>#</th>
                        <th className='align-middle bg-dark f-white border-0'>Event Name</th>
                        <th className='align-middle bg-dark f-white border-0'>Date</th>
                        <th className='align-middle bg-dark f-white border-0'>Start Time</th>
                        <th className='align-middle bg-dark f-white border-0'>End Time</th>
                        <th className='align-middle bg-dark f-white border-0'>Organizer</th>
                        <th className='align-middle bg-dark f-white border-0'>Summary</th>
                        <th className='align-middle bg-dark f-white border-0'>Modify</th>
                        <th className='align-middle bg-dark f-white border-0'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event, index) => (
                        <tr key={event._id}>
                            <td className='align-middle bg-dark f-white border-0'>{index + 1}</td>
                            <td className='align-middle bg-dark f-white border-0'>{event.event_name}</td>
                            <td className='align-middle bg-dark f-white border-0'>{event.date.substring(0, 10)}</td>
                            <td className='align-middle bg-dark f-white border-0'>{event.start_at}</td>
                            <td className='align-middle bg-dark f-white border-0'>{event.end_at}</td>
                            <td className='align-middle bg-dark f-white border-0'>{event.organizer}</td>
                            <td className='align-middle bg-dark f-white border-0'>
                                <div dangerouslySetInnerHTML={{ __html: event.summary }} />
                            </td>
                            <td className='align-middle bg-dark f-white border-0'>
                                <Button onClick={() => handleEditClick(event)} className='mx-1' variant="primary">
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </Button>
                            </td>
                            <td className='align-middle bg-dark f-white border-0'>
                                <Button onClick={() => deleteEvent(event._id)} className='mx-1' variant="danger">
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal className='event-editor-modal' show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formEventName">
                            <Form.Label >Event Name:</Form.Label>
                            <Form.Control
                                type="text"
                                name="event_name"
                                value={updatedEvent.event_name}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDate">
                            <Form.Label style={{ color: "black" }}>Date:</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={updatedEvent.date}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formStartAt">
                            <Form.Label>Start Time:</Form.Label>
                            <Form.Control
                                type="time"
                                name="start_at"
                                value={updatedEvent.start_at}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEndAt">
                            <Form.Label>End Time:</Form.Label>
                            <Form.Control
                                type="time"
                                name="end_at"
                                value={updatedEvent.end_at}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formOrganizer">
                            <Form.Label>Organizer:</Form.Label>
                            <Form.Control
                                type="text"
                                name="organizer"
                                value={updatedEvent.organizer}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formSummary">
                            <Form.Label>Summary:</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="summary"
                                value={updatedEvent.summary}
                                onChange={handleInputChange}
                                rows={3}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={() => updateEvent(editingEventId)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
