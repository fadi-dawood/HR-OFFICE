import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';


export default function AllLeaveRequests({ allLeaveRequests, newPermissionRequests, errPermissionsMsg, setPermissionErrMsg }) {
    
    //^ Variables
    const token = localStorage.getItem("token");




    //^ Fetch function - approve/reject a permission request
    async function answerPermission(permissionId, state) {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/permission/${permissionId}`, {
                method: "PUT",
                headers: {
                    "Authorization": token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "state": state })
            });
            if (response.ok) {
                newPermissionRequests();
            } else {
                setPermissionErrMsg("Something went wrong, please try later ..!");
                setTimeout(() => {
                    setPermissionErrMsg("")
                }, 5000);
            };
        } catch (err) {
            console.log(err);
        }
    }



    return (
        <div>
            {errPermissionsMsg && <p className='f-red'>{errPermissionsMsg}</p>}

            {allLeaveRequests.length > 0 &&
                <>
                    <h1 className="my-4 ms-2 f-poetsen f-green">New Leave requests:</h1>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th className='bg-dark f-white border-0 f-poetsen f-pink'>#</th>
                                <th className='bg-dark f-white border-0 f-poetsen f-pink'>Applicant</th>
                                <th className='bg-dark f-white border-0 f-poetsen f-pink'>From</th>
                                <th className='bg-dark f-white border-0 f-poetsen f-pink'>To</th>
                                <th className='bg-dark f-white border-0 f-poetsen f-pink'>Note</th>
                                <th className='bg-dark f-white border-0 f-poetsen f-pink'>Approve / Reject</th>
                            </tr>
                        </thead>


                        <tbody>
                            {allLeaveRequests.map((request, index) => {
                                return (
                                    <tr className='' key={index}>
                                        <td className='align-middle bg-dark f-white border-0'>{index + 1}</td>
                                        <td className='align-middle bg-dark f-white border-0'>{request.employee.name} {request.employee.last_name}</td>
                                        <td className='align-middle bg-dark f-white border-0'>
                                            <p className='m-0'>{request.startDate.slice(0, 10)}</p>
                                            <p className='m-0'>Hour: {request.startHour}</p>
                                        </td>
                                        <td className='align-middle bg-dark f-white border-0'>
                                            <p className='m-0'>{request.endDate.slice(0, 10)}</p>
                                            <p className='m-0'>Hour: {request.endHour}</p>
                                        </td>
                                        <td className='align-middle bg-dark f-white border-0'>{request.note}</td>
                                        <td className='align-middle bg-dark f-white border-0'>
                                            <Button onClick={() => answerPermission(request._id, "Approved")} className='mx-1' variant="success"><FontAwesomeIcon icon={faCheck} /></Button>
                                            <Button onClick={() => answerPermission(request._id, "Rejected")} className='mx-1' variant="danger"><FontAwesomeIcon icon={faX} /></Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </>
            }


            {allLeaveRequests.length === 0 &&
                <h1 className="my-4 ms-2 f-poetsen f-green">There is no new requests!</h1>
            }
        </div>
    )
}
