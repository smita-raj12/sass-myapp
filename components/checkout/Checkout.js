import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client';
import Title from '../../components/Title/Title'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';

import UserInfo from './Forms/UserInfo';
import Total from './Forms/Total';
import Shipping from './Forms/Shipping';
import AddressForm from './Forms/AddressForm';

import Order from './Order';
const GET_CART = gql`
query {
    retrieveCart {
      id
      _id
      shippingOption
      cartToken
      shippingName
      shippingAddress
      shippingAddressETC
      shippingCity
      shippingCountry
      shippingZip
      billingName
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

const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      id
      _id
      email
      phone
    }
  }
`;


function Checkout(props) {
  const router = useRouter()
  const [orderPage, setOrderPage] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const { data, refetch } = useQuery(GET_CART, {
    pollInterval: 1000,
  });

  if (data) {
    if (data.retrieveCart.cartItems.totalCount === 0) {
      router.push("/cart")
    }
  }

  if (orderPage) {
    return <Order setOrderPage={setOrderPage} />
  } else {
    if (showButton) {
      return (
        <Container className="w-100 h-100 d-flex justify-content-center align-items-center p-5">
          <Row>
            <Col sm={12} className="text-center">
              <Title as={'h1'} Size={"h2"} Name={"Checkout"} />
            </Col>
            <Col sm={6} className="text-center">
              <Title as={'h2'} Size={"h4"} Width={"15"} Name={"Shipping Address"} />
              {data ? <AddressForm type="Shipping" data={data} User={props.User} refetch={refetch} showButton={showButton} /> : <div>Loading ...</div>}
            </Col>
            <Col sm={6} className="text-center">
              <Title as={'h2'} Size={"h4"} Width={"15"} Name={"Billing Address"} />
              {data ? <AddressForm type="Billing" data={data} User={props.User} refetch={refetch} showButton={showButton} /> : <div>Loading ...</div>}
            </Col>
            <Col sm={12} className="text-center">
              <CheckoutButtons setOrderPage={setOrderPage} showButton={showButton} setShowButton={setShowButton} Cart={data} />
            </Col>
          </Row>
        </Container>
      )
    } else {
      return (
        <Container className="w-100 h-100 d-flex justify-content-center align-items-center p-5">
          <Row>
            <Col sm={12} className="text-center">
              <Title as={'h1'} Size={"h2"} Name={"Checkout"} />
            </Col>
            <Col sm={6} lg={4} className="text-center">
              <Title as={'h2'} Size={"h4"} Width={"15"} Name={"Shipping Address"} />
              {data ? <AddressForm type="Shipping" data={data} User={props.User} refetch={refetch} showButton={showButton} /> : <div>Loading ...</div>}
            </Col>
            <Col sm={6} lg={4} className="text-center">
              <Title as={'h2'} Size={"h4"} Width={"15"} Name={"Billing Address"} />
              {data ? <AddressForm type="Billing" data={data} User={props.User} refetch={refetch} showButton={showButton} /> : <div>Loading ...</div>}
            </Col>
            <Col sm={12} lg={4} className="text-center">
              <Title as={'h2'} Size={"h4"} Width={"15"} Name={"Contact Info"} />
              <UserInfo />
            </Col>
            <Col sm={12} md={6} className="text-center">
              <Title as={'h2'} Size={"h4"} Width={"15"} Name={"Shipping"} />
              {data && data.retrieveCart !== null ? <Shipping cartData={data} refetchCart={refetch} /> : "Loading ..."}
              
            </Col>
            <Col sm={12} md={6} className="text-center">
              <Title as={'h2'} Size={"h4"} Width={"15"} Name={"Order Total"} />
              {data && data.retrieveCart !== null ? <Total data={data} /> : "Loading ..."}

            </Col>
            <Col sm={12} className="text-center">
              <CheckoutButtons setOrderPage={setOrderPage} showButton={showButton} setShowButton={setShowButton} Cart={data} />
            </Col>
          </Row>
        </Container>
      )
    }
  }

}


export default Checkout;


function CheckoutButtons(props) {
  const router = useRouter()

  const { data, loading } = useQuery(GET_CURRENT_USER, {
    pollInterval: 10000,
  });

  if(data && !loading) {
    if (data.currentUser === null) {
        console.log("login");
        router.push("/login")
    }
}

  const shippingAddress = (props.Cart ? props.Cart.retrieveCart.shippingAddress : null);
  const shippingCity = (props.Cart ? props.Cart.retrieveCart.shippingCity : null);
  const shippingCountry = (props.Cart ? props.Cart.retrieveCart.shippingCountry : null);
  const shippingZip = (props.Cart ? props.Cart.retrieveCart.shippingZip : null);
  const billingAddress = (props.Cart ? props.Cart.retrieveCart.billingAddress : null);
  const billingCity = (props.Cart ? props.Cart.retrieveCart.billingCity : null);
  const billingCountry = (props.Cart ? props.Cart.retrieveCart.billingCountry : null);
  const billingZip = (props.Cart ? props.Cart.retrieveCart.billingZip : null);
  const email = (data && data.currentUser ? data.currentUser.email : null);
  const phone = (data && data.currentUser ? data.currentUser.phone : null);

  if (email && phone && shippingAddress && shippingCity && shippingCountry && shippingZip && billingAddress && billingCity && billingCountry && billingZip && !props.showButton) {
    return (
      <div>
        <Button variant="primary" onClick={() => props.setOrderPage(true)}>Order</Button>
        <Button variant="info" onClick={() => props.setShowButton(true)}>Change Details</Button>
      </div>
    );
  } else {
    if (!props.showButton) {
      return (
        <div>
          <Button variant="primary" disabled>Order</Button>
          <Button variant="info" onClick={() => props.setShowButton(true)}>Change Details</Button>
          <p>Missing: {!email ? "Email," : null}  {!phone ? "Phone," : null} {!shippingAddress || !shippingCity || !shippingCountry || !shippingZip ? "Shipping Address," : null} {!billingAddress || !billingCity || !billingCountry || !billingZip ? "Billing Address," : null}</p>
        </div>
      );
    } else {
      return (
        <div>
          <Button variant="info" onClick={() => props.setShowButton(false)}>Back to Order</Button>
        </div>
      );
    }
  }
}