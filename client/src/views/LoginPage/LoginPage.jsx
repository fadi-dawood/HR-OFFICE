import React from 'react'
import "./LoginPage.css"
import logoImg from "../../assets/logo/png/logo-no-background.png"
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function LoginPage() {



    
    return (
        <div className=' bg-dark'>
            <Container className='login-page d-flex justify-content-center'>
                <Row>
                    <Col md="auto" className='d-flex flex-column justify-content-center align-items-center'>
                        <div>
                            <img src={logoImg} alt="HR Office Logo" />
                            <p className='f-poetsen my-4 text-center'>All what you need to manage your company.</p>
                        </div>
                    </Col>
                    <Col md="auto" className='d-flex flex-column justify-content-center align-items-center'>
                        <Form>
                            <h2>Welcome back!</h2>
                            <hr className="mb-4" />
                            <Form.Group className="my-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                                <Form.Text className="f-grey">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="my-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <div>
                                <Button className="my-4" variant="light" type="button">Log in</Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>

    )
};
