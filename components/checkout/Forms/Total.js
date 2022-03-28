import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { gql, useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const GET_SHIPPING_ESTIMATE = gql`
query estimatesShipping{
    estimatesShipping{
        id
        _id
        data
        token
        oldCart
        boxes
        fees
        shippingCodes
    }
  }
`;


export default function Total(props) {
    const { data, loading, error } = useQuery(GET_SHIPPING_ESTIMATE, {
        pollInterval: 1000,
    });
    let totalQuantity = 0;
    let subTotal = 0;
    let shipping = 0;
    let total = 0;

    if (data) {
        console.log(data.estimatesShipping.data);
        data.estimatesShipping.data.forEach(Est => {
            if(Est.Code === props.data.retrieveCart.shippingOption) {
                shipping = Est.Cost;
            }
        });
    }
    if (error) {
        console.log(error);
    }
    if (loading) {
        console.log("loading Ship");
    }


    if (props.data) {
        props.data.retrieveCart.cartItems.edges.forEach(cartItem => {
            totalQuantity = totalQuantity + cartItem.node.quantity;
            subTotal = subTotal + (cartItem.node.quantity * cartItem.node.attributes.price);
        });
    }
    total = subTotal + shipping;
    return (
        <div>
                <Row>
                  <Col xs={6}>Sub Total:</Col>
                  <Col xs={6}>${subTotal.toFixed(2)}</Col>
                  <Col xs={6}>Shipping:</Col>
                  <Col xs={6}>${shipping.toFixed(2)} {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : null}</Col>
                  <Col xs={12}><hr></hr></Col>
                  <Col xs={6}>Total:</Col>
                  <Col xs={6}>${total.toFixed(2)}</Col>
                </Row>
        </div>
    )
}
