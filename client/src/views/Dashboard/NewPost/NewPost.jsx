import React, { useCallback, useRef, useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import draftToHtml from "draftjs-to-html";
import ReacrQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import "./NewPost.css";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';

import Alert from 'react-bootstrap/Alert';


export default function NewPost() {

    //^ Variables
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const token = localStorage.getItem("token");
    const [errMsg, setErrMsg] = useState("");

    //^ Check that the form is competed
    const [validated, setValidated] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        setValidated(true);
        if (!text) {
            setErrMsg("You can't send a post without a content");
            setTimeout(() => {
                setErrMsg("");
            }, 5000);
            return;
        }
        if (title && text) {
            sendNewPost();
        }
    };



    //^ fetch a new post:
    const sendNewPost = async event => {
        event.preventDefault();

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
                resetForm();
            }


        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }


    };



    //^ Reset the form
    function resetForm() {
        setTitle("");
        setText("");
    };


    return (
        <Container className="new-blog-container" >
            <Form className="mt-5" noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="12" controlId="validationCustom03">
                        <Form.Label>Titolo*</Form.Label>
                        <Form.Control data-bs-theme="dark" required value={title} size="lg" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="12" controlId="validationCustom04">
                        <Form.Label>Contenuto Blog*</Form.Label>
                        <ReacrQuill theme="snow" required value={text} onChange={setText} />
                    </Form.Group>
                </Row>

                < Button
                    type="submit"
                    size="lg"
                    variant="primary"
                    className="my-4"
                >
                    Post
                </Button>
            </Form>

            {errMsg && <Alert variant="danger">
                {errMsg}
            </Alert>}
        </Container >
    );
};

