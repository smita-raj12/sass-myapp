// post.service.js
import { gql } from "@apollo/client";
import apolloClient from "../utilities/apollo-client";

export async function getCount() {
  return apolloClient
    .query({
      query: gql`
            query {
              retrieveCart {
                cartToken
                cartItems {
                  totalCount
                }
              }
            }
      `,
    })
    .then((result) => result.data.retrieveCart);
}