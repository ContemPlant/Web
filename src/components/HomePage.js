import React from 'react';
import { Link } from "react-router-dom";
import logo from '../styles/logo.svg';
import '../styles/HomePage.css';

const HomePage = () => (
  <div className="HomePage">
  <div className="ui secondary menu">
  <div className="item">
    <i className="home icon"></i>
  </div>
  <div className="item">
    <Link to="/">
        <i className="info icon"></i>
    </Link>
  </div>
  <div className="right item">
    <Link to="/login">
      <i className="unlock alternate icon"></i>
      Login
      </Link>
    </div>
    <div className="item">
    <Link to="/signup">
          <i className="sign in icon"></i>
          Sign up
    </Link>
    </div>
  </div>
  <header className="HomePage-header">
    <style>
      @import url('https://fonts.googleapis.com/css?family=Pacifico');
      </style>
    <img src={logo} className="HomePage-logo" alt="logo" />
    <h1 className="HomePage-title">ContemPlant</h1>
  </header>
  About ContemPlant
  </div>
);

export default HomePage;

/*
<style>
@import url('https://fonts.googleapis.com/css?family=Indie+Flower');
</style>

<style>
  @import url('https://fonts.googleapis.com/css?family=Kavivanar');
</style>

*/
