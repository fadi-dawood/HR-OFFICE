import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import DashboardRequests from './DashboardRequests/DashboardRequests.jsx';




export default function Dashboard() {
    return (
        <div className='dashboard-page bg-dark py-5'>
            <Container fluid="sm">
                <h2 className='mb-5'>{`Welcome back ${localStorage.getItem("loggedUserName")} ${localStorage.getItem("loggedUserLastname")}`}</h2>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">Management of requests</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <DashboardRequests />
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
        </div>
    )
}
