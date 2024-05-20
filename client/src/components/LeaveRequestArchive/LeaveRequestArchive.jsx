import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Accordion } from 'react-bootstrap';
import moment from 'moment';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import "./LeaveRequestArchive.css"

// ChartJS : JavaScript library for creating charts
// ArcElement : it is used to draw arc-shaped elements in charts
// Tooltip : manages the display of tooltips
// Legend : manage the legend
ChartJS.register(ArcElement, Tooltip, Legend);

export default function LeaveRequestArchive() {
    //^ Variables
    const token = localStorage.getItem("token");
    const [permissions, setPermissions] = useState([]);
    const [errMsg, setErrMsg] = useState("");

    //^ Fetch function
    async function fetchPermissionArchive() {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/user/permission`, {
                method: "GET",
                headers: {
                    "Authorization": token,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setPermissions(data);
            } else {
                setErrMsg("Something went wrong, please try later ..!")
            };
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchPermissionArchive();
    }, []);

    //^ array of permission grouped by month-year
    const groupedByMonthYear = permissions.reduce((acc, permission) => {
        const monthYear = moment(permission.startDate).format('MMMM YYYY');
        if (!acc[monthYear]) {
            acc[monthYear] = [];
        }
        acc[monthYear].push(permission);
        return acc;
    }, {});
    //! it's like:
    // const groupedByMonthYear = {
    //     "April 2024": [
    //       { type: 'Day Off', startDate: new Date('2024-04-20'), status: 'Approved' },
    //       { type: 'Sickness', startDate: new Date('2024-04-18'), status: 'Requested' }
    //     ],
    //     "May 2024": [
    //       { type: 'Day Off', startDate: new Date('2024-05-15'), status: 'Approved' }
    //     ]
    //   };

    //^ object of permission grouped by status
    const statusCounts = permissions.reduce((acc, permission) => {
        if (!acc[permission.status]) {
            acc[permission.status] = 0;
        }
        acc[permission.status]++;
        return acc;
    }, {});
    //! it's like:
    // {
    //     Approved: 3,
    //     Requested: 2,
    //     Cancelled: 1
    //   }

    
    //^ the data of the Doughnut grafic
    const doughnutData = {
        labels: Object.keys(statusCounts),
        datasets: [
            {
                data: Object.values(statusCounts),
                backgroundColor: ['#76ABAE', '#e8d5c4', '#3f2d43', '#a3227d', '#51575c', '#275352'],
                borderWidth: 0,
            },
        ],
    };

    return (
        (permissions.length > 0 && !errMsg) ? (
            <Container className='LeaveRequestArchive'>
                <h1 className="my-4">Leave Archive</h1>
                <Row>
                    <Col md={8}>
                        <Accordion className='dg-dark' defaultActiveKey="0" >
                            {Object.keys(groupedByMonthYear).map((monthYear, index) => (

                                // const keys = Object.keys(groupedByMonthYear);
                                // console.log(keys); // ["April 2024", "May 2024"]

                                <Accordion.Item eventKey={index} key={monthYear}>
                                    <Accordion.Header >{monthYear}</Accordion.Header>
                                    <Accordion.Body className='dg-dark text-white'>
                                        {groupedByMonthYear[monthYear].map((permission, idx) => (
                                            <Card className="mb-3" key={idx}>
                                                <Card.Body>
                                                    <Card.Title className='d-flex justify-content-between '>
                                                        <span>{permission.type}</span>
                                                        <span>{permission.status}</span>
                                                    </Card.Title>
                                                    <Card.Text>
                                                        <div className='d-flex justify-content-between '>
                                                            <span><strong>From:</strong> {moment(permission.startDate).format('YYYY-MM-DD')} {permission.startHour}</span>
                                                            <span><strong>To:</strong> {moment(permission.endDate).format('YYYY-MM-DD')} {permission.endHour}</span>
                                                        </div>
                                                        {permission.note && (
                                                            <>
                                                                <br />
                                                                <strong>Note:</strong> {permission.note}
                                                            </>
                                                        )}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        ))}
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    </Col>
                    <Col md={4}>
                        <Card className="mb-4">
                            <Card.Header>Approval Status</Card.Header>
                            <Card.Body>
                                <Doughnut data={doughnutData} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        ) : (
            <Container className='LeaveRequestArchive'>
                <h1 className="my-4">Leave Archive</h1>
                {(errMsg && (<h3 className='f-red'>{errMsg}</h3>))}
                {(!errMsg && (<h3>You haven't made any requests yet</h3>))}
            </Container>
        )

    );
}
