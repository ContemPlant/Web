import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, createNetworkInterface } from 'react-apollo';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './routes/Login';
import Register from './routes/Register';
import Landingpage from './routes/Landingpage';
import PlantDetail from './routes/PlantDetail';
import Overview from './routes/Overview';

const networkInterface = createNetworkInterface({
  uri: 'http://167.99.240.197:8000/graphql',
});
const client = new ApolloClient({
  networkInterface: networkInterface
});

const App = () => (
  <ApolloProvider client={client}>
  <BrowserRouter>
    <Switch>
      <Route exact path="/" render={props => <Landingpage {...props} />} />
      <Route exact path="/register" render={props => <Register {...props} />} />
      <Route exact path="/login" render={props => <Login {...props} />} />
      <Route exact path="/detail" render={props => <PlantDetail {...props} />} />
      <Route exact path="/overview" render={props => <Overview {...props} />} />
    </Switch>
  </BrowserRouter>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
