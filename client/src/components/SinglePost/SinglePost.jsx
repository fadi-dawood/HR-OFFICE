import React from 'react';
import Card from 'react-bootstrap/Card';


export default function SinglePost(props) {
    //^ Props
    const { index, post } = props;


    
    return (
        <div>
            <Card text='light' className='my-4 bg-dark border'>
                <Card.Header className='border-bottom d-flex justify-content-between align-items-center'>
                    <Card.Title><h3 className='m-0 p-0 f-pink f-roboto-black-italic'>{post.title}</h3></Card.Title>
                    <div>
                        <strong className='m-0'>{post.employee.name} {post.employee.last_name}</strong>
                        <p className='m-0 f-grey'>Date: {(post.createdAt).slice(0, 10)}</p>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}
