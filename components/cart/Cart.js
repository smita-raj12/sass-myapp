import React from 'react'
import { gql, useQuery, useMutation } from '@apollo/client';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import useWindowDimensions from '../../utilities/useWindowDimensions'
import Item from './Item'

const DELETE_CART = gql`
mutation DeleteCart($input: deleteCartInput!) {
  deleteCart(input: $input) {
    cart {
      id
    }
  }
}
`;
const GET_CART = gql`
query {
    retrieveCart {
      id
      _id
      cartToken
      cartToken
      shippingAddress
      shippingAddressETC
      shippingCity
      shippingCountry
      shippingZip
      billingAddress
      billingAddressETC
      billingCity
      billingCountry
      billingZip
      cartItems {
        totalCount
        edges {
          node {
            id
            _id
            product {
              id
              _id
              title
              uniformResourceLocator
              live
              origin
              typeOrganic
              typeKosher
              typeUSASourced
              typeColdProcessed
              typeNonGMO
              typeWildcrafted
        
              useHair
              useFace
              useBody
              useSoap
              useCandles
              useLip
              useBath
              productImages {
                edges {
                    node {
                        id
                        name
                        alt
                        contentUrl
                    }
                }
            }
            }
            attributes {
                id
              _id
              title
              live
              price
            }
            quantity
          }
        }
      }
    }
  }
`;

function Cart(props) {
  const { width } = useWindowDimensions();
  let totalQuantity = 0;
  let subTotal = 0;
  let shipping = 0;
  let total = 0;
  const { loading, error, data, refetch } = useQuery(GET_CART, {
    pollInterval: 500000,
  });
  const [DeleteCart] = useMutation(DELETE_CART);

  function HandleDeleteCart(idOfCart) {
    if (!idOfCart) {
      console.log("Error On Cart Update");
    } else {
      DeleteCart({
        variables: {
          input: {
            id: idOfCart
          }
        },
        onError: (err) => {
          console.log(err);
        },
        onCompleted: (data) => {
          console.log(data);
          refetch();
        }
      });
    }
  }


  if (loading) return <div>Loading ...</div>;
  if (error) return <div>Error! ${error}</div>;

  const ListProducts = data.retrieveCart.cartItems.edges.map(function (cartItem, key) {
    totalQuantity = totalQuantity + cartItem.node.quantity;
    subTotal = subTotal + (cartItem.node.quantity * cartItem.node.attributes.price);
    const imageURL = cartItem.node.product.productImages ? cartItem.node.product.productImages.edges[0] : "null";
    return <Item key={key} cartItem={cartItem} imageURL={imageURL} refetch={refetch} />;
  });

  const CheckoutButton = (<Button variant="primary" href={"/checkout"}>Checkout</Button>);

  const CartButtons = (
    <Row className='d-flex justify-content-center'>
      <Col className='d-flex justify-content-center'><Button variant="primary" onClick={data ? () => HandleDeleteCart(data.retrieveCart.id) : HandleDeleteCart()}>Clear Cart</Button></Col>
      <Col className='d-flex justify-content-center'><Button variant="primary" onClick={() => refetch()}>Update Cart</Button></Col>
      <Col className='d-flex justify-content-center'><Button variant="primary">Shipping Options</Button></Col>
      <Col className='d-flex justify-content-center'>{CheckoutButton}</Col>
    </Row>
  );

  total = subTotal + shipping;
  return (
    <Container>
      {data.retrieveCart.cartItems.totalCount === 0 ?
        <Row>
          <Col xs={12} className='text-center'>
            <h2>Your Cart Is Empty111</h2>
          </Col>
        </Row> :
        <Row>
          <Col xs={12}>
            Total QTY: {totalQuantity}
          </Col>
          {width <= 995 ?
            <Col xs={12}>
              <div className={width <= 505 ? 'bg-light p-2 d-flex flex-column justify-content-center' : 'bg-light p-2 d-flex justify-content-center'}>
                <Row>
                  <Col xs={4}>Sub Total</Col>
                  <Col xs={4}>Shipping</Col>
                  <Col xs={4}>Total</Col>
                  {/* <Col xs={12}><hr></hr></Col> */}
                  <Col xs={4}>${subTotal.toFixed(2)}</Col>
                  <Col xs={4}>${shipping.toFixed(2)}</Col>
                  <Col xs={4}>${total.toFixed(2)}</Col>
                </Row>
                {CheckoutButton}
              </div>
            </Col> :
            <Col xs={12}>
              {CartButtons}
            </Col>}
          <Col xs={width >= 995 ? 9 : 12}>
            <Row>
              {ListProducts}
              {/* {cartItemList} */}
            </Row>
          </Col>
          {width >= 995 ?
            <Col xs={3}>
              <div className='bg-light p-2'>
                <Row>
                  <Col xs={6}>Sub Total:</Col>
                  <Col xs={6}>${subTotal.toFixed(2)}</Col>
                  <Col xs={6}>Shipping:</Col>
                  <Col xs={6}>${shipping.toFixed(2)}</Col>
                  <Col xs={12}><hr></hr></Col>
                  <Col xs={6}>Total:</Col>
                  <Col xs={6}>${total.toFixed(2)}</Col>
                  <Col>{CheckoutButton}</Col>
                </Row>
              </div>
            </Col> :
            <Col xs={12}>
              {CartButtons}
            </Col>}
        </Row>
      }
    </Container>
  );
}

export default Cart;