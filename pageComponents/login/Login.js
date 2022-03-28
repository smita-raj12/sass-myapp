import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client';
import AxiosFetch from '../../utilities/AxiosFetch';


import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import AlertDismissible from '../../components/alerts/AlertDismissible'

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


function Login() {
    const router = useRouter();
    const [fEmail, setfEmail] = useState("");
    const [fPassword, setfPassword] = useState('');
    const [fError, setfError] = useState('');
    const [fErrorShow, setfErrorShow] = useState(false);
    const [loginLoding, setloginLoding] = useState(false);

    const { data, loading, refetch } = useQuery(GET_CURRENT_USER);
    if (data && !loading) {
        if (data.currentUser) {
            if (data.currentUser.id) {
                router.push("/account")
            }
        }
    }

    function LoginButtton() {
        setloginLoding(true);
        var Options = {};
        Options.data = JSON.stringify({
            'username': fEmail,
            'password': fPassword
          });
        AxiosFetch('login', 'POST', Options)
            .then(() => {
                setloginLoding(false);
                refetch();
            })
            .catch(e => {
                setloginLoding(false);
                setfErrorShow(true);
                setfError(e.message);
            });
        refetch();
    }

    return (
        <Container className="w-100 h-100 d-flex justify-content-center align-items-center p-5">
            <Form className="border border-primary rounded-3 p-4 my-5 w-auto position-relative">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="userEmailAddress"
                        value={fEmail}
                        onChange={(e) => setfEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="userPassword"
                        value={fPassword}
                        onChange={(e) => setfPassword(e.target.value)} />
                </Form.Group>
                <div className='d-flex justify-content-between'>
                    {/* <Form.Group className="mb-3">
                        <Form.Check
                            type="checkbox"
                            label="Keep Me Logged In"
                            name="userKeepMeLoggedIn"
                            value={this.state.userKeepMeLoggedIn}
                            onChange={this.handleInputChange} />
                    </Form.Group> */}
                    <Form.Group className="mb-3">
                        <a href={"/forgot-password"}>Forgot Password</a>
                        <span> | </span>
                        <a href={"/signup"}>Sign Up</a>
                    </Form.Group>
                </div>
                {fErrorShow && <ErrorAlertDismissible Error={fError} />}
                {loading || loginLoding ?
                    <Button variant="primary">
                        <span><Spinner animation="grow" variant="light" size="sm" />Loading...</span>
                    </Button> :
                    <Button variant="primary" onClick={() => LoginButtton()}>
                        <span>Login</span>
                    </Button>
                }
                {loading || loginLoding &&
                    <div className="position-absolute top-50 start-50 translate-middle w-100 h-100 d-flex justify-content-center align-items-center opacity-50 bg-dark">
                        <Spinner animation="grow" variant="light" />
                    </div>
                }
            </Form>
        </Container>
    );
}
export default Login;

function ErrorAlertDismissible(props) {

    if (props.Error === "Request failed with status code 401") {
        return <AlertDismissible color={"danger"} content={"Incorrect Email Or Password"} />

    }
    return <AlertDismissible color={"danger"} content={props.Error} />
}