import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import HomePage from './HomePage';
import Dashboard from './Dashboard';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" render={props => <HomePage {...props} />} />
      <Route exact path="/signup" render={props => <SignupPage {...props} />} />
      <Route exact path="/login" render={props => <LoginPage {...props} />} />
      <Route exact path="/dashboard" render={props => <Dashboard {...props} />} />
    </Switch>
  </BrowserRouter>
);
