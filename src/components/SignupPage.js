import React from 'react';
import { Link } from "react-router-dom";
import { gql, graphql } from 'react-apollo';
import { Form, Button } from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from '../messages/InlineError';


 // Signup React-component
class SignupPage extends React.Component {
  state = {
    data: {
      email: '',
      password: '',
      password2: '',
      jwt: ''
    },
    loading: false,
    errors: {}
  };

  // Changing state
  onChange = e => this.setState({
    data: { ...this.state.data, [e.target.name]: e.target.value }
  });

  // Register user and persist on DB
  onSubmit = async () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      try {
        const response = await this.props.mutate({ variables: this.state.data });
        console.log(response);
        alert("User successfully created.")
        this.props.history.push("/login");  // TODO: use token and go to dashboard directly
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
      if (data.password !== data.password2) errors.password2 = "Passwords are not equal";
      return errors;
    }

  //Render function of component
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
          <Link to="/login">
            <i className="unlock alternate icon"></i>
            Login
          </Link>
        </div>
        <div className="item">
          <i className="sign in icon"></i>
          Sign up
        </div>
        </div>


        <div className="ui centered grid container">
        <div className="nine wide column">
              <a className="green card">
          <h1>Sign up</h1>
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
                placeholder="Choose a password"
                value={data.password}
                onChange={this.onChange}
              />
              {errors.password && <InlineError text={errors.password} />}
            </Form.Field>
            <Form.Field required error={!!errors.password2}>
              <label htmlFor="password2">Confirm Password</label>
              <input
                type="password2"
                id="password2"
                name="password2"
                placeholder="Repeat your password"
                value={data.password2}
                onChange={this.onChange}
              />
              {errors.password2 && <InlineError text={errors.password2} />}
            </Form.Field>

            <Button className="ui primary labeled icon button" >
              <i className="sign in icon"></i>
              Sign up
            </Button>
          </Form>
          </a>
        </div>
        </div>

        </div>
      );
    }
}

const mutation = gql `
mutation signup ($email: String!, $password: String!){
  signup(email: $email, password:$password) {
    user{id,email}
}
}
`;

export default graphql(mutation)(SignupPage);
