import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./MyNavbar.css"

export default function MyNavbar() {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary"  bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">HR-Office</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Contacts</Nav.Link>
                        <NavDropdown title="Services" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Time register</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.1">Leave Mangment</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Expense Refund</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Resorces Booking</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.4">Overtime</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <NavDropdown title="login/name" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1">Log-in</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1">Register</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Log-out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};