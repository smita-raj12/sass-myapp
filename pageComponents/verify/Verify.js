import React, { useState } from 'react';
import { useRouter } from 'next/router'

import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'


import { gql, useMutation } from '@apollo/client'

const CREATE_NEW_USER = gql`
mutation VerifyNewUser($input: verifyUserInput!) {
    verifyUser(input: $input) {
    user {
      verifyEmail
    }
    clientMutationId
  }
}
`;

function Verify() {
    const router = useRouter();

    const [errors, setError] = useState(null);
    const queryParams = new URLSearchParams(window.location.search);
    const idParams = queryParams.get('id');
    const codeParams = queryParams.get('code');
    const emailParams = queryParams.get('email');

    const [verifyNewUser, { data, loading }] = useMutation(CREATE_NEW_USER, {
        onError: (err) => {
            setError(err);
        }
    });
    if ((!idParams || !codeParams || !emailParams) || data || errors) {
        if (data) {
            console.log("Account Verified");
        } else if(!idParams || !codeParams || !emailParams) {
            console.log("Verification Link Broken");
        } else if(errors) {
            console.log("Invalid Verification Code");
        } else {
            console.log("Unknown Error");
        }
        router.push("/login");
    }
    if (!data && !loading && !errors) {
        let dateIDSet = "/api/users/" + idParams;
        verifyNewUser({ variables: { input: { email: emailParams, code: codeParams, id: dateIDSet } } });
    }
    return (
        <Container>
            <div>
                Verifing
                <Spinner animation="grow" variant="dark" />
                <Spinner animation="grow" variant="dark" />
                <Spinner animation="grow" variant="dark" />
            </div>
        </Container>
    );
}

export default Verify;