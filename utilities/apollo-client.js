import { ApolloClient, InMemoryCache } from "@apollo/client/core";

const client = new ApolloClient({
    uri: "https://api.element-storm-cart.viewmynew.com/api/graphql",
    cache: new InMemoryCache(),
    credentials: 'include',
});

export default client;