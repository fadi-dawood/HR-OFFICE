import React, {  useState } from 'react';
import { ListGroup, Form, Button, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTimes,faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import "./UserInfoItem.css"

const UserInfoItem = (props) => {
    //^ Variables
    const { serveKey, index, camp_name, value, isModifiable, token, setUserDataArr, userDataArr } = props;
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    //^  open the edit box
    const handleEdit = () => {
        setEditIndex(index);
        setEditValue(value);
        setAlertMessage("");
    };

    //^ close the edit box
    const handleCancel = () => {
        setEditIndex(null);
        setEditValue("");
        setAlertMessage("");
    };

    //^ Save the data function
    const handleSave = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/user/modify`, {
                method: "PUT",
                headers: {
                    "Authorization": token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ [serveKey]: editValue })
            });

            if (response.ok) {
                const updatedUserData = [...userDataArr];
                updatedUserData[index][1] = editValue;
                setUserDataArr(updatedUserData);
                setEditIndex(null);
                setAlertMessage("");
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (err) {
            console.error(err);
            setAlertMessage("Failed to update data. Please try again.");
        }
    };

    return (
        <ListGroup.Item variant="dark" className='bg-dark d-flex flex-column user-info-item'>
            <div className='d-flex justify-content-between align-items-center'>
                <div className='w-100'>
                    <span className='text-white'>{`${camp_name}: `}</span>
                    {editIndex === index ? (
                        <Form.Control className='my-3'
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                        />
                    ) : (
                        <span className='fw-bold'>{value || ""}</span>
                    )}
                </div>
                {isModifiable && (
                    editIndex === index ? (
                        <div className='d-flex align-self-end my-3'>
                            <Button variant="outline-dark" className='border-0' onClick={handleSave}>
                            <FontAwesomeIcon icon={faPaperPlane} />
                            </Button>
                            <Button variant="outline-dark" className='border-0' onClick={handleCancel}>
                                <FontAwesomeIcon icon={faTimes} />
                            </Button>
                        </div>
                    ) : (
                        <Button variant="outline-dark" className='border-0' onClick={handleEdit}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </Button>
                    )
                )}
            </div>
            {alertMessage && <Alert variant="danger" className='mt-2'>{alertMessage}</Alert>}
        </ListGroup.Item>
    );
};

export default UserInfoItem;
