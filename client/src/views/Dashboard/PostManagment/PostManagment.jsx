import React from 'react';
import Container from "react-bootstrap/Container";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import NewPost from '../../../components/NewPost/NewPost.jsx';
import PostListTable from '../../../components/PostListTable/PostListTable.jsx';

export default function PostManagment() {
    return (
        <div className='post-management'>
            <Container>
                <Tabs defaultActiveKey="posts-list" id="posts-management-tabs" className="mb-3">
                    <Tab eventKey="posts-list" title="post List">
                        <PostListTable />
                    </Tab>
                    <Tab eventKey="new-post" title="Add New post">
                        <NewPost />
                    </Tab>
                </Tabs>
            </Container>
        </div>
    );
}
