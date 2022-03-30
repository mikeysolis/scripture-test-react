import { ApolloProvider } from '@apollo/client';
import { initializeApollo } from './api/apollo';

// Include all the global css
import './normalize.css';
import './skeleton.css';
import './App.css';

import Home from './Home';

function App() {
  // Initialize Apollo
  const apolloClient = initializeApollo();

  return (
    // Wrap the app in the apollo provider so we have access to it everywhere
    <ApolloProvider client={apolloClient}>
      <Home />
    </ApolloProvider>
  );
}

export default App;
