import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AllLeaveRequests from '../../../components/AllLeaveRequests/AllLeaveRequests.jsx';
import AllOvertimeRequests from '../../../components/AllOvertimeRequests/AllOvertimeRequests.jsx';
import AllRefundRequests from '../../../components/AllRefundRequests/AllRefundRequests.jsx';


export default function DashboardRequests() {
    const token = localStorage.getItem("token");


    //^ Fetch function - get all permission requests
    const [allLeaveRequests, setAllLeaveRequests] = useState([]);
    const [errPermissionsMsg, setPermissionErrMsg] = useState("");
    async function newPermissionRequests() {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/permission`, {
                method: "GET",
                headers: {
                    "Authorization": token,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setAllLeaveRequests(data);
            } else {
                setPermissionErrMsg("Something went wrong, please try later ..!");
                setTimeout(() => {
                    setPermissionErrMsg("")
                }, 5000);
            };
        } catch (err) {
            console.log(err);
            setPermissionErrMsg("Something went wrong, please try later ..!");
            setTimeout(() => {
                setPermissionErrMsg("")
            }, 5000);
        }
    };


    //^ Fetch function - get all overtime requests
    const [allOvertimeRequests, setAllOvertimeRequests] = useState([]);
    const [overtimeErrMsg, setOvertimeErrMsg] = useState("");
    async function newOvertimeRequests() {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/overtime`, {
                method: "GET",
                headers: {
                    "Authorization": token,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setAllOvertimeRequests(data);
            } else {
                setOvertimeErrMsg("Something went wrong, please try later ..!");
                setTimeout(() => {
                    setOvertimeErrMsg("")
                }, 5000);
            };
        } catch (err) {
            console.log(err);
            setOvertimeErrMsg("Something went wrong, please try later ..!");
            setTimeout(() => {
                setOvertimeErrMsg("")
            }, 5000);
        }
    };


    //^ Fetch function - get all refund requests
    const [allRefundRequests, setAllRefundRequests] = useState([]);
    const [refundErrMsg, setRefundErrMsg] = useState("");
    async function newRefundRequests() {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/refund`, {
                method: "GET",
                headers: {
                    "Authorization": token,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setAllRefundRequests(data);
            } else {
                setRefundErrMsg("Something went wrong, please try later ..!");
                setTimeout(() => {
                    setRefundErrMsg("")
                }, 5000);
            };
        } catch (err) {
            console.log(err);
            setRefundErrMsg("Something went wrong, please try later ..!");
            setTimeout(() => {
                setRefundErrMsg("")
            }, 5000);
        }
    };


    useEffect(() => {
        newPermissionRequests();
        newOvertimeRequests();
        newRefundRequests();
    }, []);


    return (
        <div>
            <Tabs
                defaultActiveKey="Leave mangment"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="Leave mangment" title={` ${allLeaveRequests.length} new permission request`} >
                    <AllLeaveRequests
                        allLeaveRequests={allLeaveRequests}
                        newPermissionRequests={newPermissionRequests}
                        setPermissionErrMsg={setPermissionErrMsg}
                        errPermissionsMsg={errPermissionsMsg}
                    />
                </Tab>


                <Tab eventKey="Over time mangment" title={`${allOvertimeRequests.length} new Overtime request`}>
                    <AllOvertimeRequests
                        allOvertimeRequests={allOvertimeRequests}
                        newOvertimeRequests={newOvertimeRequests}
                        setOvertimeErrMsg={setOvertimeErrMsg}
                        overtimeErrMsg={overtimeErrMsg}
                    />
                </Tab>


                <Tab eventKey="Refund mangment" title={` ${allRefundRequests.length} new Refund request`}>
                    <AllRefundRequests
                        allRefundRequests={allRefundRequests}
                        newRefundRequests={newRefundRequests}
                        setRefundErrMsg={setRefundErrMsg}
                        refundErrMsg={refundErrMsg}
                    />
                </Tab>
            </Tabs>
        </div>
    )
}
