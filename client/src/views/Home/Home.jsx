import React, { useEffect, useState } from 'react';
import Container from "react-bootstrap/Container";
import Accordion from 'react-bootstrap/Accordion';
import SinglePost from '../../components/SinglePost/SinglePost';
import { Row, Col } from 'react-bootstrap';

export default function Home() {
    const token = localStorage.getItem("token");
    const [posts, setPosts] = useState([]);
    const [events, setEvents] = useState([]);
    const [admins, setAdmins] = useState([]);

    // Fetch - get all posts:
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

    // Fetch - get all events:
    async function getAllEvents() {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/user/event`, {
                method: "GET",
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setEvents(data.reverse().slice(0, 10));
                console.log(data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    // Fetch - get all users:
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
        console.log(token);
        if (token) {
            getAllPosts();
            getAllEmployee();
            getAllEvents();
        }
    }, []);

    // Group posts into three groups based on date
    const now = new Date();
    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(now.getDate() - 7);
    const threeMonthsAgo = new Date(now);
    threeMonthsAgo.setMonth(now.getMonth() - 3);

    const newPosts = posts.filter(post => new Date(post.createdAt) >= oneWeekAgo).reverse();
    const recentPosts = posts.filter(post => new Date(post.createdAt) < oneWeekAgo && new Date(post.createdAt) >= threeMonthsAgo).reverse();
    const oldPosts = posts.filter(post => new Date(post.createdAt) < threeMonthsAgo).reverse();

    const getEventDayLabel = (eventDate) => {
        const event = new Date(eventDate);
        const isToday = event.toDateString() === now.toDateString();
        const isTomorrow = event.toDateString() === new Date(now.setDate(now.getDate() + 1)).toDateString();
        now.setDate(now.getDate() - 1); // Reset the date change
        return isToday ? "Today" : isTomorrow ? "Tomorrow" : eventDate.slice(0, 10);
    };

    const formatTime = (time) => {
        const [hours, minutes] = time.split(':');
        return `${hours}:${minutes}`;
    };

    return (
        <div className='home-page bg-dark py-5'>
            <Container>
                <h2 className='mb-5 f-poetsen f-green'>Welcome back {localStorage.getItem("loggedUserName")} {localStorage.getItem("loggedUserLastname")}</h2>
                <Row className='justify-content-between my-5'>
                    <Col className="col-12 col-lg-8">
                        <h3 className='mb-3'>All the announcements:</h3>
                        <div className='p-2'>
                            <Accordion defaultActiveKey="0">
                                {newPosts.map((post, index) => (
                                    <SinglePost key={post.id} post={post} index={index} />
                                ))}
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
                    <Col className="col-12 col-lg-3">
                        <div className='mt-4'>
                            <h3 className='mb-3'>Events:</h3>
                            <div className='border p-2'>
                                {events.map((event, index) => (
                                    <div key={index}>
                                        <div className='d-flex justify-content-between align-items-center mb-3'>
                                            <div>
                                                <h3 className='f-pink f-poetsen'>{event.event_name}</h3>
                                            </div>
                                            <div>
                                                <p className='m-0 f-grey f-roboto-light'>
                                                    {getEventDayLabel(event.date)}
                                                </p>
                                                <p className='m-0 f-grey f-roboto-light'>{formatTime(event.start_at)} - {formatTime(event.end_at)}</p>
                                            </div>
                                        </div>
                                        <p className='f-grey m-0 f-roboto-light'>Organizer: <span>{event.organizer}</span></p>
                                        <p className='f-grey m-0 f-roboto-light'>Summary: <span>{event.summary}</span></p>
                                        {index + 1 !== events.length && <hr />}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='mt-5'>
                            <h3 className='mb-3'>Useful Contacts:</h3>
                            <div className='border p-2'>
                                {admins.map((admin, i) => (
                                    <div key={i}>
                                        <div>
                                            <span>{admin.role}</span>
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <p>{admin.name} {admin.last_name}</p>
                                            <p>{admin.company_mail}</p>
                                        </div>
                                        <hr />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
