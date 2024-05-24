import React from 'react';
import UserInfoSec from './UserInfoSec/UserInfoSec.jsx';
import { Container, Button, Row, Col, Alert } from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import "./Profile.css"
import Nav from 'react-bootstrap/Nav';
import AllRequest from './AllRequests/AllRequest.jsx';
import RegisterHours from './RegisterHours/RegisterHours.jsx';


export default function
    () {
    return (
        <div className='profile-page bg-dark py-5'>
            <Container fluid="sm">
                <h2 className='mb-5'>{`Welcome back ${localStorage.getItem("loggedUserName")} ${localStorage.getItem("loggedUserLastname")}`}</h2>
                <Tab.Container id="left-tabs-example" defaultActiveKey="third">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">Personal information</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Management of requests</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="third">Register working hours</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="fourth">Book resources</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <UserInfoSec />
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <AllRequest />
                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                    <RegisterHours />
                                  
                                </Tab.Pane>
                                <Tab.Pane eventKey="fourth">

                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
        </div>
    )
}
