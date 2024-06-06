import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import "./NewPost.css";


export default function NewPost() {

    //^ Variables
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const token = localStorage.getItem("token");




    //^ Check that the form is competed (Submit Function)
    const [validated, setValidated] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false || !text) {
            event.stopPropagation();
            setErrMsg("All fields are required");
            setTimeout(() => setErrMsg(""), 5000);
        } else {
            sendNewPost();
        }
        setValidated(true);
    };




    //^ Post a new post - fetch function:
    const sendNewPost = async () => {
        const payload = {
            title: title,
            content: text
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/post`, {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                setErrMsg("Somthing went wrong, please try again later!");
                setTimeout(() => {
                    setErrMsg("");
                }, 5000);
                throw new Error('Network response was not ok');
            } else {
                // Reset the form
                setTitle("");
                setText("");
                setValidated(false);
            }

        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }

    };




    return (
        <Container className="new-blog-container" >
            <Form className="mt-5" noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="12" controlId="validationCustom03">
                        <Form.Label>Title*</Form.Label>
                        <Form.Control data-bs-theme="dark" required value={title} size="lg" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mt-5 mb-3" as={Col} md="12" controlId="validationCustom04">
                        <Form.Label>Post content*</Form.Label>
                        <ReactQuill theme="snow" required value={text} onChange={setText} />
                    </Form.Group>
                </Row>

                < Button
                    type="submit"
                    size="lg"
                    variant="primary"
                >
                    Post
                </Button>
            </Form>

            {errMsg && <Alert className="mt-3" variant="danger">
                {errMsg}
            </Alert>}
        </Container >
    );
};

