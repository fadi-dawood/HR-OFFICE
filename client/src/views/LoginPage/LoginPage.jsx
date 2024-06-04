import React, { useContext, useEffect, useState } from 'react'
import "./LoginPage.css"
import logoImg from "../../assets/logo/png/logo-no-background.png"
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../../context/UserDataContextProvider.jsx';
import Alert from 'react-bootstrap/Alert';
import { AuthContext } from '../../context/AuthContextProvider.jsx';

export default function LoginPage() {
    //^ Variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const { setLoggedUserName, setLoggedUserLastname, setAdmin } = useContext(UserDataContext);
    const { token, setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    //^ if you are logged-in => go to the home page
    useEffect(() => {
        if (token) {
            navigate("/home");
            return;
        }
    }, [token]);

    //^ show allert function
    function showAllert() {
        document.getElementById("login-alert").classList.remove("d-none");
        setTimeout(() => { document.getElementById("login-alert").classList.add("d-none"); }, 5000);
    };

    //^ hundle login function
    async function handleLogin() {

        const payload = {
            email: email,
            password: password
        };
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/sign/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                const userData = await response.json();
                setLoggedUserName(userData.user.name);
                setLoggedUserLastname(userData.user.last_name);
                setAdmin(userData.user.isAdmin);
                setToken(`Bearer ${userData.token}`);
                
            } else if (response.status == 404) {
                setLoginError("Wrong Email!");
                showAllert();
            } else if (response.status == 400) {
                setLoginError("Wrong password!");
                showAllert();
            } else {
                setLoginError("Something went wrong!");
                showAllert();
            }
            return;
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className=' bg-dark'>
            <Container className='login-page full-height d-flex justify-content-center'>
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
                                <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
                                <Form.Text className="f-grey">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="my-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                            </Form.Group>
                            <Alert id='login-alert' className='p-1 d-none' variant="danger">
                                {loginError}
                            </Alert>
                            <div>
                                <Button onClick={handleLogin} className="my-4" variant="light" type="button">Log in</Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>

    )
};
