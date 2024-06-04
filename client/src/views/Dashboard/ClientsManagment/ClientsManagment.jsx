import React from 'react';
import Container from "react-bootstrap/Container";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import ClientListTable from '../../../components/ClientListTable/ClientListTable.jsx';
import NewClient from '../../../components/NewClient/NewClient';

export default function ClientsManagment() {
    return (
        <div className='clients-management'>
            <Container>
                <Tabs defaultActiveKey="clients-list" id="clients-management-tabs" className="mb-3">
                    <Tab eventKey="clients-list" title="Client List">
                        <ClientListTable />
                    </Tab>
                    <Tab eventKey="new-client" title="Add New Client">
                        <NewClient />
                    </Tab>
                </Tabs>
            </Container>
        </div>
    );
}
