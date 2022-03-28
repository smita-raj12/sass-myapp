import type { NextPage, GetServerSideProps } from 'next'
import { getByID as getByIDMenu } from "../_services/menu.service"
// import Header from "../components/header/Header";
import Head from 'next/head'
// import SearchPage from "../pageComponents/search/Search";
// import Footer from "../components/footer/Footer";

// import Footer from "../components/footer/Footer";
// import Header from "../components/header/Header";
// import Title from "../components/Title/Title"
import dynamic from "next/dynamic";
const Header = dynamic(() => import("../components/header/Header"));
const Footer = dynamic(() => import("../components/footer/Footer"));
// const Title = dynamic(() => import("../components/Title/Title"));
const SearchPage = dynamic(() => import("../pageComponents/search/Search"));

interface Props {
    menu: object,
    footerMenu: object,
    footerSubMenu: object
}
const Search: NextPage<any, any> = (props) => {

    return (
        <>
            <Head>
                <title>Advanced Product Search | Shay And Company</title>
                <meta name="description" content="Advanced Product Search for all products sold by Shay And Company" />

                <meta property="og:type" content="website" />
                <meta property="og:title" content="Advanced Product Search | Shay And Company" />
                <meta property="og:description" content="Advanced Product Search for all products sold by Shay And Company" />
                <meta property="og:site_name" content="Shay And Company" />
                <meta property="og:url" content="https://shayandcompany.com/" />
            </Head>
            <Header menu={props.menu} />
            <div>
                {typeof window !== "undefined" ? <SearchPage /> : null}
            </div>
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

export default Search;