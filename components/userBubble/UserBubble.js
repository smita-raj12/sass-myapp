import React from 'react';
import { gql, useQuery } from '@apollo/client';
import AxiosFetch from '../../utilities/AxiosFetch';

import Dropdown from 'react-bootstrap/Dropdown';
import Spinner from 'react-bootstrap/Spinner'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      id
      _id
      email
      roles
      firstName
      middleName
      lastName
      verifyEmail
      phone
    }
  }
`;
function UserBubble() {

    const { loading, error, data, refetch } = useQuery(GET_CURRENT_USER, {
        pollInterval: 1000,
    });

    if (loading || error) {
        return (
            <Spinner animation="grow" variant="dark" />
        )
    }

    const handleLogout = () => {
        AxiosFetch('logout', 'GET');
        refetch();
    }

    if (data.currentUser) {
        return (
            <Dropdown align="end">
                <Dropdown.Toggle variant="outline-warning" className="ms-n5 text-light border-0">
                    <span className="text-light px-2">
                        <FontAwesomeIcon icon={faUser} />
                    </span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="/account">Account</Dropdown.Item>
                    <Dropdown.Item href="/cart">Cart</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    }
    return (
        <Dropdown align="end">
            <Dropdown.Toggle variant="outline-warning" className="ms-n5 text-light border-0">
                <span className="text-light px-2">
                    <FontAwesomeIcon icon={faUser} />
                </span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="position-absolute">
                <Dropdown.Item href="/login">Login</Dropdown.Item>
                <Dropdown.Item href="/signup">Sign Up</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )

}


export default UserBubble;