import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';

export default function ClientsList({ setClientId, clientId }) {
    //^variables:
    const [clients, setClients] = useState([]);
    const token = localStorage.getItem("token");

    //^ get all clients fetch
    async function getAllClients() {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/user/clients`, {
                method: "GET",
                headers: {
                    "Authorization": token,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setClients(data);
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => { getAllClients(); }, []);

    return (
        <Form.Select
            onChange={(e) => setClientId(e.target.value)}
            value={clientId}
            aria-label="Default select example"
            data-bs-theme="dark"
            required
        >
            <option>Select A client</option>
            {clients.map((client, index) => {
                return <option key={index} value={client._id}>{client.company_name}</option>
            })}
        </Form.Select>
    )
}
