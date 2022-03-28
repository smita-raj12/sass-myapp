// post.service.js
import { gql } from "@apollo/client";
import apolloClient from "../utilities/apollo-client";

export async function getAll() {
    return await apolloClient
        .query({
            query: gql`
      query GetAllPages{
        pages(itemsPerPage:10000000,
          page: 1,
          live: true){
            collection {
              uniformResourceLocator
              metaTitle
              metaDescription
              ogType
              ogTitle
              ogDescription
              ogSiteName
              ogURL
              ogImage
              ogImageAlt
              twitterTitle
              twitterDescription
              twitterImage
              twitterSite
            }
          }
        }
          
      `,
        })
        .then((result) => result);
}

export async function getByID(id) {
    return await apolloClient
        .query({
            query: gql`
      query GetProduct($Id: ID!){
        page(id: $Id){
              uniformResourceLocator
              id
              title
              live
              content
              styles
              showTitle
              showContainer

              metaTitle
              metaDescription
              ogType
              ogTitle
              ogDescription
              ogSiteName
              ogURL
              ogImage
              ogImageAlt
              twitterTitle
              twitterDescription
              twitterImage
              twitterSite
          }
        }
      `,
        }, {
            variables: { Id: id }
        })
        .then((result) => {
            return result;
        });
}

export async function getBySlug(slug) {
    return await apolloClient
        .query({
            query: gql`
                query GetProducts(
                    $uniformResourceLocator: String
              ){
                pages(itemsPerPage:1,
                  page: 1,
                  uniformResourceLocator: $uniformResourceLocator,
                  live: true){
                    collection {
                      uniformResourceLocator
                      id
                      title
                      live
                      content
                      styles
                      showTitle
                      showContainer

                      metaTitle
                      metaDescription
                      ogType
                      ogTitle
                      ogDescription
                      ogSiteName
                      ogURL
                      ogImage
                      ogImageAlt
                      twitterTitle
                      twitterDescription
                      twitterImage
                      twitterSite
                    }
                  }
                }
            `,
            variables: { uniformResourceLocator: slug }
        })
        .then((result) => {
            return result;
        });
}