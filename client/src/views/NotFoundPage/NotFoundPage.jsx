import React from 'react'
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./NotFoundPage.css"
import Container from 'react-bootstrap/esm/Container'

export default function NotFoundPage() {

    return (
        <div className=' bg-dark full-height'>
            <Container className='d-flex justify-content-center align-items-center h-100'>
                <div className='d-flex h-100 justify-content-center align-items-center'>
                    <div className='d-flex flex-column justify-content-center w-100 align-items-center'>
                        <FontAwesomeIcon className='triangle' icon={faTriangleExclamation} />
                        <h1>OPS! :( </h1>
                        <h2>Error: 404 &#x2022; Page not found</h2>
                        <p>This page may be moved or deleted!</p>
                    </div>
                </div>
            </Container >
        </div>
    )
}