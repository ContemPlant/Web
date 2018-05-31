import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom'

import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Landingpage from './Landingpage';
import PlantDetail from './PlantDetail';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" render={props => <Landingpage {...props} />} />
      <Route exact path="/register" render={props => <Register {...props} />} />
      <Route exact path="/login" render={props => <Login {...props} />} />
      <Route exact path="/dashboard" render={props => <Dashboard {...props} />} />
      <Route exact path="/detail" render={props => <PlantDetail {...props} />} />
    </Switch>
  </BrowserRouter>
);
