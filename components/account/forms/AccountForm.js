import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { gql, useMutation } from '@apollo/client'

const UPDATE_USER = gql`
mutation UpdateUser($input: updateUserInput!) {
    updateUser(input: $input) {
      clientMutationId
      user {
        id
      }
    }
  }
`;


function AccountForm(props) {
    const [errorsBar, setErrorBar] = useState("");
    const [updateBar, setUpdateBar] = useState("");

    const [fEmail, setfEmail] = useState(props.UserInfo.currentUser.email ? props.UserInfo.currentUser.email : null);
    const [fFirstName, setfFirstName] = useState(props.UserInfo.currentUser.firstName ? props.UserInfo.currentUser.firstName : null);
    const [fMiddleName, setfMiddleName] = useState(props.UserInfo.currentUser.middleName ? props.UserInfo.currentUser.middleName : null);
    const [fLastName, setfLastName] = useState(props.UserInfo.currentUser.lastName ? props.UserInfo.currentUser.lastName : null);
    const [fPhone, setfPhone] = useState(props.UserInfo.currentUser.phone ? props.UserInfo.currentUser.phone : null);


    const [updateUserItem, {loading}] = useMutation(UPDATE_USER, {
        variables: {
            input: {
                id: props.UserInfo.currentUser.id,
                firstName: fFirstName,
                middleName: fMiddleName,
                lastName: fLastName,
                phone: fPhone,
            }
        },
        onError: (err) => {
            setErrorBar(err);
        },
        onCompleted: (data) => {
            setUpdateBar(data);
        }
    });
    if (errorsBar) {
        console.log("Error: Updates not saved");
        setErrorBar(null)
    }
    if (updateBar) {
        console.log("Account Updated");
        setUpdateBar(null)
    }

    function saveAll() {
        updateUserItem();
    }

    return (
        <Form>
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="Text" placeholder="Email" value={fEmail} onChange={e => setfEmail(e.target.value)} readOnly />
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="Text" placeholder="Phone" value={fPhone} onChange={e => setfPhone(e.target.value)} />
                    </Form.Group>
                </Col>
                <Col sm={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="Text" placeholder="First Name" value={fFirstName} onChange={e => setfFirstName(e.target.value)} />
                    </Form.Group>
                </Col>
                <Col sm={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>Middle Name</Form.Label>
                        <Form.Control type="Text" placeholder="Middle Name" value={fMiddleName} onChange={e => setfMiddleName(e.target.value)} />
                    </Form.Group>
                </Col>
                <Col sm={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="Text" placeholder="Last Name" value={fLastName} onChange={e => setfLastName(e.target.value)} />
                    </Form.Group>
                </Col>
                <Col sm={12}>
                    <Form.Group className="mb-3">
                        {loading ? 
                        <Button variant="primary" disabled>Loading...</Button>:
                        <Button variant="primary" onClick={saveAll}>Update</Button>}
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    )
}


export default AccountForm;