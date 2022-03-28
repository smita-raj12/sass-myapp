import Head from 'next/head'
import type { NextPage, GetServerSideProps } from 'next'
import { getBySlug as getPageBySlug } from "../../_services/page.service"
import { getBySlug as getCategoryBySlug } from "../../_services/category.service"
import { getByID as getByIDMenu } from "../../_services/menu.service"

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import dynamic from "next/dynamic";
const Header = dynamic(() => import("../../components/header/Header"));
const Footer = dynamic(() => import("../../components/footer/Footer"));
const Title = dynamic(() => import('../../components/Title/Title'));
import CategorySearch from '../../components/categorySearch/CategorySearch';
import RenderHTML from "../../components/renderHTML/RenderHTML";

interface Props {
    page: object,
    menu: object,
    type: string,
    footerMenu: object,
    footerSubMenu: object
}
const PagesAndCategories: NextPage<any, any> = (props) => {

    if (props.type === "category") {
        const background = {
            backgroundImage: `url(${props.page.ogImage})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right'
        }
        const overlay = {
            backgroundImage: 'linear-gradient(to left,rgba(231,230,219,0) 0%,#e7e6db 35%), linear-gradient(#e7e6db,#e7e6db05)'
        }
        return (
            <>
                <Header menu={props.menu} />
                <Head>
                    {props.page.title ? <title>{props.page.title}</title> : null}
                    {props.page.description ? <meta name="description" content={props.page.description} /> : null}

                    {props.page.ogType ? <meta property="og:type" content={props.page.ogType} /> : null}
                    {props.page.ogTitle ? <meta property="og:title" content={props.page.ogTitle} /> : null}
                    {props.page.ogDescription ? <meta property="og:description" content={props.page.ogDescription} /> : null}
                    {props.page.ogSiteName ? <meta property="og:site_name" content={props.page.ogSiteName} /> : null}
                    {props.page.ogURL ? <meta property="og:url" content={props.page.ogURL} /> : null}

                    {props.page.ogImage ? <meta property="og:image" content={props.page.ogImage} /> : null}
                    {props.page.ogImageAlt ? <meta property="og:image:alt" content={props.page.ogImageAlt} /> : null}

                    {props.page.ogPriceAmount ? <meta property="og:price:amount" content={props.page.ogPriceAmount} /> : null}
                    {props.page.ogPriceCurrency ? <meta property="og:price:currency" content={props.page.ogPriceCurrency} /> : null}

                    {props.page.twitterTitle ? <meta name="twitter:title" content={props.page.twitterTitle} /> : null}
                    {props.page.twitterDescription ? <meta name="twitter:description" content={props.page.twitterDescription} /> : null}
                    {props.page.twitterImage ? <meta name="twitter:image" content={props.page.twitterImage} /> : null}
                    {props.page.twitterSite ? <meta name="twitter:site" content={props.page.twitterSite} /> : null}
                    {props.page.styles ? <style>{props.page.styles}</style> : null}
                </Head>
                <div className='mx-0 px-0' style={background}>
                    <Row className='h-100 w-100 m-0 p-5' style={overlay}>
                        <Col xs={12} className="text-center">
                            <Title as={'h1'} Size={"h1"} Name={props.page.title} />
                        </Col>
                        <Col xs={12}>
                            <div>{props.page.description}</div>
                        </Col>
                        <Col xs={12}>
                            <div><RenderHTML html={props.page.content} /></div>
                        </Col>
                    </Row>
                </div>
                <Container fluid>
                    <Row>
                        <Col xs={12}>
                            {/* TOODO: IF No PRoducts Show Null */}
                            {typeof window !== "undefined" ? <CategorySearch categoryID={props.page._id} name={props.page.title} /> : null}
                        </Col>
                    </Row>

                </Container>
                <Footer menu={props.footerMenu} subMenu={props.footerSubMenu} />
            </>
        );
    }
    return (
        <>
            <Header menu={props.menu} />
            <Container fluid>
                <Head>
                    {props.page.title ? <title>{props.page.title}</title> : null}
                    {props.page.description ? <meta name="description" content={props.page.description} /> : null}

                    {props.page.ogType ? <meta property="og:type" content={props.page.ogType} /> : null}
                    {props.page.ogTitle ? <meta property="og:title" content={props.page.ogTitle} /> : null}
                    {props.page.ogDescription ? <meta property="og:description" content={props.page.ogDescription} /> : null}
                    {props.page.ogSiteName ? <meta property="og:site_name" content={props.page.ogSiteName} /> : null}
                    {props.page.ogURL ? <meta property="og:url" content={props.page.ogURL} /> : null}

                    {props.page.ogImage ? <meta property="og:image" content={props.page.ogImage} /> : null}
                    {props.page.ogImageAlt ? <meta property="og:image:alt" content={props.page.ogImageAlt} /> : null}

                    {props.page.ogPriceAmount ? <meta property="og:price:amount" content={props.page.ogPriceAmount} /> : null}
                    {props.page.ogPriceCurrency ? <meta property="og:price:currency" content={props.page.ogPriceCurrency} /> : null}

                    {props.page.twitterTitle ? <meta name="twitter:title" content={props.page.twitterTitle} /> : null}
                    {props.page.twitterDescription ? <meta name="twitter:description" content={props.page.twitterDescription} /> : null}
                    {props.page.twitterImage ? <meta name="twitter:image" content={props.page.twitterImage} /> : null}
                    {props.page.twitterSite ? <meta name="twitter:site" content={props.page.twitterSite} /> : null}
                </Head>
                {props.page.showContainer ?
                    <Container>
                        <Row>
                            {props.page.showTitle ? <Col xs={12} className="text-center">
                                <Title as={'h1'} Size={"h1"} Name={props.page.title} />
                            </Col> : null}
                            <Col xs={12}>
                                <div><RenderHTML html={props.page.content} /></div>
                            </Col>
                        </Row>
                    </Container> :
                    <Row>
                        {props.page.showTitle ? <Col xs={12} className="text-center">
                            <Title as={'h1'} Size={"h1"} Name={props.page.title} />
                        </Col> : null}
                        <Col xs={12}>
                            <div><RenderHTML html={props.page.content} /></div>
                        </Col>
                    </Row>
                }
            </Container>
            <Footer menu={props.footerMenu} subMenu={props.footerSubMenu} />
        </>
    );
};


export const getServerSideProps: GetServerSideProps<any, any> = async (context) => {

    const params = context.params!;
    let URL = '';
    if (Array.isArray(params.slug)) {
        URL = "/" + params.slug.join('/');
    } else {
        URL = "/" + params.slug;
    }
    const page = await getPageBySlug(URL);
    const menu = await getByIDMenu("/api/menus/2");
    const footerMenu = await getByIDMenu("/api/menus/3");
    const footerSubMenu = await getByIDMenu("/api/menus/4");

    if (!page.data.pages.collection[0]) {
        const category = await getCategoryBySlug(URL);
        if (!category.data.categories.collection[0]) {
            return {
                notFound: true
            };
        } else {
            return {
                props: {
                    page: category.data.categories.collection[0],
                    menu: menu,
                    footerMenu: footerMenu,
                    footerSubMenu: footerSubMenu,
                    type: "category"
                }
            };
        }
    } else {
        return {
            props: {
                page: page.data.pages.collection[0],
                menu: menu,
                footerMenu: footerMenu,
                footerSubMenu: footerSubMenu,
                type: "page"
            }
        };
    }
};

export default PagesAndCategories;