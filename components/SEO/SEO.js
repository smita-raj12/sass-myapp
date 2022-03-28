import React from 'react'
import { Helmet } from "react-helmet";

export default function SEO(props) {
    return (
        <Helmet>
            {props.title ? <title>{props.title}</title> : null}
            {props.description ? <meta name="description" content={props.description} /> : null}

            {props.ogType ? <meta property="og:type" content={props.ogType} /> : null}
            {props.ogTitle ? <meta property="og:title" content={props.ogTitle} /> : null}
            {props.ogDescription ? <meta property="og:description" content={props.ogDescription} /> : null}
            {props.ogSiteName ? <meta property="og:site_name" content={props.ogSiteName} /> : null}
            {props.ogURL ? <meta property="og:url" content={props.ogURL} /> : null}

            {props.ogImage ? <meta property="og:image" content={props.ogImage} /> : null}
            {props.ogImageAlt ? <meta property="og:image:alt" content={props.ogImageAlt} /> : null}

            {props.ogPriceAmount ? <meta property="og:price:amount" content={props.ogPriceAmount} /> : null}
            {props.ogPriceCurrency ? <meta property="og:price:currency" content={props.ogPriceCurrency} /> : null}

            {props.twitterTitle ? <meta name="twitter:title" content={props.twitterTitle} /> : null}
            {props.twitterDescription ? <meta name="twitter:description" content={props.twitterDescription} /> : null}
            {props.twitterImage ? <meta name="twitter:image" content={props.twitterImage} /> : null}
            {props.twitterSite ? <meta name="twitter:site" content={props.twitterSite} /> : null}
        </Helmet>
    )
}
