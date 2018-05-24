import React from 'react';
import { Link } from "react-router-dom";
import { createApolloFetch } from 'apollo-fetch';
import { Form, Button } from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from '../messages/InlineError';
//import "../styles/Forms.css"

// Connecting to Graphql Endpoint
const uri = 'http://167.99.240.197:8000/graphql';
const fetch = createApolloFetch({
  uri
});


// React Login-component
export default class LoginPage extends React.Component {
  state = {
    data: {
      email: '',
      password: '',
      jwt: ''
    },
    loading: false,
    errors: {}
  };

  //Changing state
  onChange = e => this.setState({
     data: { ...this.state.data, [e.target.name]: e.target.value }
   });

   // validate data, pass it to submit function, handle errors
   onSubmit = () => {
     const errors = this.validate(this.state.data);
     this.setState({ errors });
     if (Object.keys(errors).length === 0) {
       this.setState({ loading: true });
       try {

         // Preparing the query for gql
         var gQuery = `mutation {
                              login(
                                    email: ` + `"` + this.state.data.email + `"` + `
                                    password: ` + `"` + this.state.data.password + `"` + `
                                    ){user{id,email},token}}`;

        // Fetching query
        fetch({ query: gQuery }).then(res => {
          this.state.data.jwt = res.data.login.token;
          sessionStorage.email = this.state.data.email;
          sessionStorage.jwt = this.state.data.jwt;
          this.props.history.push("/dashboard");
          });
        } catch (e) {
          console.log(e.message);
          this.setState({ loading: false })
          alert(e.message);
       }
  }
};


validate = (data) => {
  const errors = {};
  if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
  if (!data.password) errors.password = "Password can't be blank";
  return errors;
}

  // Render HTML coding
  render() {

    const { data, errors, loading } = this.state;

    return (
      <div className="form">

      <div className="ui secondary menu">
      <div className="item">
        <Link to="/">
          <i className="home icon"></i>
        </Link>
      </div>
      <div className="item">
        <Link to="/">
            <i className="info icon"></i>
        </Link>
      </div>
      <div className="right item">
        <i className="unlock alternate icon"></i>
        Login
      </div>
      <div className="item">
        <Link to="/signup">
          <i className="sign in icon"></i>
          Sign up
      </Link>
      </div>
      </div>


      <div className="ui centered grid container">
      <div className="nine wide column">
      <a className="green card">
        <h1>Login</h1>
        <Form onSubmit={ ()=> this.onSubmit()} loading={loading}>
          <Form.Field required error={!!errors.email}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@example.com"
              value={data.email}
              onChange={this.onChange}
            />
            {errors.email && <InlineError text={errors.email} />}
          </Form.Field>
          <Form.Field required error={!!errors.password}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Your password"
              value={data.password}
              onChange={this.onChange}
            />
            {errors.password && <InlineError text={errors.password} />}
          </Form.Field>
          <Button className="ui primary labeled icon button" >
            <i className="unlock alternate icon"></i>
            Login
          </Button>
        </Form>
        </a>
      </div>
      </div>

      </div>
      );
    }
}
