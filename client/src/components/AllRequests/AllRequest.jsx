import React, { useEffect, useState } from 'react';
import LeaveRequest from '../LeaveRequest/LeaveRequest.jsx';
import OverTimeRequest from '../OverTimeRequest/OverTimeRequest.jsx';
import RefundRequest from '../RefundRequest/RefundRequest.jsx';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import DataArchive from '../DataArchive/DataArchive.jsx';



export default function AllRequest() {
    //^ Variables
    const [permissions, setPermissions] = useState([]);
    const [overTimeRequests, setOverTimeRequests] = useState([]);
    const [refundRequests, setRefund] = useState([]);
    const token = localStorage.getItem("token");
    const [errPermissionsMsg, setPermissionErrMsg] = useState("");
    const [errOverTimesMsg, setOverTimeErrMsg] = useState("");
    const [errRefundsMsg, setRefundErrMsg] = useState("");

    //^ Fetch function - Permission data request
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
                setPermissionErrMsg("Something went wrong, please try later ..!")
            };
        } catch (err) {
            console.log(err);
        }
    };


    //^ Fetch function - overtime data request
    async function fetchOverTimeArchive() {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/user/overtime`, {
                method: "GET",
                headers: {
                    "Authorization": token,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setOverTimeRequests(data);
            } else {
                setOverTimeErrMsg("Something went wrong, please try later ..!")
            };
        } catch (err) {
            console.log(err);
        }
    };


    //^ Fetch function - Refund data request
    async function fetchRefundArchive() {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/user/refund`, {
                method: "GET",
                headers: {
                    "Authorization": token,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setRefund(data);
            } else {
                setRefundErrMsg("Something went wrong, please try later ..!")
            };
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchPermissionArchive();
        fetchOverTimeArchive();;
        fetchRefundArchive()
    }, []);

    useEffect(() => {
    }, [permissions]);

    return (
        <div>
            <Tabs
                defaultActiveKey="Leave mangment"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="Leave mangment" title="Leave mangment" >
                    <h1 className="my-4 ms-2">Leave Archive</h1>
                    <DataArchive dataArray={permissions} />
                    {(errPermissionsMsg && (<h3 className='f-red'>{errPermissionsMsg}</h3>))}
                    <hr className='my-5' />
                    <LeaveRequest />
                </Tab>
                <Tab eventKey="Over time mangment" title="Over time mangment">
                    <h1 className="my-4 ms-2">Overtime Archive</h1>
                    <DataArchive dataArray={overTimeRequests} />
                    {(errOverTimesMsg && (<h3 className='f-red'>{errOverTimesMsg}</h3>))}
                    <hr className='my-5' />
                    <OverTimeRequest />
                </Tab>
                <Tab eventKey="Refund mangment" title="Refund mangment">
                    <h1 className="my-4 ms-2">Refund Archive</h1>
                    <DataArchive dataArray={refundRequests} />
                    {(errRefundsMsg && (<h3 className='f-red'>{errRefundsMsg}</h3>))}
                    <hr className='my-5' />
                    <RefundRequest />
                </Tab>
            </Tabs>
        </div>
    )
}
