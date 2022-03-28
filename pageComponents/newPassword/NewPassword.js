import React, { useState, useEffect} from 'react';
import { useRouter } from 'next/router'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import AlertDismissible from '../../components/alerts/AlertDismissible'

import { gql, useMutation } from '@apollo/client'

const UPDATE_PASSWORD = gql`
mutation ForgotPasswordVerify($input: forgotPasswordVerifyUserInput!) {
    forgotPasswordVerifyUser(input: $input) {
      user {
        id
        _id
        email
      }
    }
  }
`;

function NewPassword(props) {
    const router = useRouter();

    const [newPassword, setNewPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState("");
    const [hasNumber, setHasNumber] = useState(null);
    const [hasSpecialCharacters, setHasSpecialCharacters] = useState(null);
    const [has8Characters, setHas8Characters] = useState(null);


    const [errorsBar, setErrorBar] = useState("");
    const [errors, setError] = useState("");
    const queryParams = new URLSearchParams(window.location.search);
    const idParams = queryParams.get('id');
    const codeParams = queryParams.get('code');
    const emailParams = queryParams.get('email');

    const [createNewUser, { data, loading }] = useMutation(UPDATE_PASSWORD, {
        onError: (err) => {
            setErrorBar(err);
            setError(err);
        }
    });

    const handleSubmit = (evt) => {
        evt.preventDefault();
        createNewUser({
            variables: {
                input: {
                    email: emailParams,
                    code: codeParams,
                    id: "/api/users/" + idParams,
                    plainPassword: newPassword
                }
            }
        });
    }


    useEffect(() => {
        handleBlur();
      });



    const handleBlur = () => {
        if (newPassword === retypePassword) {
            setPasswordsMatch(true);
        } else if (newPassword === null || retypePassword === null) {
            setPasswordsMatch(true);
        }
        else {
            setPasswordsMatch(false);
        }
        const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
        let numberisTrue = false;
        numbers.forEach(num => {
            if (newPassword.includes(num)) {
                numberisTrue = true;
            }
            if (retypePassword.includes(num)) {
                numberisTrue = true;
            }
        });
        setHasNumber(numberisTrue);
        const specials = ['!', '*', '-', '+', '?', '^', '&', '=', '@', '#', '$', '%', '{', '}', '[', ']', '(', ')', '/', '\\', "'", '"', '`', '~', ',', ';', ':', '.', '<', '>'];
        let specialisTrue = false;
        specials.forEach(special => {
            if (newPassword.includes(special)) {
                specialisTrue = true;
            }
            if (retypePassword.includes(special)) {
                specialisTrue = true;
            }
        });
        setHasSpecialCharacters(specialisTrue);

        if (newPassword.length >= 8 || retypePassword.length >= 8) {
            setHas8Characters(true);
        } else {
            setHas8Characters(false);
        }

    }

    if (data || props.success) {
        console.log("Password Updated");
        router.push("/login");
    }
    if (errorsBar) {
        console.log("Password Not Updated");
        setErrorBar(null)
    }
    return (
        <Container className="p-5">
            <Form onSubmit={handleSubmit} noValidate>
                <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="New Password"
                        name="userPassword"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        className={passwordsMatch && hasNumber && hasSpecialCharacters && has8Characters ? "is-valid" : 'is-invalid'}
                        onBlur={handleBlur} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Retype Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Retype Password"
                        name="retypePassword"
                        value={retypePassword}
                        onChange={e => setRetypePassword(e.target.value)}
                        className={passwordsMatch && hasNumber && hasSpecialCharacters && has8Characters ? "is-valid" : 'is-invalid'}
                        onBlur={handleBlur} />
                    <div className={passwordsMatch ? "text-primary" : "text-danger"}>
                        {passwordsMatch ? <i className="fas fa-check"></i>: <i className="fas fa-times"></i>} Passwords Does Not Match
                    </div>
                    <div className={hasNumber ? "text-primary" : "text-danger"}>
                        {hasNumber ? <i className="fas fa-check"></i>: <i className="fas fa-times"></i>} Passwords Need One Number
                    </div>
                    <div className={hasSpecialCharacters ? "text-primary" : "text-danger"}>
                        {hasSpecialCharacters ? <i className="fas fa-check"></i>: <i className="fas fa-times"></i>} Passwords Need One Special Characters
                    </div>
                    <div className={has8Characters ? "text-primary" : "text-danger"}>
                        {has8Characters ? <i className="fas fa-check"></i>: <i className="fas fa-times"></i>} Passwords Need 8+ Characters
                    </div>
                </Form.Group>
                {errors && <AlertDismissible color={"danger"} content={"Password not Updated"} />}
                {passwordsMatch && hasNumber && hasSpecialCharacters && has8Characters ?
                    <Button variant="primary" type="submit">
                        {loading
                            ? <span><Spinner animation="grow" variant="light" size="sm" />Loading...</span>
                            : <span>Submit</span>
                        }
                    </Button> :
                    <Button variant="primary" disabled>
                        {loading
                            ? <span><Spinner animation="grow" variant="light" size="sm" />Loading...</span>
                            : <span>Submit</span>
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

export default NewPassword;