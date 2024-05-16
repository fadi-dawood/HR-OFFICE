import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import logoImg from "../../assets/logo/png/logo-no-background.png"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import './MyFooter.css';


export default function MyFooter() {
    return (
        <footer className='pt-1 pb-5 bg-dark '>
            <Container >
                <div className='py-4 d-flex justify-content-between align-items-center'>
                    <img className='logo' src={logoImg} alt="HR Office Logo" />
                    <div>
                        <p className='f-poetsen fs-3'>The solution for your company!</p>
                    </div>
                </div>
                <Row>
                    <Col xs={6} md={3} className='my-3'>
                        <h4 className='mb-1'>Our services:</h4>
                        <li><a href="...">Time Register</a></li>
                        <li><a href="...">Leave Mangment</a></li>
                        <li><a href="...">Expense Refund</a></li>
                        <li><a href="...">Resorce Booking</a></li>
                        <li><a href="...">Over Time</a></li>
                    </Col>
                    <Col  xs={6} md={3} className='my-3'>
                        <h4 className='mb-1'>General Info:</h4>
                        <li>Mobile +39 0101010101</li>
                        <li>Fax +39 0101010101</li>
                        <li>Assistent: help@hroffice.it</li>
                        <li>hroffice@pec.it</li>
                        <li>P.iva 01010101010</li>
                    </Col>
                    <Col  xs={6} md={3} className='my-3'>
                        <h4 className='mb-1'>Privacy:</h4>
                        <li><a href="...">Privacy</a></li>
                        <li><a href="...">Governance e certificazioni</a></li>
                        <li><a href="...">Cookies policy</a></li>
                    </Col>
                    <Col  xs={12} md={3} className='text-center my-3'>
                        <p  className='mb-1'>Follow us on:</p>
                        <div className='f-roboto-regular d-flex justify-content-center align-items-center'>
                            <a href="https://www.facebook.com" target="_blank">
                                <FontAwesomeIcon style={{ height: "25px" }} icon={faFacebookSquare} />
                            </a>
                            <a className='f-roboto-regular' href="https://www.instagram.com" target="_blank">
                                <FontAwesomeIcon style={{ height: "25px" }} className='mx-3' icon={faInstagram} />
                            </a>
                            <a className='f-roboto-regular' href="https://www.instagram.com" target="_blank">
                                <FontAwesomeIcon style={{ height: "25px" }} icon={faTwitter} />
                            </a>
                        </div>
                    </Col>
                </Row>
                <div>

                </div>
            </Container>
        </footer>
    )
}
