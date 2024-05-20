import React from 'react';
import LeaveRequest from '../LeaveRequest/LeaveRequest.jsx';
import OverTimeRequest from '../OverTimeRequest/OverTimeRequest.jsx';
import RefundRequest from '../RefundRequest/RefundRequest.jsx';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import LeaveRequestArchive from '../LeaveRequestArchive/LeaveRequestArchive.jsx';

export default function AllRequest() {
    return (
        <div>
            <Tabs
                defaultActiveKey="Leave mangment"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="Leave mangment" title="Leave mangment" >
                    <LeaveRequestArchive />
                    <hr className='my-5'/>
                    <LeaveRequest />
                </Tab>
                <Tab eventKey="Over time mangment" title="Over time mangment">
                    <OverTimeRequest />
                </Tab>
                <Tab eventKey="Refund mangment" title="Refund mangment">
                    <RefundRequest />
                </Tab>
            </Tabs>
        </div>
    )
}
