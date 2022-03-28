import '../styles/styles.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { SSRProvider } from '@react-aria/ssr'
import { ApolloProvider } from "@apollo/client";
import client from '../utilities/apollo-client';
import '../node_modules/@fortawesome/fontawesome-svg-core/styles.css';
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <SSRProvider>
        <ApolloProvider client={client}>
          <Head>

            <title>Wholesale &amp; Bulk Organic Natural Oils | Shay and Company</title>
            <meta name="description" content="Shop premier wholesale raw oils &amp; plant products with Shay and Company. We offer bulk natural products like essential oils, salts, butters, waxes, &amp; more." />
            <meta property="og:type" content="website" />

            <meta charSet="utf-8" />
            <link rel="icon" href="https://api.element-storm-cart.viewmynew.com/media/61d247f6e64e0_Shay-And-Company-Icon.svg" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <link rel="apple-touch-icon" href="https://api.element-storm-cart.viewmynew.com/media/61d247f6e64e0_Shay-And-Company-Icon.svg" />
            <meta name="robots" content="INDEX,FOLLOW" />

          </Head>
          <Component {...pageProps} />
        </ApolloProvider>
      </SSRProvider>
  );
}

export default MyApp
