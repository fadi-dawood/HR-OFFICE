import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./RegisterHours.css";
import { Row, Col } from 'react-bootstrap';
import ClientsListMenu from '../../../components/ClientsListMenu/ClientsListMenu.jsx';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import RegisteredHoursList from '../../../components/RegisterHoursList/RegisteredHoursList.jsx';


export default function RegisterHours() {

  //^ Variables:
  const [date, satDate] = useState(new Date());
  const [clientId, setClientId] = useState("");
  const [hoursNum, setHoursNum] = useState();
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("danger");
  const token = localStorage.getItem("token");
  const [registeredHours, setRegisteredHours] = useState([]);






  //^ fetch - get all the hours of this day:
  async function getAllHours() {
    // the date variable
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/hours?date=${dateString}`, {
        method: "GET",
        headers: {
          "Authorization": token,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setAlertMsg("");
        setRegisteredHours(data);
      } else {
        setAlertMsg("Sorry! Something went wrong, please try later!");
        setTimeout(() => { setAlertMsg("") }, 5000);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (err) {
    }
  }




  //^ call the function when updating the date
  useEffect(() => { getAllHours() }, [date]);





  //^ fetch - register new hour:
  async function registerHours() {
    // the date variable
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/hours`, {
        method: "POST",
        headers: {
          "Authorization": token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          date: dateString,
          hours_number: hoursNum,
          client: clientId
        })
      });

      if (response.ok) {
        setValidated(false);

        setClientId("");
        setHoursNum();
        getAllHours();
      } else {
        setAlertType("danger");
        setAlertMsg("Sorry! Something went wrong, please try later!");
        setTimeout(() => { setAlertMsg("") }, 5000);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (err) {
      console.error(err);
    }
  }





  //^ Delete registered hour
  async function deleteHour(hourId) {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/hours/${hourId}`, {
        method: "DELETE",
        headers: {
          "Authorization": token,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        getAllHours();
      } else {
        setAlertType("danger");
        setAlertMsg("Sorry! Something went wrong, please try later!");
        setTimeout(() => { setAlertMsg("") }, 5000);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (err) {
      console.error(err);
    }
  }





  //^ Control date
  function dateControl(selectedDate) {
    satDate(selectedDate);
    getAllHours();
  }




  //^ add a css class to weekend's days
  function tileClassName({ date, view }) {
    if (view === 'month') {
      if (date.getDay() === 0 || date.getDay() === 6) {
        return 'weekend';
      }
    }
    return null;
  }



  //^ Validation form
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }else{
      registerHours();
    }

    setValidated(true);
  };





  return (
    <div>
      <Row>
        <Col md={6}>
        {alertMsg && <Alert variant={alertType}>{alertMsg}</Alert>}

          <RegisteredHoursList registeredHours={registeredHours} deleteHour={deleteHour}></RegisteredHoursList>

          <h3 className='f-poetsen f-green'>Add hours: </h3>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Client</Form.Label>
                <ClientsListMenu
                  setClientId={setClientId}
                  clientId={clientId}
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
                  value={hoursNum}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid state.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button type="submit">Add hours</Button>
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
