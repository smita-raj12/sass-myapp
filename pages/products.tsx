import type { NextPage, GetServerSideProps } from 'next'
import { getByID as getByIDMenu } from "../_services/menu.service"
import { getAll } from "../_services/product.service"

// import Header from "../components/header/Header";
// import Footer from "../components/footer/Footer";
// import ListProduct from "../components/ListProduct/ListProduct";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Key } from 'react';

// import Footer from "../components/footer/Footer";
// import Header from "../components/header/Header";
// import Title from "../components/Title/Title"
import dynamic from "next/dynamic";
const Header = dynamic(() => import("../components/header/Header"));
const Footer = dynamic(() => import("../components/footer/Footer"));
// const Title = dynamic(() => import("../components/Title/Title"));
const ListProduct = dynamic(() => import("../components/ListProduct/ListProduct"));

interface Props {
    menu: object,
    footerMenu: object,
    footerSubMenu: object,
    products: object
}
const Products: NextPage<any, any> = (props) => {
    let listItems = null
    if (props.products.data && props.products.data.products.collection) {
        listItems = props.products.data.products.collection.map((product: any, key: Key) => {
            return <Col key={key} sm={6} md={12} className='border border-primary my-2 rounded-3 overflow-hidden p-0'>
                <ListProduct product={product} />
            </Col>
        });
    }
    return (
        <>
            <Header menu={props.menu} />
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
    const products = await getAll();

    return {
        props: {
            menu: menu,
            footerMenu: footerMenu,
            footerSubMenu: footerSubMenu,
            products: products
        }
    };
};

export default Products;