import React from 'react';
import { Card } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


// ChartJS : JavaScript library for creating charts
// ArcElement : it is used to draw arc-shaped elements in charts
// Tooltip : manages the display of tooltips
// Legend : manage the legend
ChartJS.register(ArcElement, Tooltip, Legend);


export default function CircleAnalytics({ dataArray = [] }) {

    //^ object of permission grouped by status
    const statusCounts = dataArray.reduce((acc, data) => {
        if (!acc[data.state]) {
            acc[data.state] = 0;
        }
        acc[data.state]++;
        return acc;
    }, {});
    
    //! in other words:
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
        <>
            <Card className="mb-4">
                <Card.Header>Approval Status</Card.Header>
                <Card.Body>
                    <Doughnut data={doughnutData} />
                </Card.Body>
            </Card>
        </>
    )
}
