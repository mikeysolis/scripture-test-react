import { ApolloProvider } from '@apollo/client';
import { initializeApollo } from './api/apollo';

import './normalize.css';
import './skeleton.css';
import './App.css';

import Home from './Home';

function App() {
  const apolloClient = initializeApollo();

  return (
    <ApolloProvider client={apolloClient}>
      <Home />
    </ApolloProvider>
  );
}

export default App;
