import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { gql, useMutation } from '@apollo/client'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Switch from '../../../components/Switch/Switch';

const UPDATE_USER_ADDRESS = gql`
mutation UpdateAddresses($input: updateAddressesInput!) {
    updateAddresses(input: $input) {
      addresses {
        id
      }
    }
  }
`;


function AddressForm(props) {

    const [fTitle, setfTitle] = useState(props.Address.title ? props.Address.title : null);
    const [fAddress, setfAddress] = useState(props.Address.address ? props.Address.address : null);
    const [fAddressETC, setfAddressETC] = useState(props.Address.addressETC ? props.Address.addressETC : null);
    const [fCity, setfCity] = useState(props.Address.city ? props.Address.city : null);
    const [fState, setfState] = useState(props.Address.state ? props.Address.state : null);

    const [fCountry] = useState(props.Address.country ? props.Address.country : null);
    const [fZIP, setfZIP] = useState(props.Address.zip ? props.Address.zip : null);
    const [fDefaultAddress, setfDefaultAddress] = useState(props.Address.defaultAddress ? props.Address.defaultAddress : false);


    const [updateAddressItem, { loading }] = useMutation(UPDATE_USER_ADDRESS, {
        variables: {
            input: {
                id: props.Address.id,
                title: fTitle,
                address: fAddress,
                addressETC: fAddressETC,
                city: fCity,
                state: fState,
                country: fCountry,
                zip: parseInt(fZIP),
                defaultAddress: fDefaultAddress,
                owner: props.userId
            }
        },
        onError: (err) => {
            console.log("Error: Address not Updated");
        },
        onCompleted: (data) => {
            console.log("Address Updated");
            props.refetch();
        }
    });

    function saveAll() {
        updateAddressItem();
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
                        <Form.Control type="text" placeholder="Country" value={fCountry} readOnly/>
                    </FloatingLabel>
                </Col>
                <Col sm={12}>
                    <FloatingLabel label="ZIP">
                        <Form.Control type="number" placeholder="ZIP" value={fZIP} onChange={(e) => setfZIP(e.target.value)}/>
                    </FloatingLabel>
                </Col>
                <Col sm={12}>
                    <Switch Label="Default" SetBool={setfDefaultAddress} GetBool={fDefaultAddress} />
                </Col>
                <Col sm={12}>
                    <Form.Group className="mb-3">
                        {loading ?
                            <Button variant="primary" disabled>Loading...</Button> :
                            <Button variant="primary" onClick={saveAll}>Update</Button>}
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    )
}


export default AddressForm;