import React from 'react'
import Container from 'react-bootstrap/Container';

import Subscribe  from '../subscribe/Subscribe';

export default function CallToAction() {
    return (
        <div className="bg-light">
            <Container>
                <div className="d-flex justify-content-between flex-wrap align-items-center">
                    <div className="d-flex flex-wrap align-items-center">
                        <p className="fs-6 text-capitalize pe-2 m-0">Sign up to receive exclusive offers</p>
                        <Subscribe buttonColor="primary"/>
                    </div>
                    <div>
                        <a href="tel:(503) 653-1155">(503) 653-1155</a> : <a href="mailto:orders@shayandcompany.com">orders@shayandcompany.com</a>
                    </div>
                </div>
            </Container>
        </div>
    )
}
