// post.service.js
import { gql } from "@apollo/client";
import apolloClient from "../utilities/apollo-client";

export async function getAll() {
    return await apolloClient
        .query({
            query: gql`
      query GetAllCategories{
        categories(itemsPerPage:10000000,
          page: 1,
          live: true){
            collection {
              _id
              id
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
      query GetCategory($Id: ID!){
        category(id: $Id){
              uniformResourceLocator
              id
              _id
              title
              live
              content

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
                query GetCategories(
                    $uniformResourceLocator: String
              ){
                categories(itemsPerPage:1,
                  page: 1,
                  uniformResourceLocator: $uniformResourceLocator,
                  live: true){
                    collection {
                      uniformResourceLocator
                      id
                      _id
                      title
                      live
                      content

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