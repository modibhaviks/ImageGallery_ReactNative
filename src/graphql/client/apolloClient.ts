import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const client = new ApolloClient({
  link: new HttpLink({
    // uri: 'https://graphqlzero.almansi.me/api',
    uri: 'https://graphqlplaceholder.vercel.app/graphql',
  }),
  cache: new InMemoryCache(),
});
