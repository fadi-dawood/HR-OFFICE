import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';


export default function AllRefundRequests(props) {
    const { allRefundRequests, newRefundRequests, setRefundErrMsg, refundErrMsg } = props;
    const token = localStorage.getItem("token");

    //^ Fetch function - approve/reject a permission request
    async function answerRefund(requestId, state) {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/refund/${requestId}`, {
                method: "PUT",
                headers: {
                    "Authorization": token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "state": state })
            });
            if (response.ok) {
                newRefundRequests();
            } else {
                setRefundErrMsg("Something went wrong, please try later ..!");
                setTimeout(() => {
                    setRefundErrMsg("")
                }, 5000);
            };
        } catch (err) {
            console.log(err);
        }
    }



    return (
        <div>
            {refundErrMsg && <p className='f-red'>{refundErrMsg}</p>}

            
            {allRefundRequests.length > 0 &&
                <>
                    <h1 className="my-4 ms-2 f-poetsen f-green">New Leave requests:</h1>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th className='bg-dark f-white border-0 f-poetsen f-pink'>#</th>
                                <th className='bg-dark f-white border-0 f-poetsen f-pink'>Applicant</th>
                                <th className='bg-dark f-white border-0 f-poetsen f-pink'>Type</th>
                                <th className='bg-dark f-white border-0 f-poetsen f-pink'>Payment Type</th>
                                <th className='bg-dark f-white border-0 f-poetsen f-pink'>Amount</th>
                                <th className='bg-dark f-white border-0 f-poetsen f-pink'>Date</th>
                                <th className='bg-dark f-white border-0 f-poetsen f-pink'>kilometers</th>
                                <th className='bg-dark f-white border-0 f-poetsen f-pink'>Notes</th>
                                <th className='bg-dark f-white border-0 f-poetsen f-pink'>Approve / Reject</th>
                            </tr>
                        </thead>


                        <tbody>
                            {allRefundRequests.map((request, index) => {
                                return (
                                    <tr className='' key={index}>
                                        <td className='align-middle bg-dark f-white border-0'>{index + 1}</td>
                                        <td className='align-middle bg-dark f-white border-0'>{request.employee.name} {request.employee.last_name}</td>
                                        <td className='align-middle bg-dark f-white border-0'> {request.type}</td>
                                        <td className='align-middle bg-dark f-white border-0'> {request.payment_type}</td>
                                        <td className='align-middle bg-dark f-white border-0'> {request.amount} €</td>
                                        <td className='align-middle bg-dark f-white border-0'> {(request.expense_date).slice(0,10)}</td>
                                        <td className='align-middle bg-dark f-white border-0'> {request.kilometers && <span>{request.kilometers} km</span>}</td>
                                        <td className='align-middle bg-dark f-white border-0'> {request.note && <span>{request.note}</span>}</td>
                                        <td className='align-middle bg-dark f-white border-0'>
                                            <Button onClick={() => answerRefund(request._id, "Approved")} className='mx-1' variant="success"><FontAwesomeIcon icon={faCheck} /></Button>
                                            <Button onClick={() => answerRefund(request._id, "Rejected")} className='mx-1' variant="danger"><FontAwesomeIcon icon={faX} /></Button>
                                        </td>
                                    </tr>
                                )
                            })}


                        </tbody>
                    </Table>
                </>

            }

            {allRefundRequests.length === 0 &&
                <h1 className="my-4 ms-2 f-poetsen f-green">There is no new requests!</h1>
            }
        </div>
    )
}
