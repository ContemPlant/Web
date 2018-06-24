import React from 'react'
import { createApolloFetch } from 'apollo-fetch'
import { Form, Segment, Button, Divider } from 'semantic-ui-react'
import Validator from 'validator';

import { loginQuery } from '../Utils/queries'
import InlineError from '../Components/messages/InlineError'

// Connecting to Graphql Endpoint
const uri = 'http://167.99.240.197:8000/graphql'
const fetch = createApolloFetch({
    uri
})


// React Login-component
export default class Login extends React.Component {

    // Module state
    state = {
      data: {
        email: '',
        password: ''
      },
      loading: false,
      errors: {}
    };

    //Changing state on user input
    onChange = e => this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });


    onLogin = async () => {
      const errors = this.validate(this.state.data);
      this.setState({ errors });
      if (Object.keys(errors).length === 0) {
        this.setState({ loading: true });

        try {
          fetch({
            query: loginQuery(this.state.data.email, this.state.data.password),
          })
          .then(res => {

            if(res.errors) {
              var errorMsg = res.errors[0].message ? res.errors[0].message : "An error occured";
              console.log(errorMsg);
              throw new Error(errorMsg)
            }

            sessionStorage.email = this.state.data.email
            sessionStorage.username = res.data.login.user.username
            sessionStorage.jwt = res.data.login.token
            this.props.history.push("/overview")
          })
          .catch(errorMsg => {
            this.setState({ loading: false })
            alert(errorMsg)
          }
        );
      } catch (e) {
        console.log(e)
        alert(e)
      }
    }
  }


    validate = (data) => {
      const errors = {};
      if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
      if (!data.password) errors.password = "Password can't be blank";
      return errors;
    }

    // Render function
    render() {

        const { data, errors, loading } = this.state;

        return (

            <center>
                <div style={{ maxWidth: 400, height: 600 }}>
                    <br />
                    <br />
                    <div className="ui centered grid container">
                    <Segment padded>
                        <h1>Login</h1>
                        <br />
                        <br />
                        <Form
                          onSubmit={ ()=> this.onLogin()}
                          loading={loading}>
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
                              placeholder="Your password"
                              value={data.password}
                              onChange={this.onChange}
                              />
                            {errors.password &&
                              <InlineError text={errors.password} />
                            }
                          </Form.Field>
                          <Button color="green" fluid >
                            <i className="unlock alternate icon">
                            </i>
                            Login
                          </Button>
                        </Form>
                        <br />
                    </Segment>
                    <br />
                    <Divider horizontal>Not registered yet?</Divider>
                    <br />
                    <Button
                      color="orange"
                      fluid
                      onClick={() => { this.props.history.push('/register') }}>
                      <i className="pencil icon">
                      </i>
                      Sign up
                    </Button>
                </div>
                </div>
            </center>

        )
    }
}
