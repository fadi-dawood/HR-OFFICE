import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPaperPlane, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Container } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Form } from "react-bootstrap";
import "./PostListTable.css"

export default function PostListTable() {

    //^ Variables
    const [posts, setPosts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingPostId, setEditingPostId] = useState(null);
    const [updatedPost, setUpdatedPost] = useState({ title: '', content: '' });
    const token = localStorage.getItem("token");




    //^ Get All posts - Fetch Function
    async function getAllPosts() {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/user/post`, {
                method: "GET",
                headers: {
                    "Authorization": token,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setPosts(data);
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (err) {
            console.error(err);
        }
    }




    //^ Update a post - Fetch Function
    async function updatePost(postId) {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/post/${postId}`, {
                method: "PUT",
                headers: {
                    "Authorization": token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedPost)
            });
            if (response.ok) {
                await getAllPosts();
                setShowModal(false);
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (err) {
            console.error(err);
        }
    }




    //^ Delete a post - Fetch Function
    async function deletePost(postId) {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/post/${postId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": token,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                await getAllPosts();
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (err) {
            console.error(err);
        }
    }




    //^ UseUffect
    useEffect(() => { getAllPosts(); }, []);




    //^ Open Modal
    const handleEditClick = (post) => {
        setEditingPostId(post._id);
        setUpdatedPost({
            title: post.title,
            content: post.content
        });
        setShowModal(true);
    };




    //^ preparing the updated info in  
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedPost({ ...updatedPost, [name]: value });
    };




    //^ close Modal
    const handleCloseModal = () => {
        setShowModal(false);
        setEditingPostId(null);
    };






    return (
        <Container fluid="sm">
            <h3 className='f-poetsen f-green'>List of Posts: </h3>
            <Table striped bordered hover size='md'>
                <thead>
                    <tr>
                        <th className='align-middle bg-dark f-white border-0'>#</th>
                        <th className='align-middle bg-dark f-white border-0'>Title</th>
                        <th className='align-middle bg-dark f-white border-0'>Content</th>
                        <th className='align-middle bg-dark f-white border-0'>Modify</th>
                        <th className='align-middle bg-dark f-white border-0'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post, index) => (
                        <tr key={post._id}>
                            <td className='align-middle bg-dark f-white border-0'>{index + 1}</td>
                            <td className='align-middle bg-dark f-white border-0'>{post.title}</td>
                            <td className='align-middle bg-dark f-white border-0'>
                                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                            </td>
                            <td className='align-middle bg-dark f-white border-0'>
                                <Button onClick={() => handleEditClick(post)} className='mx-1' variant="primary">
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </Button>
                            </td>
                            <td className='align-middle bg-dark f-white border-0'>
                                <Button onClick={() => deletePost(post._id)} className='mx-1' variant="danger">
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal className='edit-post-modal' show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title >Edit Post</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Form >
                        <Form.Group controlId="formTitle">
                            <Form.Label >Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={updatedPost.title}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formContent">
                            <Form.Label  >Content</Form.Label>
                            <ReactQuill
                                theme="snow"

                                value={updatedPost.content}
                                onChange={(value) => setUpdatedPost({ ...updatedPost, content: value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={() => updatePost(editingPostId)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
