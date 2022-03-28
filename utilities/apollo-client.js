import { ApolloClient, InMemoryCache } from "@apollo/client/core";

const client = new ApolloClient({
    uri: "https://api.cloudapi.viewmynew.com/api/graphql",
    cache: new InMemoryCache(),
    credentials: 'include',
});

export default client;