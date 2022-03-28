import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import AlertDismissible from '../../components/alerts/AlertDismissible'

import { gql, useMutation } from '@apollo/client'

const CREATE_NEW_USER = gql`
mutation CreateNewUser($input: createNewUserInput!) {
    createNewUser(input: $input) {
    user {
        id
        _id
        roles
        plainPassword
        email
        verifyEmail
    }
    clientMutationId
  }
}
`;

function Signup(props) {
    const router = useRouter();

    const [userEmailAddress, setUserEmailAddress] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [hasNumber, setHasNumber] = useState(null);
    const [hasSpecialCharacters, setHasSpecialCharacters] = useState(null);
    const [has8Characters, setHas8Characters] = useState(null);

    const [errorsBar, setErrorBar] = useState("");
    const [errors, setError] = useState("");
    const [createNewUser, { data, loading }] = useMutation(CREATE_NEW_USER, {
        onError: (err) => {
            setErrorBar(err);
            setError(err);
        }
    });

    useEffect(() => {
        handleBlur();
      });

    if (data) {
        console.log("Check Your Email (" + userEmailAddress + ") To Activate Your Account");
        redirectLogin();
    }
    if (errorsBar) {
        console.log("Email Already In Use");
        setErrorBar(null);
    }

    function redirectLogin() {
        router.push("/login");
    }

    const handleBlur = () => {
        const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
        let numberisTrue = false;
        numbers.forEach(num => {
            if (userPassword.includes(num)) {
                numberisTrue = true;
            }
        });
        setHasNumber(numberisTrue);
        const specials = ['!', '*', '-', '+', '?', '^', '&', '=', '@', '#', '$', '%', '{', '}', '[', ']', '(', ')', '/', '\\', "'", '"', '`', '~', ',', ';', ':', '.', '<', '>'];
        let specialisTrue = false;
        specials.forEach(special => {
            if (userPassword.includes(special)) {
                specialisTrue = true;
            }
        });
        setHasSpecialCharacters(specialisTrue);
        if (userPassword.length >= 8) {
            setHas8Characters(true);
        } else {
            setHas8Characters(false);
        }

    }
    const handleSubmit = (evt) => {
        evt.preventDefault();
        createNewUser({ variables: { input: { email: userEmailAddress, plainPassword: userPassword } } });
    }

    return (
        <Container className="p-5">
            <Form onSubmit={handleSubmit} >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="userEmailAddress"
                        value={userEmailAddress}
                        onChange={e => setUserEmailAddress(e.target.value)}
                        onBlur={handleBlur} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="userPassword"
                        value={userPassword}
                        onChange={e => setUserPassword(e.target.value)}
                        onBlur={handleBlur} />
                    <div className={hasNumber ? "text-primary" : "text-danger"}>
                        {hasNumber ? <i aria-hidden className="fas fa-check"></i>: <i aria-hidden className="fas fa-times"></i>} Passwords Need One Number
                    </div>
                    <div className={hasSpecialCharacters ? "text-primary" : "text-danger"}>
                        {hasSpecialCharacters ? <i aria-hidden className="fas fa-check"></i>: <i aria-hidden className="fas fa-times"></i>} Passwords Need One Special Characters
                    </div>
                    <div className={has8Characters ? "text-primary" : "text-danger"}>
                        {has8Characters ? <i aria-hidden className="fas fa-check"></i>: <i aria-hidden className="fas fa-times"></i>} Passwords Need 8+ Characters
                    </div>
                </Form.Group>
                {errors && <AlertDismissible color={"danger"} content={"Email Already In Use"} />}
                {hasNumber && hasSpecialCharacters && has8Characters ?
                    <Button variant="primary" type="submit">
                        {loading
                            ? <span><Spinner animation="grow" variant="light" size="sm" />Loading...</span>
                            : <span>Signup</span>
                        }
                    </Button> :
                    <Button variant="primary" disabled>
                        {loading
                            ? <span><Spinner animation="grow" variant="light" size="sm" />Loading...</span>
                            : <span>Signup</span>
                        }
                    </Button>

                }
                {loading &&
                    <div className="position-absolute top-50 start-50 translate-middle w-100 h-100 d-flex justify-content-center align-items-center opacity-50 bg-dark">
                        <Spinner animation="grow" variant="light" />
                    </div>
                }
            </Form>
        </Container>
    );
}


export default Signup;