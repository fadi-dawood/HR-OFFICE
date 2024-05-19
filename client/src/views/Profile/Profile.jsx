import React from 'react';
import UserInfoSec from '../../components/UserInfoSec/UserInfoSec.jsx';
import { Container, Button, Row, Col, Alert } from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import "./Profile.css"
import Nav from 'react-bootstrap/Nav';
import AllRequest from '../../components/AllRequests/AllRequest.jsx';



export default function
    () {
    return (
        <div className='home-page bg-dark py-5'>
            <Container fluid="sm">
                <h2 className='mb-5'>{`Welcome back ${localStorage.getItem("loggedUserName")} ${localStorage.getItem("loggedUserLastname")}`}</h2>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">Personal information</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Make a new request</Nav.Link>
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
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>





            </Container>
        </div>
    )
}
