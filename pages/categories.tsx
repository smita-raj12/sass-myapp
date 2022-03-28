import type { NextPage, GetServerSideProps } from 'next'
import { getByID as getByIDMenu } from "../_services/menu.service"
import { getAll } from "../_services/category.service"

// import Header from "../components/header/Header";
// import Footer from "../components/footer/Footer";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Key } from 'react';
// import Image from '../components/Image/Image';

// import Header from "../components/header/Header";
// import Checkout from '../components/checkout/Checkout';
// import Footer from "../components/footer/Footer";

import dynamic from "next/dynamic";
const Header = dynamic(() => import("../components/header/Header"));
const Footer = dynamic(() => import("../components/footer/Footer"));
// const Title = dynamic(() => import("../components/Title/Title"));
const Image = dynamic(() => import('../components/Image/Image'));

interface Props {
    menu: object,
    footerMenu: object,
    footerSubMenu: object,
    categories: object
}
const Categories: NextPage<any, any> = (props) => {
    let listItems = null
    if (props.categories.data && props.categories.data.categories.collection) {
        listItems = props.categories.data.categories.collection.map((category: any, key: Key) => {
            return <Col key={key} sm={6} md={6} className='border border-primary my-2 rounded-3 overflow-hidden p-0'>
                    {category.ogImage ? <Image alt={category.ogImageAlt} src={category.ogImage} styles={{width: '100%', height: '300px', position: "relative"}}/>: null}
                <pre>{JSON.stringify(category, null, 4)}</pre>
            </Col>
        });
    }
    return (
        <>
            <Header menu={props.menu} />
            {/* <pre>{JSON.stringify(props.categories.data.categories.collection, null, 4)}</pre> */}
            <Container>
                <Row>
                    {typeof window !== "undefined" ? listItems : null}
                </Row>
            </Container>
            <Footer menu={props.footerMenu} subMenu={props.footerSubMenu} />
        </>
    );
};


export const getServerSideProps: GetServerSideProps<any, any> = async (context) => {

    const menu = await getByIDMenu("/api/menus/2");
    const footerMenu = await getByIDMenu("/api/menus/3");
    const footerSubMenu = await getByIDMenu("/api/menus/4");
    const categories = await getAll();

    return {
        props: {
            menu: menu,
            footerMenu: footerMenu,
            footerSubMenu: footerSubMenu,
            categories: categories
        }
    };
};

export default Categories;