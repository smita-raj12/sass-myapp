import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client'

import VerticallyCenteredModal from '../../../components/Modal/VerticallyCenteredModal';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'

// import Title from '../../../components/Title/Title'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function AddressForm(props) {
    const [modalShow, setModalShow] = React.useState(false);

    let ShowenData =  <div>Loading...</div>;
    let ShowAddressForm = <div>Loading...</div>;

    if (props.type === 'Shipping') {
        const shippingAddress = props.data.retrieveCart.shippingAddress;
        const shippingAddressETC = props.data.retrieveCart.shippingAddressETC;
        const shippingCity = props.data.retrieveCart.shippingCity;
        const shippingCountry = props.data.retrieveCart.shippingCountry;
        const shippingZip = props.data.retrieveCart.shippingZip;
        const shippingName = props.data.retrieveCart.shippingName;
        ShowAddressForm = <CreateAddressForm addNotice={props.addNotice} cartID={props.data.retrieveCart.id} refetch={props.refetch} type={props.type} Name={shippingName} Address={shippingAddress} AddressETC={shippingAddressETC} City={shippingCity} Country={shippingCountry} Zip={shippingZip}/>
        if (!shippingAddress || !shippingCity || !shippingCountry || !shippingZip) {
            ShowenData = <div>Add Your Shipping Address</div>;
        } else {
            ShowenData =  <ShowSetAddress Name={shippingName} Address={shippingAddress} AddressETC={shippingAddressETC} City={shippingCity} Country={shippingCountry} Zip={shippingZip} />;
        }
    } else if(props.type === 'Billing') {
        const billingAddress = props.data.retrieveCart.billingAddress;
        const billingAddressETC = props.data.retrieveCart.billingAddressETC;
        const billingCity = props.data.retrieveCart.billingCity;
        const billingCountry = props.data.retrieveCart.billingCountry;
        const billingZip = props.data.retrieveCart.billingZip;
        const billingName = props.data.retrieveCart.billingName;
        ShowAddressForm = <CreateAddressForm addNotice={props.addNotice} cartID={props.data.retrieveCart.id} refetch={props.refetch} type={props.type} Name={billingName} Address={billingAddress} AddressETC={billingAddressETC} City={billingCity} Country={billingCountry} Zip={billingZip} />
        if (!billingAddress || !billingCity || !billingCountry || !billingZip) {
            ShowenData = <div>Add Your Billing Address</div>;
        } else {
            ShowenData =  <ShowSetAddress Name={billingName} Address={billingAddress} AddressETC={billingAddressETC} City={billingCity} Country={billingCountry} Zip={billingZip} />;
        }
    }
    return (
        <Container className="w-100">
            <Row>
                <Col sm={12} className="text-center">
                    {props.showButton ? <Button variant="primary" onClick={() => setModalShow(true)}>Chnage {props.type} Address</Button> : null}
                    {ShowenData}
                    <VerticallyCenteredModal Title={"Chnage Address"} show={modalShow} onHide={() => setModalShow(false)}>
                        <div>
                            {ShowAddressForm}
                        </div>
                    </VerticallyCenteredModal>
                </Col>
            </Row>
        </Container>
    )
}

export default AddressForm;


function ShowSetAddress(props) {
    return (
        <div>
            <address>
                <strong>{props.Name}</strong><br />
                {props.Address}<br />
                {props.AddressETC ? <p>{props.AddressETC}<br /></p> : null}
                {props.City}, {props.Zip}<br />
                {props.Country}<br />
            </address>
        </div>
    );
}



const UPDATE_OR_ADD_ADDRESS = gql`
mutation UpdateCart($input: updateCartInput!) {
    updateCart(input: $input) {
      cart {
        id
      }
    }
  }
`;

function CreateAddressForm(props) {

    const [fName, setfName] = useState(props.Name);
    const [fAddress, setfAddress] = useState(props.Address);
    const [fAddressETC, setfAddressETC] = useState(props.AddressETC);
    const [fCity, setfCity] = useState(props.City);
    const [fCountry] = useState("USA");
    const [fZIP, setfZIP] = useState(props.Zip);

    const [UpdateOrAddAddress, { loading }] = useMutation(UPDATE_OR_ADD_ADDRESS);

    function saveAll() {
        if (props.type === 'Shipping') {
            UpdateOrAddAddress({
                variables: {
                    input: {
                        id: props.cartID,
                        shippingName: fName,
                        shippingAddress: fAddress,
                        shippingAddressETC: fAddressETC,
                        shippingCity: fCity,
                        shippingCountry: "USA",
                        shippingZip: parseInt(fZIP),
                    }
                },
                onError: (err) => {
                    props.addNotice({
                        color: "danger",
                        content: "Error: Address Not Set"
                    });
                },
                onCompleted: (data) => {
                    props.addNotice({
                        color: "success",
                        heading: "Address Set",
                    });
                    props.refetch();
                }
            });
        } else if(props.type === 'Billing') {
            UpdateOrAddAddress({
                variables: {
                    input: {
                        id: props.cartID,
                        billingName: fName,
                        billingAddress: fAddress,
                        billingAddressETC: fAddressETC,
                        billingCity: fCity,
                        billingCountry: "USA",
                        billingZip: parseInt(fZIP),
                    }
                },
                onError: (err) => {
                    props.addNotice({
                        color: "danger",
                        content: "Error: Address Not Add"
                    });
                },
                onCompleted: (data) => {
                    props.addNotice({
                        color: "success",
                        heading: "Address Set",
                    });
                    props.refetch();
                }
            });
        }
    }


    return (
        <Form>
            <Row>
            <Col sm={12}>
                    <FloatingLabel label="Name">
                        <Form.Control type="text" placeholder="Name" value={fName} onChange={(e) => setfName(e.target.value)}/>
                    </FloatingLabel>
                </Col>
                <Col sm={12}>
                    <FloatingLabel label="Address">
                        <Form.Control type="text" placeholder="Address" value={fAddress} onChange={(e) => setfAddress(e.target.value)}/>
                    </FloatingLabel>
                </Col>
                <Col sm={12}>
                    <FloatingLabel label="AddressETC">
                        <Form.Control type="text" placeholder="AddressETC" value={fAddressETC} onChange={(e) => setfAddressETC(e.target.value)}/>
                    </FloatingLabel>
                </Col>
                <Col sm={12}>
                    <FloatingLabel label="City">
                        <Form.Control type="text" placeholder="City" value={fCity} onChange={(e) => setfCity(e.target.value)}/>
                    </FloatingLabel>
                </Col>
                <Col sm={12}>
                    <FloatingLabel label="Country">
                        <Form.Control type="text" placeholder="Country" value={fCountry} readOnly/>
                    </FloatingLabel>
                </Col>
                <Col sm={12}>
                    <FloatingLabel label="ZIP">
                        <Form.Control type='number' placeholder="ZIP" value={fZIP} onChange={(e) => setfZIP(e.target.value)}/>
                    </FloatingLabel>
                </Col>
                <Col sm={12}>
                    <Form.Group className="mb-3">
                        {loading ? 
                        <Button variant="primary" disabled><div>Loading...</div></Button>:
                        <Button variant="primary" onClick={saveAll}>Set</Button>}
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    )
}