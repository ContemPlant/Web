import React from 'react'
import { gql, graphql } from 'react-apollo'
import { Form, Segment, Button, Divider } from 'semantic-ui-react'
import Validator from 'validator'

import InlineError from '../Components/messages/InlineError'


class Register extends React.Component {
  state = {
    data: {
      username: '',
      email: '',
      password: '',
      password2: ''
    },
    loading: false,
    errors: {}
  };


  onChange = e => this.setState({
    data: { ...this.state.data, [e.target.name]: e.target.value }
  });


    onSubmit = async () => {
      const errors = this.validate(this.state.data);
      this.setState({ errors });
      if (Object.keys(errors).length === 0) {
        this.setState({ loading: true });
        try {
          const response = await this.props.mutate({ variables: this.state.data });
          console.log(response);
          alert("User successfully created.")
          sessionStorage.email = this.state.data.email
          sessionStorage.username = response.data.signup.user.username
          sessionStorage.jwt = response.data.signup.token
          this.props.history.push("/overview")
        } catch (e) {
          console.log(e.message);
          this.setState({ loading: false })
          alert(e.message);
        }
      }
    };

  validate = (data) => {
    const errors = {};
    if (!data.username) errors.username = "Choose a username!"
    if (!Validator.isEmail(data.email)) errors.email = "Invalid email!";
    if (!data.password) errors.password = "Password can't be blank!";
    if (!data.password2 || data.password !== data.password2) errors.password2 = "Passwords have to be equal!";
    return errors;
  }


    render() {

      const { data, errors, loading } = this.state;

      return (
        < center>
        <div style={{ maxWidth: 400, height: 600 }}>
          <br />
          <br />
          <Segment padded>
            <h1>
              Sign up
            </h1>
            <br />
            <br />
            <Form
              onSubmit={ ()=> this.onSubmit()}
              loading={loading}>
              <Form.Field error={!!errors.username}>
                <label htmlFor="username">
                  <Divider horizontal>Username</Divider>
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Choose a username"
                  value={data.username}
                  onChange={this.onChange}
                  />
                {errors.username &&
                  <InlineError text={errors.username} />
                }
              </Form.Field>
              <Form.Field error={!!errors.email}>
                <label htmlFor="email">
                  <Divider horizontal>Email</Divider>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="example@example.com"
                  value={data.email}
                  onChange={this.onChange}
                  />
                {errors.email &&
                  <InlineError text={errors.email} />
                }
              </Form.Field>
              <Form.Field error={!!errors.password}>
                <label htmlFor="password">
                  <Divider horizontal>Password</Divider>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Choose a password"
                  value={data.password}
                  onChange={this.onChange}
                  />
                {errors.password &&
                  <InlineError text={errors.password} />
                }
              </Form.Field>
              <Form.Field error={!!errors.password2}>
                <label htmlFor="password2"></label>
                <input
                  type="password"
                  id="password2"
                  name="password2"
                  placeholder="Repeat your password"
                  value={data.password2}
                  onChange={this.onChange}
                  />
                {errors.password2 &&
                  <InlineError text={errors.password2} />
                }
              </Form.Field>

              <Button color="green" fluid >
                <i className="pencil icon">
                </i>
                Sign up
              </Button>
            </Form>
            <br />
          </Segment>
          <br />
          <Divider horizontal>
            Already registered?
          </Divider>
          <br />
          <Button
            color='orange'
            fluid
            onClick={() => { this.props.history.push("/login") }}>
            <i className="unlock alternate icon"></i>
            Login
          </Button>
        </div>
      </center>
    )
  }
}

const mutation = gql`
mutation signup ($username: String!, $email: String!, $password: String!){
  signup(username: $username, email: $email, password:$password) {
    user { username, id, email }, 
    token
  }
}`

export default graphql(mutation)(Register)
