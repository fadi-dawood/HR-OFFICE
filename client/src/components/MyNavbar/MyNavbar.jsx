import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./MyNavbar.css"
import logoImg from "../../assets/logo/png/logo-no-background.png"
import { useContext, useEffect } from 'react';
import { UserDataContext } from '../../context/UserDataContextProvider.jsx';

export default function MyNavbar() {
    const { loggedUserName, loggedUserLastname } = useContext(UserDataContext);

    useEffect(() => {
    }, [loggedUserName, loggedUserLastname]);


    //^ Log-out function
    function hundleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedUserLastname");
        localStorage.removeItem("admin");
        localStorage.removeItem("loggedUserName");
        localStorage.removeItem("authenticated");
        window.location.reload();
    };

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
            <Container >
                <Navbar.Brand href="/home">
                    <img
                        src={logoImg}
                        height="50"
                        className="d-inline-block align-top"
                        alt="logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/Home">Home</Nav.Link>
                        <Nav.Link href="/profile">Your profile</Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown title={`${loggedUserName} ${loggedUserLastname}`} id="basic-nav-dropdown">
                            <NavDropdown.Item href="profile">Profile</NavDropdown.Item>
                            {(localStorage.getItem("admin") !== "") &&
                                < NavDropdown.Item href="dashboard">Dashboard</NavDropdown.Item>
                            }
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={hundleLogout}>
                            Log-out
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Container>

        </Navbar >
    );
};