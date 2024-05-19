import React, { useEffect, useState } from 'react';
import { Container, Button, Row, Col, Alert } from "react-bootstrap";
import UserInfoItem from '../UserInfoItem/UserInfoItem.jsx';

export default function UserInfoSec() {
    //^ Variables
    const token = localStorage.getItem("token");
    const [userDataObj, setUserDataObj] = useState({});
    const [userDataArr, setUserDataArr] = useState([]);


    //^ Call the server to GET all data of user
    async function getUserInfo() {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/user/me`, {
                method: "GET",
                headers: {
                    "Authorization": token,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setUserDataObj(data);
                // put the data inside an array instead of an object[[Camp name, value, isModifiable,key]]
                const dataArr = [
                    ["Name", data.name],
                    ["Last name", data.last_name],
                    ["Date of birth", new Date(data.date_of_birth).toLocaleDateString()],
                    ["Birth place", data.birth_place],
                    ["Gender", data.gender],
                    ["ID number", data.identity_card_number],
                    ["Nationality", data.nationality],
                    ["Tax ID", data.tax_id],

                    ["Personal mail", data.personal_mail, true, "personal_mail"],
                    ["Phone number", data.phone_number, true,  "phone_number"],

                    ["Residence - State", data.residence.state],
                    ["Residence - Region", data.residence.region],
                    ["Residence - City", data.residence.city],
                    ["Residence - Street", data.residence.street],
                    ["Residence - House number", data.residence.house_number],
                    ["Residence - CAP number", data.residence.cap_number],

                    ["Department", data.department],
                    ["Working hours", data.working_hours],
                    ["Company mail", data.company_mail],
                    ["Hiring date", new Date(data.hire_date).toLocaleDateString()],
                    ["Contract type", data.contract_type],
                    ["Contract level", data.contract_level],
                    ["Contract expiry", new Date(data.contract_expiry).toLocaleDateString()],
                    ["Salary", data.salary]
                ];

                if (data.nationality !== "Italy") {
                    dataArr.push(["Residence Permit ID", data.residency_permit_number, false]);
                }

                setUserDataArr(dataArr);
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getUserInfo();
    }, []);


    return (
        <div className='home-page bg-dark'>
                <h4 className=''>Le tue informazioni:</h4>
                <Row>
                    {userDataArr.map(([camp_name, value, isModifiable, serveKey], index) => (
                        <Col key={serveKey} xs="12" md="6" lg="4" className='my-3'>
                            <UserInfoItem
                                index={index}
                                serveKey={serveKey}
                                value={value}
                                isModifiable={isModifiable}
                                token={token}
                                setUserDataArr={setUserDataArr}
                                userDataArr={userDataArr}
                                camp_name={camp_name}
                            />
                        </Col>
                    ))}
                </Row>          
        </div>
    );
}
