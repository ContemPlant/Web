import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, createNetworkInterface } from 'react-apollo';
import ws from 'apollo-link-ws'


import Routes from './routes';

const networkInterface = createNetworkInterface({
  uri: 'http://167.99.240.197:8000/graphql',
});
const client = new ApolloClient({
  networkInterface: networkInterface
});

const App = () => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
