import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, createNetworkInterface } from 'react-apollo';
import 'semantic-ui-css/semantic.min.css';


import Routes from './components';

const networkInterface = createNetworkInterface({
  uri: 'http://167.99.240.197:8000/graphql',
});
const client = new ApolloClient({
  networkInterface: networkInterface
});

const App = () => (
  <ApolloProvider client={client}>
    <div className="ui container">
      <Routes />
    </div>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
