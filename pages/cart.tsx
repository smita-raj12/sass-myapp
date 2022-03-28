import type { NextPage, GetServerSideProps } from 'next'
import { getByID as getByIDMenu } from "../_services/menu.service"
import Container from 'react-bootstrap/Container';
import Head from 'next/head'
// import Title from "../components/Title/Title"
// import Header from "../components/header/Header";
// import Footer from "../components/footer/Footer";
// import Cart from '../components/cart/Cart'

import dynamic from "next/dynamic";
const Header = dynamic(() => import("../components/header/Header"));
const Footer = dynamic(() => import("../components/footer/Footer"));
const Title = dynamic(() => import("../components/Title/Title"));
const Cart = dynamic(() => import('../components/cart/Cart'));

interface Props {
    menu: object,
    footerMenu: object,
    footerSubMenu: object
}
const Products: NextPage<any, any> = (props) => {

    return (
        <>
            <Head>
                <title>Cart</title>
                <meta name="description" content="Cart" />

                <meta property="og:type" content="website" />
                <meta property="og:title" content="Cart" />
                <meta property="og:description" content="Cart" />
                <meta property="og:site_name" content="Shay And Company" />
                <meta property="og:url" content="https://shayandcompany.com/" />
            </Head>
            <Header menu={props.menu} />
            <Container>
                <Title as={'h1'} Size={"h2"} Width={"40"} Name={"Your Shopping Cart"} />
            </Container>
            <Cart />
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