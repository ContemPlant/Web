import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, createNetworkInterface } from 'react-apollo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import logo from './styles/logo.svg';
import Login from './routes/Login';
import Register from './routes/Register';
import Landingpage from './routes/Landingpage';
import PlantDetail from './routes/PlantDetail';
import Overview from './routes/Overview';
import { GRAPHQL_URI } from './Utils/config'

const networkInterface = createNetworkInterface({
    uri: GRAPHQL_URI,
});
const client = new ApolloClient({
    networkInterface: networkInterface
});

const App = () => (
    <ApolloProvider client={client}>
        <div>
            <center>
                <header className="HomePage-header">
                    <style>
                        @import url('https://fonts.googleapis.com/css?family=Pacifico');
                </style>
                    <img src={logo} className="HomePage-logo" alt="logo" />
                    <h1 className="HomePage-title"><span>Contem</span>Plant</h1>
                </header>
            </center>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={props => <Landingpage {...props} />} />
                    <Route path="/register" render={props => <Register {...props} />} />
                    <Route path="/login" render={props => <Login {...props} />} />
                    <Route path="/detail" render={props => <PlantDetail {...props} />} />
                    <Route path="/overview" render={props => <Overview {...props} />} />
                </Switch>
            </BrowserRouter>
        </div>
    </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
