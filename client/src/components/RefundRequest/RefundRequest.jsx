import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import InputGroup from 'react-bootstrap/InputGroup';

export default function RefundRequest() {

    //^ form validation
    const [validated, setValidated] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            askRufund();
        }
        setValidated(true);
    };




    //^ Variables
    const [requestType, setRequestType] = useState('');
    const [expenseDate, setExpenseDate] = useState("");
    const [paymentType, setPaymentType] = useState("");
    const [KmNumber, setKmNumber] = useState("");
    const [refundAmount, setRefundAmount] = useState("");
    const [note, setNote] = useState("");
    const [alertMsg, setAlertMsg] = useState("");
    const [alertType, setAlertType] = useState("danger");
    const token = localStorage.getItem("token");




    //^ When the note input is required!?
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



    
    //^ Request Leave - call function
    async function askRufund() {
        const payload = {
            type: requestType,
            expense_date: expenseDate,
            kilometers: KmNumber,
            amount: refundAmount,
            payment_type: paymentType,
            note: note
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/user/refund`, {
                method: "POST",
                headers: {
                    "Authorization": token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                setAlertType("success");
                setAlertMsg("Request is sent successfully");
                setTimeout(() => { setAlertMsg(""); }, 5000);
                setValidated(false);

                setRequestType("");
                setExpenseDate("");
                setPaymentType("");
                setKmNumber("");
                setNote("");
                setRefundAmount("");
            } else {
                setAlertType("danger");
                setAlertMsg("Somthing went wrong, please try later!");
                setTimeout(() => { setAlertMsg(""); }, 5000)
            }
        } catch (err) {
            console.error(err);
        };

    }




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
                            onChange={(e) => { setExpenseDate(e.target.value) }}
                            value={expenseDate}
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
                            onChange={(e) => { setPaymentType(e.target.value) }}
                            value={paymentType}
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
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4">
                        <Form.Label>Amount refunded</Form.Label>
                        <InputGroup>
                            <Form.Control
                                onChange={(e) => { setRefundAmount(e.target.value) }}
                                value={refundAmount}
                                data-bs-theme="dark"
                                required
                                type="number"
                                min={1}
                                placeholder='Please enter the refund amount'
                            />
                            <span data-bs-theme="dark" className="input-group-text">€</span>
                        </InputGroup>
                        <Form.Control.Feedback type="invalid">
                            Please choose a valid Amount.
                        </Form.Control.Feedback>
                    </Form.Group>
                    {requestType === 'KM' && (
                        <Form.Group as={Col} md="4" controlId="validationCustom03">
                            <Form.Label>How many KM</Form.Label>
                            <Form.Control
                                onChange={(e) => { setKmNumber(e.target.value) }}
                                value={KmNumber}
                                data-bs-theme="dark"
                                required
                                type="number"
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
                            onChange={(e) => { setNote(e.target.value) }}
                            value={note}
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
                {alertMsg && <Alert variant={alertType}>{alertMsg}</Alert>}
            </Form>
        </div>
    );
}
