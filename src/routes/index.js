import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom'

import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" render={props => <Register {...props} />} />
      <Route exact path="/login" render={props => <Login {...props} />} />
      <Route exact path="/dashboard" render={props => <Dashboard {...props} />} />
    </Switch>
  </BrowserRouter>
);
