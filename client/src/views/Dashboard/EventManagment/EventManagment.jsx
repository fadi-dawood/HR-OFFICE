import React from 'react';
import Container from "react-bootstrap/Container";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import EventListTable from '../../../components/EventListTable/EventListTable.jsx';
import NewEvent from '../../../components/NewEvent/NewEvent.jsx';

export default function EventManagment() {
    return (
        <div className='event-management'>
            <Container>
                <Tabs defaultActiveKey="events-list" id="events-management-tabs" className="mb-3">
                    <Tab eventKey="events-list" title="Event List">
                        <EventListTable />
                    </Tab>
                    <Tab eventKey="new-event" title="Add New event">
                        <NewEvent />
                    </Tab>
                </Tabs>
            </Container>
        </div>
    );
}
