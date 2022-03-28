// post.service.js
import { gql } from "@apollo/client";
import apolloClient from "../utilities/apollo-client";

export async function getByID(id) {
    return apolloClient
        .query({
            query: gql`
      query GetMenu($Id: ID!){
        menu(id: $Id){
          id
          _id
          name
          data
          }
        }
      `,
      variables: { Id: id }
    })
        .then((result) => {
            return result;
        });
}