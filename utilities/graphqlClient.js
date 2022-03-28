import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

// Used server and client side - can't use react hooks
export const graphqlClient = new ApolloClient({
  cache: new InMemoryCache(),
  credentials: 'include',
  link: new HttpLink({
    uri: 'https://api.element-storm-cart.viewmynew.com/api/graphql',
  }),
  ssrMode: typeof window === 'undefined',
});