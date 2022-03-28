import React from 'react';
import { useRouter } from 'next/router'

import Container from 'react-bootstrap/Container'
import { gql, useQuery } from '@apollo/client';
import AccountForm from './forms/AccountForm';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Title from '../../components/Title/Title'
import AddressForm from './forms/AddressForm';
import VerticallyCenteredModal from '../../components/Modal/VerticallyCenteredModal';
import Button from 'react-bootstrap/Button';
import CreateAddressForm from './forms/CreateAddressForm';

const GET_USER = gql`
query GetCurrentUser {
    currentUser {
      id
      _id
      email
      roles
      plainPassword
      firstName
      middleName
      lastName
      phone
      dateCreated
      verifyEmail
      addresses {
        id
        _id
        address
        addressETC
        city
        country
        zip
        state
        title
        shipping
        billing
        defaultAddress
      }
    }
  }
`;


function Account() {
    const router = useRouter();

    const [modalShippingShow, setModalShippingShow] = React.useState(false);
    const [modalBillingShow, setModalBillingShow] = React.useState(false);


    const { loading, error, data, refetch } = useQuery(GET_USER);
    let BillingAddresses;
    let ShippingAddresses;

    if (!loading && data.currentUser === null) {
        router.push("/login");
    }
    console.log(loading);
    console.log(data);


    if (!loading && data) {
        if(data.currentUser !== null) {
            if (data.currentUser.addresses.length) {
                ShippingAddresses = data.currentUser.addresses.map(function (address) {
                    if (address.shipping) {
                        return <AddressForm Address={address} refetch={refetch} />
                    } else {
                        return <noscript />;
                    }
                });
                BillingAddresses = data.currentUser.addresses.map(function (address) {
                    if (address.billing) {
                        return <AddressForm Address={address} refetch={refetch} />
                    } else {
                        return <noscript />;
                    }
                });
            }
        }
    }

    // if (loading) return <div>Loading...</div>;
    if (error) return <div>Error! ${error}</div>;

    return (
        <Container className="w-100 h-100 d-flex justify-content-center align-items-center p-5">
            <Row>
                <Col sm={12} className="text-center">
                    <Title as={'h1'} Size={"h2"} Name={"Account Page"} />
                </Col>
                <Col sm={12}>
                    {loading || data.currentUser === null ? <div>Loading...</div> : <AccountForm UserInfo={data} />}
                </Col>
                <Col sm={6} className="text-center">
                    <Row>
                        <Col sm={12}>
                            <Title as={'h2'} Size={"h4"} Width={"15"} Name={"Shipping Address"} />
                            <div>
                                <Button variant="primary" onClick={() => setModalShippingShow(true)}>Add Shipping Address</Button>
                            </div>
                        </Col>
                        <Col sm={12}>
                            {ShippingAddresses ? ShippingAddresses : "Add A Shipping Address"}
                        </Col>
                    </Row>
                </Col>
                <Col sm={6} className="text-center">
                    <Row>
                        <Col sm={12}>
                            <Title as={'h2'} Size={"h4"} Width={"15"} Name={"Billing Address"} />
                            <div>
                                <Button variant="primary" onClick={() => setModalBillingShow(true)}>Add Billing Address</Button>
                            </div>
                        </Col>
                        <Col sm={12}>
                            {BillingAddresses ? BillingAddresses : "Add A Billing Address"}
                        </Col>
                    </Row>
                </Col>
                <Col sm={12}>
                    <VerticallyCenteredModal Title={"Create User Billing Address"} show={modalBillingShow} onHide={() => setModalBillingShow(false)}>
                        <div>
                            {loading || data.currentUser === null ? "Loading" : <CreateAddressForm userId={data.currentUser.id} refetch={refetch} type={'Billing'} />}
                        </div>
                    </VerticallyCenteredModal>
                </Col>
                <Col sm={12}>
                    <VerticallyCenteredModal Title={"Create User Shipping Address"} show={modalShippingShow} onHide={() => setModalShippingShow(false)}>
                        <div>
                            {loading || data.currentUser === null ? "Loading" : <CreateAddressForm userId={data.currentUser.id} refetch={refetch} type={'Shipping'} />}
                        </div>
                    </VerticallyCenteredModal>
                </Col>
            </Row>
        </Container>
    )
}


export default Account;


