import React, { useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { gql } from '@apollo/client/core';
import apolloClient from "../../utilities/apollo-client";


function AddToCart(props) {
    const [attributeIdATC, setattributeIdATC] = useState(0);
    const [qtyATC, setQtyATC] = useState(1);

    const addToCart = () => {
        return apolloClient
            .mutate({
                mutation: gql`
            mutation AddToCartCartItem($input: addToCartCartItemInput!) {
                addToCartCartItem(input: $input) {
                    cartItem {
                  quantity
                }
              }
            }
      `,
                variables: {
                    input: {
                        productId: props.product._id,
                        attributesIdId: attributeIdATC,
                        qty: parseInt(qtyATC)
                    }
                },
            }).then((data) => {
                console.log("Success", data);
            }).catch(err => {
                console.log("Error", err);
            });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        addToCart();
    }

    let startgingAt = 0;
    const AttributesList = props.attributes.edges.map(function (attribute, i) {
        if (startgingAt === 0 || startgingAt > attribute.node.price) {
            startgingAt = attribute.node.price;
        }
        if (i === 0 && attributeIdATC === 0) {
            setattributeIdATC(attribute.node._id);
        }
        return <Col xs={3} key={attribute.node.displayOrder} className="w-100">
            <Form.Group className="d-flex d-flex justify-content-between">
                <Form.Check
                    type='radio'
                    name={attribute.node._id}
                    label={attribute.node.title}
                    value={attribute.node._id}
                    checked={attributeIdATC === attribute.node._id}
                    onChange={() => setattributeIdATC(attribute.node._id)}
                />
                <Form.Label>${attribute.node.price.toFixed(2)}</Form.Label>
            </Form.Group>
        </Col>
    });



    return (
        <div className="my-2">
            <Form onSubmit={handleSubmit}>
                <Row className="justify-content-center">
                    <Col xs={12} sm={12} md={9} lg={4}>
                        <p className="h5">Starting At <strong className="h4">${startgingAt.toFixed(2)}</strong></p>
                    </Col>
                    <Col xs={12} sm={12} md={9} lg={4}>
                        <Row className="flex-column" style={{ minWidth: 285 }}>
                            {AttributesList}
                        </Row>
                    </Col>
                    <Col xs={12} sm={12} className='d-flex'>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Quantity">
                            <Form.Control
                                required
                                type="number"
                                placeholder="QTY"
                                value={qtyATC}
                                onChange={e => setQtyATC(e.target.value)} />
                        </FloatingLabel>

                        <Button type="submit" variant="success">Add To Cart</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default AddToCart;