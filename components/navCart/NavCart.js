import React from 'react';
import { gql, useQuery } from '@apollo/client';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const GET_CART = gql`
query {
    retrieveCart {
      cartItems {
        edges {
          node {
            quantity
          }
        }
      }
    }
  }
`;

export default function NavCart() {
  let totalQuantity = 0;
  const { loading, error, data } = useQuery(GET_CART, {
    pollInterval: 1000,
  });
  if (loading || error) {
    return (
      <Nav.Link className="ms-n5 text-light border-0 px-3 d-flex justify-content-center" href={"/cart"}>
        <span className="text-light px-2">
          <FontAwesomeIcon icon={faShoppingCart} />
        </span>
        {totalQuantity > 0 ? <Badge pill bg="success">{totalQuantity}</Badge> : null}
      </Nav.Link>
    )
  }
  data.retrieveCart.cartItems.edges.forEach(cartItem => {
    totalQuantity = totalQuantity + cartItem.node.quantity;
  });


  return (
    <Nav.Link className="ms-n5 text-light border-0 px-3 d-flex justify-content-center" href={"/cart"}>
        <span className="text-light px-2">
          <FontAwesomeIcon icon={faShoppingCart} />
        </span>
      {totalQuantity > 0 ? <Badge pill bg="success">{totalQuantity}</Badge> : null}
    </Nav.Link>
  )
}
