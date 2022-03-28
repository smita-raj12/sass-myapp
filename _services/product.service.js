// post.service.js
import { gql } from "@apollo/client";
import apolloClient from "../utilities/apollo-client";

export async function getAll() {
  return apolloClient
    .query({
      query: gql`
      query GetAllProducts{
        products(itemsPerPage:100000000,
          page: 1,
          live: true){
            collection {
              id
              _id
              title
              shortDescription
              description
              content
              sku
              origin
              uniformResourceLocator
              
              typeOrganic
              typeKosher
              typeUSASourced
              typeColdProcessed
              typeNonGMO
              typeWildcrafted
              typeVirgin
              typeRefinedAndRBD
        
              useHair
              useFace
              useBody
              useSoap
              useCandles
              useLip
              useBath
        
              productImages {
                edges {
                  node {
                    id
                    contentUrl
                    name
                    alt
                  }
                }
              }
            }
          }
        }
          
      `,
    })
    .then((result) => result);
}

export async function getByID(id) {
  return apolloClient
    .query({
      query: gql`
      query GetProduct($Id: ID!){
        product(id: $Id){
          id
          _id
          title
          shortDescription
          description
          content
          sku
          origin
    
          typeOrganic
          typeKosher
          typeUSASourced
          typeColdProcessed
          typeNonGMO
          typeWildcrafted
          typeVirgin
          typeRefinedAndRBD
    
          useHair
          useFace
          useBody
          useSoap
          useCandles
          useLip
          useBath
    
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
    
          attributes(
            live: true
            order: {
              displayOrder: "ASC"
            }
          ) {
            totalCount
            edges {
              node {
                id
                _id
                title
                subTitle
                displayOrder
                price
              }
            }
          }
          productImages {
            edges {
              node {
                id
                contentUrl
                name
                alt
              }
            }
          }
          productDocs {
            edges {
              node {
                id
                contentUrl
                name
              }
            }
          }
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
  return apolloClient
    .query({
      query: gql`
                query GetProducts(
                    $uniformResourceLocator: String
              ){
                products(itemsPerPage:1,
                  page: 1,
                  uniformResourceLocator: $uniformResourceLocator,
                  live: true){
                    collection {
                      id
                      _id
                      title
                      shortDescription
                      description
                      content
                      sku
                      origin
                
                      typeOrganic
                      typeKosher
                      typeUSASourced
                      typeColdProcessed
                      typeNonGMO
                      typeWildcrafted
                      typeVirgin
                      typeRefinedAndRBD
                
                      useHair
                      useFace
                      useBody
                      useSoap
                      useCandles
                      useLip
                      useBath
                
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
                
                      attributes(
                        live: true
                        order: {
                          displayOrder: "ASC"
                        }
                      ) {
                        totalCount
                        edges {
                          node {
                            id
                            _id
                            title
                            subTitle
                            displayOrder
                            price
                          }
                        }
                      }
                      productImages {
                        edges {
                          node {
                            id
                            contentUrl
                            name
                            alt
                          }
                        }
                      }
                      productDocs {
                        edges {
                          node {
                            id
                            contentUrl
                            name
                          }
                        }
                      }
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