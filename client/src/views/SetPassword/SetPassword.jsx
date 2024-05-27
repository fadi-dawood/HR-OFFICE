import React, { useEffect, useState } from 'react'
import "./SetPassword.css"
import logoImg from "../../assets/logo/png/logo-no-background.png"
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';


export default function SetPassword() {
    //^Variables
    const [pass, setPass] = useState("");
    const [passVerify, setPassVerify] = useState("");
    const { token } = useParams();
    const navigate = useNavigate()

    //^ if you are logged-in => go to the home page
    useEffect(() => {
        if (token) {
            navigate("/home");
        }
    }, []);

    //^ Make the call to set the password
    async function handleSetPass() {
        if (!(pass === passVerify) || !pass) {
            document.getElementById("not-matching-pass-alert").classList.remove("d-none");
            setTimeout(() => { document.getElementById("not-matching-pass-alert").classList.add("d-none"); }, 5000);
            return;
        }
        try {
            const payload = {
                token: token,
                password: pass
            };
            const response = await fetch(`${process.env.REACT_APP_API_URL}/sign/setpassword`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                localStorage.setItem("token", `Bearer: ${token}`);
                navigate("/home");
            } else {
                document.getElementById("response-pass-alert").classList.remove("d-none");
                setTimeout(() => { document.getElementById("response-pass-alert").classList.add("d-none"); }, 5000);
            };

        } catch (err) {
            console.error(err);
        };
    }

    return (
        <div className=' bg-dark'>
            <Container className='set-pass-page d-flex justify-content-center'>
                <Row>
                    <Col md="auto" className='d-flex flex-column justify-content-center align-items-center'>
                        <div>
                            <img src={logoImg} alt="HR Office Logo" />
                            <p className='f-poetsen my-4 text-center'>All what you need to manage your company.</p>
                        </div>
                    </Col>
                    <Col md="auto" className='d-flex flex-column justify-content-center align-items-center'>
                        <Form>
                            <h2>Welcome on our site!</h2>
                            <hr className="mb-4" />
                            <Form.Group className="my-3" >
                                <Form.Label>Password *</Form.Label>
                                <Form.Control value={pass} onChange={(e) => { setPass(e.target.value) }} type="password" placeholder="Enter your password" />
                            </Form.Group>
                            <Form.Group className="my-3">
                                <Form.Label>Repeat your Password *</Form.Label>
                                <Form.Control value={passVerify} onChange={(e) => { setPassVerify(e.target.value) }} type="password" placeholder="Enter your password again" />
                            </Form.Group>
                            <Alert id='not-matching-pass-alert' className='p-1 d-none' variant="danger">
                                The passwords are NOT matching!
                            </Alert>
                            <div>
                                <Button onClick={handleSetPass} className="my-4" variant="light" type="button">Set Password</Button>
                            </div>
                        </Form>
                        <Alert id='response-pass-alert' className='p-1 d-none' variant="danger">
                            Somthing went wrong! Please try later.
                        </Alert>
                    </Col>
                </Row>
            </Container>
        </div>

    )
};
