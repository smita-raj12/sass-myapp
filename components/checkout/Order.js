import React from 'react'
import { gql, useQuery } from '@apollo/client';
import Container from 'react-bootstrap/Container'
import Title from '../../components/Title/Title'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import AuthNetAcceptJs from '../AuthNetAcceptJs/AuthNetAcceptJs'

const GET_CART = gql`
query {
    retrieveCart {
      id
      _id
      cartToken
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

const GET_USER = gql`
query GetCurrentUser {
    currentUser {
      id
      _id
      email
      phone
    }
  }
`;


function Order(props) {
    const { data: userData, loading: userLoading, error: userError } = useQuery(GET_USER);
    const { data: cartData, loading: cartLoading, error: cartError } = useQuery(GET_CART);
    
    if(userError || cartError) {
        console.log("Error: Order Form Error");
    }
    
    if (userLoading || cartLoading) {
        return (
            <Container className="w-100 h-100 d-flex justify-content-center align-items-center p-5">
                <Row>
                    <Col sm={12} className="text-center">
                        <Title as={'h1'} Size={"h2"} Name={"Order"} />
                        <div>Loading...</div>
                    </Col>
                </Row>
            </Container>
        );
    }
    const shippingAddress = (cartData ? cartData.retrieveCart.shippingAddress : null);
    const shippingCity = (cartData ? cartData.retrieveCart.shippingCity : null);
    const shippingCountry = (cartData ? cartData.retrieveCart.shippingCountry : null);
    const shippingZip = (cartData ? cartData.retrieveCart.shippingZip : null);
    const billingAddress = (cartData ? cartData.retrieveCart.billingAddress : null);
    const billingCity = (cartData ? cartData.retrieveCart.billingCity : null);
    const billingCountry = (cartData ? cartData.retrieveCart.billingCountry : null);
    const billingZip = (cartData ? cartData.retrieveCart.billingZip : null);
    const email = (userData ? userData.currentUser.email : null);
    const phone = (userData ? userData.currentUser.phone : null);
    
    if(!shippingAddress || !shippingCity || !shippingCountry || !shippingZip || !billingAddress || !billingCity || !billingCountry || !billingZip || !email || !phone) {
        console.log("Error: Order Missing info");
        props.setOrderPage(false);
    } else {
        return (
            <Container className="w-100 h-100 d-flex justify-content-center align-items-center p-5">
                <Row>
                    <Col sm={12} className="text-center">
                        <Title as={'h1'} Size={"h2"} Name={"Order"} />
                        <AuthNetAcceptJs />
                    </Col>
                </Row>
            </Container>
        );
    }



}

export default Order;