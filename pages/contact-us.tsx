import { FormEvent, useState } from 'react';
import type { NextPage, GetServerSideProps } from 'next'
import { getByID as getByIDMenu } from "../_services/menu.service"
import Head from 'next/head'
// import Header from "../components/header/Header";
// import Footer from "../components/footer/Footer";
// import Account from '../components/account/Account';
import Container from 'react-bootstrap/Container';

import dynamic from "next/dynamic";
const Header = dynamic(() => import("../components/header/Header"));
const Footer = dynamic(() => import("../components/footer/Footer"));
const Title = dynamic(() => import("../components/Title/Title"));

import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

import { gql, useMutation } from '@apollo/client';


const SAVE_EMAIL = gql`
mutation ContactUsEmail($input: contactUsEmailInput!) {
    contactUsEmail(input: $input) {
       email {
        id
        _id
      }
    }
  }
`;


interface Props {
    menu: object,
    footerMenu: object,
    footerSubMenu: object
}
const Products: NextPage<any, any> = (props) => {
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Phone, setPhone] = useState("");
    const [Note, setNote] = useState("");

    const [validated, setValidated] = useState(false);


    const [saveEmail, { data, loading, error }] = useMutation(SAVE_EMAIL, {
        variables: {
            input: {
                name: Name,
                email: Email,
                phone: Phone,
                note: Note
            }
        },
        onError: (err) => {
            setValidated(true);
        },
        onCompleted: (data) => {
            setValidated(true);
        }
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          setValidated(true);
        }

        if (form.checkValidity() === true) {
            saveEmail();
          }
      };


    return (
        <>
            <Head>
                <title>Contact Us</title>
                <meta name="description" content="Contact Us" />

                <meta property="og:type" content="website" />
                <meta property="og:title" content="Contact Us" />
                <meta property="og:description" content="Contact Us" />
                <meta property="og:site_name" content="Shay And Company" />
                <meta property="og:url" content="https://shayandcompany.com/" />
            </Head>
            <Header menu={props.menu} />
            <Container>

                <section className="contact-container pb-5">
                    <div className="page-title-wrapper">
                        <Title as={'h1'} Size={"h2"} Width={"40"} Name={"Contact Us"} />
                    </div>
                    <div className="card shadow rounded-3 p-3">
                        <Form noValidate validated={validated} onSubmit={(event) => handleSubmit(event)}>
                            <Row>
                                <Col sm={12} md={6} className="mb-2">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2799.171076613539!2d-122.582006!3d45.4462086!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54957563843021df%3A0x4fb6c2099dd4c9cd!2sShay%20and%20Company%20Inc!5e0!3m2!1sen!2sus!4v1642699863600!5m2!1sen!2sus" width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy"></iframe>
                                </Col>
                                <Col sm={12} md={6}>
                                    <Row>
                                        <Col sm={12}>
                                            <Title as={'h2'} Size={"h4"} Width={"30"} Name={"Email Us"} />
                                        </Col>
                                        <Col sm={12}>
                                            <Form.Group className="mb-3">
                                                <FloatingLabel label="Name">
                                                    <Form.Control type="text" placeholder="Name" value={Name} onChange={(e) => setName(e.target.value)} required />
                                                </FloatingLabel>
                                            </Form.Group>
                                        </Col>
                                        <Col sm={12}>
                                            <Form.Group className="mb-3">
                                                <FloatingLabel label="Email">
                                                    <Form.Control type="email" placeholder="Email" value={Email} onChange={(e) => setEmail(e.target.value)} required />
                                                </FloatingLabel>
                                            </Form.Group>
                                        </Col>
                                        <Col sm={12}>
                                            <Form.Group className="mb-3">
                                                <FloatingLabel label="Phone">
                                                    <Form.Control type="text" placeholder="Phone" value={Phone} onChange={(e) => setPhone(e.target.value)} required />
                                                </FloatingLabel>
                                            </Form.Group>
                                        </Col>
                                        <Col sm={12}>
                                            <Form.Group className="mb-3">
                                                <FloatingLabel label="What's on your mind?">
                                                    <Form.Control
                                                        as="textarea"
                                                        placeholder="What's on your mind?"
                                                        style={{ height: '100px' }}
                                                        value={Note}
                                                        onChange={(e) => setNote(e.target.value)}
                                                        required
                                                    />
                                                </FloatingLabel>
                                            </Form.Group>
                                        </Col>
                                        {data && !loading && !error ?

                                            <Col sm={12}>
                                                <Alert variant="success">
                                                    <Alert.Heading>Email Sent</Alert.Heading>
                                                </Alert>
                                            </Col> :
                                            null
                                        }
                                        {loading ?
                                            <Col sm={12}>
                                                <Alert variant="danger">
                                                    <Alert.Heading>Error Sending Email</Alert.Heading>
                                                </Alert>
                                            </Col> :
                                            null
                                        }
                                        <Col sm={12}>
                                            {loading ?
                                                <Button variant="warning" className="float-end mt-2" disabled>Loading ...</Button> :
                                                <Button type="submit" variant="warning" className="float-end mt-2" >Send</Button>
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </section>

            </Container >

            <Footer menu={props.footerMenu} subMenu={props.footerSubMenu} />
        </>
    );

};


export const getServerSideProps: GetServerSideProps<any, any> = async (context) => {

    const menu = await getByIDMenu("/api/menus/2");
    const footerMenu = await getByIDMenu("/api/menus/3");
    const footerSubMenu = await getByIDMenu("/api/menus/4");

    return {
        props: {
            menu: menu,
            footerMenu: footerMenu,
            footerSubMenu: footerSubMenu
        }
    };
};

export default Products;