import React from 'react';
import UserInfoSec from './UserInfoSec/UserInfoSec.jsx';
import { Container, Row, Col } from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import AllRequest from './AllRequests/AllRequest.jsx';
import RegisterHours from './RegisterHours/RegisterHours.jsx';
import "./Profile.css";


export default function
    () {
    return (
        <div className='profile-page bg-dark py-5'>
            <Container fluid="sm">
                <h2 className='mb-5'>{`Welcome back ${localStorage.getItem("loggedUserName")} ${localStorage.getItem("loggedUserLastname")}`}</h2>
                <Tab.Container id="left-tabs-example" defaultActiveKey="second">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">Management of requests</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Register working hours</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="third">Personal information</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <AllRequest />
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <RegisterHours />
                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                    <UserInfoSec />
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
        </div>
    )
}
