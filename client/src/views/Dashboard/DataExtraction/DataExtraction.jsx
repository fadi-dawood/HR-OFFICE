import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function DataExtraction() {

    //^ Variable
    const token = localStorage.getItem("token");
    const [dataType, setDataType] = useState("employee");



    //^ Download CSV File - Fetch funcyion
    async function downloadCSV() {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/${dataType}/csv`, {
                method: 'GET',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'text/csv'
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `${dataType}.csv`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error downloading the CSV file', error);
        }
    }



    
    return (
        <div>
            <h3 className="my-4 ms-2 f-poetsen f-green">What data do you need to download?</h3>
            <Form>
                <div key={`default-radio`} className="mb-3">
                    <Form.Check
                        type="radio"
                        id={`employees`}
                        label={`Employees Data`}
                        value={"employees"}
                        checked={dataType === "employees"}
                        onChange={() => setDataType("employees")}
                    />
                    <Form.Check
                        type="radio"
                        id={`client`}
                        label={`Client Data`}
                        value={"client"}
                        checked={dataType === "client"}
                        onChange={() => setDataType("client")}
                    />
                    <Form.Check
                        type="radio"
                        id={`overtime`}
                        label={`Over Time Data`}
                        value={"overtime"}
                        checked={dataType === "overtime"}
                        onChange={() => setDataType("overtime")}
                    />
                    <Form.Check
                        type="radio"
                        id={`permission`}
                        label={`Permission Data`}
                        value={"permission"}
                        checked={dataType === "permission"}
                        onChange={() => setDataType("permission")}
                    />
                    <Form.Check
                        type="radio"
                        id={`refund`}
                        label={`Refunds Data`}
                        value={"refund"}
                        checked={dataType === "refund"}
                        onChange={() => setDataType("refund")}
                    />
                    <Form.Check
                        type="radio"
                        id={`timeregister`}
                        label={`Time Register Data`}
                        value={"timeregister"}
                        checked={dataType === "timeregister"}
                        onChange={() => setDataType("timeregister")}
                    />
                </div>
            </Form>
            <Button variant="success" onClick={downloadCSV}>
                Extract Data
            </Button>
        </div>
    );
}
