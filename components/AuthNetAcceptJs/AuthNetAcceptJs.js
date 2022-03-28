import React, { useState } from 'react';
import { HostedForm } from 'react-acceptjs';
import { gql, useMutation } from '@apollo/client';

// https://github.com/brendanbond/react-acceptjs

const REACT_APP_AUTH_NET_USER = process.env.REACT_APP_AUTH_NET_USER;
const REACT_APP_AUTH_NET_PASS = process.env.REACT_APP_AUTH_NET_PASS;


const CREATE_ORDER = gql`
mutation NewOrder($input: newOrderInput!) {
    newOrder(input: $input) {
      order {
        id
        _id
      }
    }
  }
`;

const authData = {
    apiLoginID: REACT_APP_AUTH_NET_USER,
    clientKey: REACT_APP_AUTH_NET_PASS,
};

const AuthNetAcceptJs = () => {
    const [OrderData, setOrderData] = useState(false);
    const [ErrorOnOrder, setErrorOnOrder] = useState('');
    const [ErrorOnOrderShow, setErrorOnOrderShow] = useState(false);


    const [CreateOrder, { loading }] = useMutation(CREATE_ORDER);



    const handleSubmit = (response) => {
        CreateOrder({
            variables: {
                input: {
                    data: response,
                    type: "auth.net"
                }
            },
            onError: (err) => {
                setErrorOnOrder(err);
                setErrorOnOrderShow(true);
            },
            onCompleted: (data) => {
                console.log("Complete");
            }
        });
        setOrderData(response);
        console.log('Received response:', response);
    };
    return (
        <div>
            <HostedForm authData={authData} onSubmit={handleSubmit} />
            <pre>{JSON.stringify(OrderData, null, 4)}</pre>
        </div>
    )
};


export default AuthNetAcceptJs;