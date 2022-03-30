import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

// Function: createApolloClient
// Creates the actual client that will be used to access
// and query data from the api.
function createApolloClient() {
  const URI = 'https://lds-scripture-api.herokuapp.com/v1/graphql';

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: URI,
    }),
    cache: new InMemoryCache(),
  });
}

export default createApolloClient;
