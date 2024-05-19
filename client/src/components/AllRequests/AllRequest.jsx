import React from 'react';
import LeaveRequest from '../LeaveRequest/LeaveRequest.jsx';
import OverTimeRequest from '../OverTimeRequest/OverTimeRequest.jsx';
import RefundRequest from '../RefundRequest/RefundRequest.jsx';

export default function AllRequest() {
    return (
        <div>
            <LeaveRequest />
            <OverTimeRequest/>
            <RefundRequest/>
        </div>
    )
}
