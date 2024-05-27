import React, { useEffect, useState } from 'react';
import Container from "react-bootstrap/Container";
import Accordion from 'react-bootstrap/Accordion';
import SinglePost from '../../components/SinglePost/SinglePost';
import { Row, Col } from 'react-bootstrap';



export default function Home() {
    //^ Variables:
    const token = localStorage.getItem("token");
    const [posts, setPosts] = useState([]);

    //^ Fetch - get all posts:
    async function getAllPosts() {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/user/post`, {
                method: "GET",
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setPosts(data);
                console.log(data);
            }
        } catch (err) {
            console.log(err);
        }
    };



    //^ group posts into three groups based on date
    const now = new Date();
    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(now.getDate() - 7);
    const threeMonthsAgo = new Date(now);
    threeMonthsAgo.setMonth(now.getMonth() - 3);

    const newPosts = posts.filter(post => new Date(post.createdAt) >= oneWeekAgo);
    const recentPosts = posts.filter(post => new Date(post.createdAt) < oneWeekAgo && new Date(post.createdAt) >= threeMonthsAgo);
    const oldPosts = posts.filter(post => new Date(post.createdAt) < threeMonthsAgo);

    //^ Fetch - get all users:
    const [admins, setAdmins] = useState([]);
    async function getAllEmployee() {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/user/admins`, {
                method: "GET",
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setAdmins(data);
            }
        } catch (err) {
            console.log(err);
        }
    };



    useEffect(() => {
        getAllPosts();
        getAllEmployee();
    }, []);



    return (
        <div className='home-page bg-dark py-5'>
            <Container>
                <h2 className='mb-5 f-poetsen f-green'>Welcome back {localStorage.getItem("loggedUserName")} {localStorage.getItem("loggedUserLastname")}</h2>
                <Row className='justify-content-between my-5'>


                    <Col className=" col-12 col-lg-5">
                        <h3 className='mb-3'>All the announcement:</h3>
                        <div className=' p-2'>
                            <Accordion defaultActiveKey="0">

                                <Accordion.Item eventKey="1">
                                    <Accordion.Header className='f-poetsen f-green'>This week:</Accordion.Header>
                                    <Accordion.Body>
                                        {newPosts.map((post, index) => (
                                            <SinglePost key={post.id} post={post} index={index} />
                                        ))}
                                    </Accordion.Body>
                                </Accordion.Item>

                                {recentPosts.length > 0 &&
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header className='f-poetsen f-green'>Last 3 months</Accordion.Header>
                                        <Accordion.Body>
                                            {recentPosts.map((post, index) => (
                                                <SinglePost key={post.id} post={post} index={index} />
                                            ))}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                }
                                {oldPosts.length > 0 &&
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header className='f-poetsen f-green'>Old Posts</Accordion.Header>
                                        <Accordion.Body>
                                            {oldPosts.map((post, index) => (
                                                <SinglePost key={post.id} post={post} index={index} />
                                            ))}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                }
                            </Accordion>
                        </div>
                    </Col>

                    <Col className="col-12 col-lg-3 ">
                        <h3 className='mb-3'>Events:</h3>
                        <div className='border p-2'>

                        </div>

                    </Col>

                    <Col className="col-12 col-lg-4 ">
                        <h3 className='mb-3'>Useful Contacts:</h3>
                        <div className='border p-2'>
                            {admins.map((admin, i) => {
                                return (
                                    <div key={i}>
                                        <div>
                                            <span>{admin.role}</span>
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <p>{admin.name} {admin.last_name}</p>
                                            <p>{admin.company_mail}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </Col>


                </Row>

            </Container>
        </div>
    );
}
