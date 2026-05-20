import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://graphqlplaceholder.vercel.app/graphql',
  }),
  cache: new InMemoryCache(),
});
