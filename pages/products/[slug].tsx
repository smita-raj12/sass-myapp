import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import { getBySlug } from "../../_services/product.service"
import { getByID as getByIDMenu } from "../../_services/menu.service"

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

import { ParsedUrlQuery } from 'querystring';
import dynamic from "next/dynamic";
const Header = dynamic(() => import("../../components/header/Header"));
const Footer = dynamic(() => import("../../components/footer/Footer"));
const DocumentDownloads = dynamic(() => import("../../components/documentDownloads/DocumentDownloads"));
const AddToCart = dynamic(() => import("../../components/addToCart/AddToCart"));
const Title = dynamic(() => import("../../components/Title/Title"));
const Carousel = dynamic(() => import("../../components/carousel/Carousel"));
const RenderHTML = dynamic(() => import("../../components/renderHTML/RenderHTML"));


// const Header = dynamic(() => import("../components/header/Header"));
// const Footer = dynamic(() => import("../components/footer/Footer"));
// // const Title = dynamic(() => import("../components/Title/Title"));
// const Account = dynamic(() => import('../components/account/Account'));


interface Params extends ParsedUrlQuery {
    id: string,
}

interface Props {
    page: object,
    menu: object,
    footerMenu: object,
    footerSubMenu: object
}
const Products: NextPage<any, any> = (props) => {

    return (
        <>
            <Header menu={props.menu} />
            <div className='pt-2'>
            <Head>
                    {props.product.title ? <title>{props.product.title}</title> : null}
                    {props.product.description ? <meta name="description" content={props.product.description} /> : null}

                    {props.product.ogType ? <meta property="og:type" content={props.product.ogType} /> : null}
                    {props.product.ogTitle ? <meta property="og:title" content={props.product.ogTitle} /> : null}
                    {props.product.ogDescription ? <meta property="og:description" content={props.product.ogDescription} /> : null}
                    {props.product.ogSiteName ? <meta property="og:site_name" content={props.product.ogSiteName} /> : null}
                    {props.product.ogURL ? <meta property="og:url" content={props.product.ogURL} /> : null}

                    {props.product.ogImage ? <meta property="og:image" content={props.product.ogImage} /> : null}
                    {props.product.ogImageAlt ? <meta property="og:image:alt" content={props.product.ogImageAlt} /> : null}

                    {props.product.ogPriceAmount ? <meta property="og:price:amount" content={props.product.ogPriceAmount} /> : null}
                    {props.product.ogPriceCurrency ? <meta property="og:price:currency" content={props.product.ogPriceCurrency} /> : null}

                    {props.product.twitterTitle ? <meta name="twitter:title" content={props.product.twitterTitle} /> : null}
                    {props.product.twitterDescription ? <meta name="twitter:description" content={props.product.twitterDescription} /> : null}
                    {props.product.twitterImage ? <meta name="twitter:image" content={props.product.twitterImage} /> : null}
                    {props.product.twitterSite ? <meta name="twitter:site" content={props.product.twitterSite} /> : null}
                </Head>
                <Container>
                    <Row>
                        <Col xs={12} className="text-center">
                            <Title as={'h1'} Size={"h1"} Name={props.product.title} />
                        </Col>
                        <Col xs={12} md={6}>
                            <Carousel Images={props.product.productImages} />
                        </Col>
                        <Col xs={12} md={6}>
                            <AddToCart product={props.product} attributes={props.product.attributes} />
                            {props.product.origin ? <Badge className='m-1 p-2' pill bg="info">{props.product.origin}</Badge> : null}

                            {props.product.useByHairCare ? <Badge className='m-1 p-2' pill bg="success">Hair Care</Badge> : null}
                            {props.product.useByBodyCare ? <Badge className='m-1 p-2' pill bg="success">Body Care</Badge> : null}
                            {props.product.useByFaceCare ? <Badge className='m-1 p-2' pill bg="success">Face Care</Badge> : null}
                            {props.product.useByLipCare ? <Badge className='m-1 p-2' pill bg="success">Lip Care</Badge> : null}
                            {props.product.useBySoap ? <Badge className='m-1 p-2' pill bg="success">Soap</Badge> : null}

                            {props.product.typeOrganic ? <Badge className='m-1 p-2' pill bg="secondary">Organic</Badge> : null}
                            {props.product.typeKosher ? <Badge className='m-1 p-2' pill bg="secondary">Kosher</Badge> : null}
                            {props.product.typeUSASourced ? <Badge className='m-1 p-2' pill bg="secondary">USA Sourced</Badge> : null}
                            {props.product.typeColdProcessed ? <Badge className='m-1 p-2' pill bg="secondary">Cold Processed</Badge> : null}
                            {props.product.typeNonGMO ? <Badge className='m-1 p-2' pill bg="secondary">Non-GMO</Badge> : null}
                            {props.product.typeWildcrafted ? <Badge className='m-1 p-2' pill bg="secondary">Wildcrafted</Badge> : null}
                            {props.product.typeVirgin ? <Badge className='m-1 p-2' pill bg="success">Virgin</Badge> : null}
                            {props.product.typeRefinedAndRBD ? <Badge className='m-1 p-2' pill bg="success">Refined/RBD</Badge> : null}
                        </Col>
                        <Col xs={12}>
                            <div className="py-2">
                                <RenderHTML html={props.product.content} />
                            </div>
                        </Col>
                    </Row>
                </Container>
                {props.product.productDocs.edges.length !== 0 ?
                    <div className="bg-primary text-light py-3">
                        <DocumentDownloads Document={props.product.productDocs} />
                    </div> : null}
            </div>
            <Footer menu={props.footerMenu} subMenu={props.footerSubMenu} />
        </>
    );

};


export const getServerSideProps: GetServerSideProps<any, any> = async (context) => {
    const { slug } = context.params;
    const URL = "/" + slug;
    const product = await getBySlug(URL);
    const menu = await getByIDMenu("/api/menus/2");
    const footerMenu = await getByIDMenu("/api/menus/3");
    const footerSubMenu = await getByIDMenu("/api/menus/4");

    if (!product.data.products.collection[0]) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            product: product.data.products.collection[0],
            menu: menu,
            footerMenu: footerMenu,
            footerSubMenu: footerSubMenu
        }
    };
};

export default Products;