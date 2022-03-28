import type { NextPage, GetStaticProps } from 'next'
import { getBySlug } from "../_services/page.service"
import { getByID as getByIDMenu } from "../_services/menu.service"
import Head from 'next/head'
// import RenderHTML from "../components/renderHTML/RenderHTML"
// import Header from "../components/header/Header";
// import Footer from "../components/footer/Footer";

import dynamic from "next/dynamic";
const Header = dynamic(() => import("../components/header/Header"));
const Footer = dynamic(() => import("../components/footer/Footer"));
// const Title = dynamic(() => import("../components/Title/Title"));
const RenderHTML = dynamic(() => import("../components/renderHTML/RenderHTML"));

interface Props {
  page: object,
  menu: object,
  footerMenu: object,
  footerSubMenu: object
}

const Home: NextPage<any, any> = (props) => {
  return (
    <div>
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
      <Header menu={props.menu} />
      <RenderHTML html={props.page.content} />
      <Footer menu={props.footerMenu} subMenu={props.footerSubMenu} />
    </div>
  )
}

export const getStaticProps: GetStaticProps<any, any> = async (context) => {
  const URL = "/";
  const page = await getBySlug(URL);
  const menu = await getByIDMenu("/api/menus/2");
  const footerMenu = await getByIDMenu("/api/menus/3");
  const footerSubMenu = await getByIDMenu("/api/menus/4");


  if (!page.data.pages.collection[0]) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      page: page.data.pages.collection[0],
      menu: menu,
      footerMenu: footerMenu,
      footerSubMenu: footerSubMenu
    }
  };
};


export default Home
