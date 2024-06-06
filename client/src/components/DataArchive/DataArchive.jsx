import React from 'react';
import { Container, Row, Col, Card, Accordion } from 'react-bootstrap';
import moment from 'moment';
import CircleAnalytics from '../CircleAnalytics/CircleAnalytics.jsx';
import "./DataArchive.css";


export default function DataArchive({ dataArray = [] }) {


    //^take the date according to the dataArray to generate "groupedByMonthYear"
    function getDate(data) {
        if (data.startDate) { return data.startDate };
        if (data.expense_date) { return data.expense_date };
        if (data.date) { return data.date };
        return null;
    }




    //^ array of permission grouped by month-year
    const groupedByMonthYear = dataArray.reduce((acc, data) => {
        const date = getDate(data);
        if (date) {
            const monthYear = moment(date).format('MMMM YYYY');
            if (!acc[monthYear]) {
                acc[monthYear] = [];
            }
            acc[monthYear].push(data);
            return acc;
        };
    }, {});

    //? in other words:
    // const groupedByMonthYear = {
    //     "April 2024": [
    //       { type: 'Day Off', startDate: new Date('2024-04-20'), status: 'Approved' },
    //       { type: 'Sickness', startDate: new Date('2024-04-18'), status: 'Requested' }
    //     ],
    //     "May 2024": [
    //       { type: 'Day Off', startDate: new Date('2024-05-15'), status: 'Approved' }
    //     ]
    //   };



    

    return (
        (dataArray.length > 0) ? (
            <Container className='dataArchive'>
                <Row>
                    <Col className='my-2' md={8}>
                        <Accordion className='dg-dark' defaultActiveKey="0" >
                            {Object.keys(groupedByMonthYear).map((monthYear, index) => (

                                // const keys = Object.keys(groupedByMonthYear);
                                // console.log(keys); // ["April 2024", "May 2024"]

                                <Accordion.Item eventKey={index} key={monthYear}>
                                    <Accordion.Header >{monthYear}</Accordion.Header>
                                    <Accordion.Body className='dg-dark text-white'>
                                        {groupedByMonthYear[monthYear].map((data, idx) => (
                                            <Card className="mb-3" key={idx}>
                                                <Card.Body>
                                                    <div className='d-flex justify-content-between '>
                                                        <Card.Title>
                                                            <span>{data.hours_number || data.amount || data.type}</span>
                                                            {data.hours_number && <span> hours</span>}
                                                            {data.amount && <span> Euro</span>}
                                                        </Card.Title>
                                                        <Card.Title>
                                                            <span>{data.state}</span>
                                                        </Card.Title>
                                                    </div>
                                                    {data.startDate &&
                                                        <>
                                                            <span className='d-block'><strong>From:</strong> {moment(data.startDate).format('YYYY-MM-DD')} {data.startHour}</span>
                                                            <span><strong>To:</strong> {moment(data.endDate).format('YYYY-MM-DD')} {data.endHour}</span>
                                                        </>
                                                    }
                                                    {data.expense_date &&
                                                        <>
                                                            <span className='d-block'><strong>Expense Type:</strong> {data.type === "KM" && (<span>{data.kilometers}</span>)} {data.type}</span>
                                                            <span><strong>Expense Date:</strong> {moment(data.expense_date).format('YYYY-MM-DD')}</span>
                                                        </>
                                                    }
                                                    {data.date &&
                                                        <>
                                                            <span className='d-block'><strong>Date:</strong> {moment(data.date).format('YYYY-MM-DD')}</span>
                                                        </>
                                                    }
                                                    {data.note && (
                                                        <>
                                                            <span className='d-block'><strong>Note:</strong> {data.note}</span>
                                                        </>
                                                    )}
                                                </Card.Body>
                                            </Card>
                                        ))}
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    </Col>
                    <Col className='my-2' md={4}>
                        <CircleAnalytics dataArray={dataArray} />
                    </Col>
                </Row>
            </Container >
        ) : (
            <Container className='dataArchive'>
                <h3>You haven't made any requests yet</h3>
            </Container>
        )
    );
}
