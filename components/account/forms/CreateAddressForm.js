import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { gql, useMutation } from '@apollo/client'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Switch from '../../../components/Switch/Switch';

const CREATE_USER_ADDRESS = gql`
mutation CreateAddresses($input: createAddressesInput!) {
    createAddresses(input: $input) {
        addresses {
            id
          }
    }
  }
`;


function CreateAddressForm(props) {

    const [fTitle, setfTitle] = useState("");
    const [fAddress, setfAddress] = useState("");
    const [fAddressETC, setfAddressETC] = useState("");
    const [fCity, setfCity] = useState("");
    const [fState, setfState] = useState("");
    const [fCountry, setfCountry] = useState("USA");
    const [fZIP, setfZIP] = useState(null);
    const [fDefaultAddress, setfDefaultAddress] = useState(false);


    const [createUserAddress, {loading}] = useMutation(CREATE_USER_ADDRESS, {
        variables: {
            input: {
                title: fTitle,
                address: fAddress,
                addressETC: fAddressETC,
                city: fCity,
                state: fState,
                country: "USA",
                zip: parseInt(fZIP),
                shipping: props.type === "Shipping" ? true : false,
                billing: props.type === "Billing" ? true : false,
                defaultAddress: fDefaultAddress,
                owner: props.userId
            }
        },
        onError: (err) => {
            console.log("Error: Address Not Created");
        },
        onCompleted: (data) => {
            console.log("Address Created");
            props.refetch();
        }
    });

    function saveAll() {
        createUserAddress();
    }

    return (
        <Form>
            <Row>
            <Col sm={12}>
                    <FloatingLabel label="Title">
                        <Form.Control type="text" placeholder="Title" value={fTitle} onChange={(e) => setfTitle(e.target.value)}/>
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
                    <FloatingLabel label="State">
                        <Form.Control type="text" placeholder="State" value={fState} onChange={(e) => setfState(e.target.value)}/>
                    </FloatingLabel>
                </Col>
                <Col sm={12}>
                    <FloatingLabel label="Country">
                        <Form.Control type="text" placeholder="Country" value={fCountry} onChange={(e) => setfCountry(e.target.value)} readOnly/>
                    </FloatingLabel>
                </Col>
                <Col sm={12}>
                    <FloatingLabel label="ZIP">
                        <Form.Control type='number' placeholder="ZIP" value={fZIP} onChange={(e) => setfZIP(e.target.value)}/>
                    </FloatingLabel>
                </Col>
                <Col sm={12}>
                    <Switch Label="Default" SetBool={setfDefaultAddress} GetBool={fDefaultAddress} />
                </Col>
                <Col sm={12}>
                    <Form.Group className="mb-3">
                        {loading ? 
                        <Button variant="primary" disabled>Loading...</Button>:
                        <Button variant="primary" onClick={saveAll}>Create</Button>}
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    )
}

export default CreateAddressForm;