import React from 'react';
import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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

function UserInfo() {
    const router = useRouter()

    const { data, loading } = useQuery(GET_CURRENT_USER);

    if(data && !loading) {
        if (data.currentUser === null) {
            console.log("login");
            router.push("/login")
        }
    }

    return (
        <Container className="w-100">
            {!loading && data.currentUser ? <UserInfoHTML User={data.currentUser} /> :
                <Row><Col sm={12} className="text-center">
                    Loading ...
                </Col></Row>
            }
        </Container>
    )
}

export default UserInfo;


function UserInfoHTML(props) {

    return (
        <Row>
            <Col sm={12} lg={12} className="text-center">
                Email: {props.User.email}
            </Col>
            <Col sm={12} lg={12} className="text-center">
                Phone: {props.User.phone}
            </Col>
        </Row>
    )
}