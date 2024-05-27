import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { htmlToText } from 'html-to-text';



export default function SinglePost(props) {
    const { index, post } = props;
    return (
        <div>
            <Card text='light' className='my-4 bg-dark border'>
                <Card.Header className='border-bottom d-flex justify-content-between align-items-center'>
                    <Card.Title className='f-pink f-roboto-black-italic'>{post.title}</Card.Title>
                    <div>
                        <strong className='m-0'>{post.employee.name} {post.employee.last_name}</strong>
                        <p className='m-0 f-grey'>Date: {(post.createdAt).slice(0, 10)}</p>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        {htmlToText(post.content)}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}
