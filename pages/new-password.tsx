import type { NextPage, GetServerSideProps } from 'next'
import { getByID as getByIDMenu } from "../_services/menu.service"
import Head from 'next/head'
import Container from 'react-bootstrap/Container';
// import Header from "../components/header/Header";
// import Title from "../components/Title/Title"
// import NewPassword from '../pageComponents/newPassword/NewPassword'
// import Footer from "../components/footer/Footer";

// import Footer from "../components/footer/Footer";
// import Header from "../components/header/Header";
// import Title from "../components/Title/Title"
import dynamic from "next/dynamic";
const Header = dynamic(() => import("../components/header/Header"));
const Footer = dynamic(() => import("../components/footer/Footer"));
const Title = dynamic(() => import("../components/Title/Title"));
const NewPassword = dynamic(() => import('../pageComponents/newPassword/NewPassword'));

interface Props {
    menu: object,
    footerMenu: object,
    footerSubMenu: object
}
const Products: NextPage<any, any> = (props) => {

    return (
        <>
            <Head>
                <title>New Password</title>
                <meta name="description" content="New Password" />

                <meta property="og:type" content="website" />
                <meta property="og:title" content="New Password" />
                <meta property="og:description" content="New Password" />
                <meta property="og:site_name" content="Shay And Company" />
                <meta property="og:url" content="https://shayandcompany.com/" />
            </Head>
            <Header menu={props.menu} />
            <Container>
                <Title as={'h1'} Size={"h2"} Width={"40"} Name={"New Password"} />
            </Container>
            {typeof window !== "undefined" ? <NewPassword /> : null}
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