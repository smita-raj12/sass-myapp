import React, { useState } from 'react';

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { gql, useMutation } from '@apollo/client'


const UPDATE_PASSWORD = gql`
mutation ForgotPasswordEmail($input: forgotPasswordEmailUserInput!) {
    forgotPasswordEmailUser(input: $input) {
      user {
        id
      }
    }
}
`;


function ForgotPassword() {
    const [errorsBar, setErrorBar] = useState("");
    const [updateBar, setUpdateBar] = useState("");
    const [fEmail, setfEmail] = useState(null);

    const [updatePassowrd, { loading }] = useMutation(UPDATE_PASSWORD, {
        variables: {
            input: {
                email: fEmail
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
        console.log("Error: Email Not Sent");
        setErrorBar(null)
    }
    if (updateBar) {
        console.log("Email Sent to: " + fEmail);
        setUpdateBar(null)
    }

    function saveAll() {
        updatePassowrd();
    }

    return (
        <Container className="w-100 h-100 d-flex justify-content-center align-items-center p-5">
            <Form className="border border-primary rounded-3 p-4 my-5 w-auto position-relative">
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="userEmailAddress"
                        value={fEmail}
                        onChange={e => setfEmail(e.target.value)}/>
                </Form.Group>
                <div className='d-flex justify-content-between'>
                    <Form.Group className="mb-3">
                        {loading ? 
                        <Button variant="primary" type="submit" disabled>Loading ...</Button>:
                        <Button variant="primary" type="submit" onClick={saveAll}>Submit</Button>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <a href={"/login"}>Back to Login</a>
                    </Form.Group>
                </div>
            </Form>
        </Container>
    )
}

export default ForgotPassword;