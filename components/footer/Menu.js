import React from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


function Menu(props) {

    let listItems = [];
    if (props.menu) {
        listItems = props.menu.data.menu.data.links.map((Item, key) => {
            return <Col key={key} sm="12" md="3" className="text-center border-bottom border-primary"><a className="text-decoration-none text-dark" href={Item.url}>{Item.title}</a></Col>
        });

        return (
            <Row className="d-flex justify-content-center align-items-center w-100">
                {listItems}
            </Row>
        );
    }
}

export default Menu;