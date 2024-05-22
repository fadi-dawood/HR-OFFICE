import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./RegisterHours.css";
import { Container, Row, Col, Card, Accordion } from 'react-bootstrap';
import ClientsList from '../../components/ClientsList/ClientsList.jsx';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


export default function RegisterHours() {
  const [date, satDate] = useState(new Date());
  const [client, setClient] = useState("");
  const [hoursNum, setHoursNum] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const token = localStorage.getItem("token");

  const [registeredHours, setRegisteredHours] = useState([]);

  // fetch - get all the hours of this day:
  async function getAllHours() {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/hours`, {
        method: "GET",
        headers: {
          "Authorization": token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ date: date })
      });

      if (response.ok) {
        const data = await response.json();
        setErrMsg("");
        console.log(data);
      } else {
        console.log(date)
        setErrMsg("Sorry! Something went wrong, please try later!");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (err) {

    }
  }

  useEffect(() => { getAllHours() }, [date]);

  // fetch - register new hour:
  async function registerHours() {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/hours`, {
        method: "POST",
        headers: {
          "Authorization": token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          date: date,
          hours_number: hoursNum,
          client: client
        })
      });

      if (response.ok) {
        const data = await response.json();
        setRegisteredHours(data);
      } else {
        setErrMsg("Sorry! Something went wrong, please try later!");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (err) {
      console.error(err);
    }
  }



  // Control date
  function dateControl(nextValue) {
    satDate(nextValue);
    console.log(date)
    getAllHours();
  }

  function tileClassName({ date, view }) {
    if (view === 'month') {
      if (date.getDay() === 0 || date.getDay() === 6) {
        return 'weekend';
      }
    }
    return null;
  }


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
      <Row>
        <Col md={6}>
          {errMsg && <p className='f-red'>{errMsg}</p>}
          {registeredHours.map((element, index) => (
            <p key={index}>{element.hours_number}</p>
          ))}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Client</Form.Label>
                <ClientsList
                  setClient={setClient}
                />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom04">
                <Form.Label>Hours Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="hours"
                  data-bs-theme="dark"
                  required
                  onChange={(e) => { setHoursNum(e.target.value) }}
                  value={hoursNum} />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid state.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button onClick={registerHours} type="button">Add hours</Button>
          </Form>
        </Col>
        <Col className='my-2' md={6}>
          <Calendar
            className='calender bg-black'
            onChange={dateControl}
            value={date}
            tileClassName={tileClassName}
          />
        </Col>
      </Row>
    </div>
  );
}
