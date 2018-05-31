import React from 'react';
import {
  createApolloFetch
} from 'apollo-fetch';
import { Icon, Input, Segment, Button, Divider, Label } from 'semantic-ui-react'

// Connecting to Graphql Endpoint
const uri = 'http://167.99.240.197:8000/graphql';
const fetch = createApolloFetch({
  uri
});


// React Login-component
export default class Login extends React.Component {

  state = {
    email: '',
    password: ''
//    jwt: ''
  }

   //Changing state
  onChange = (e) => {
    this.setState({
    [e.target.name]: e.target.value,
    });
  }


  onLogin = async () => {

   try {

   // Preparing the query for gql
   var gQuery = `mutation {
                            login(
                                  email: ` + `"` + this.state.email + `"` + `
                                  password: ` + `"` + this.state.password + `"` + `
                                  ){user{username,id,email},token}}`;

    // Fetching query
    fetch({
    query: gQuery,
      }).then(res => {
//      this.state.jwt = res.data.login.token;
      alert("Successfully logged in!");
      sessionStorage.email = this.state.email;
      sessionStorage.username = res.data.login.user.username;
      sessionStorage.jwt = res.data.login.token;
      this.props.history.push("/dashboard");
      });
    } catch (e) {
      console.log(e.message);
      alert(e.message);
      }
  }

  render() {
   return (

    <center>
      <div style={{width: 400, height: 600}}>
        <br/>
        <br/>
        <Segment padded>
        <h1>Login</h1>
        <br></br>
        <Divider horizontal>Email</Divider>
        <br></br>
        <Input name="email" placeholder="email@email.com" onChange={ e=> this.onChange(e) } value = { this.state.email } />
        <br></br>
        <Divider horizontal>Password</Divider>
        <br></br>
        <Input name="password" placeholder="Your password" type="password" onChange={ e=> this.onChange(e) } value = { this.state.password } />
        <br></br>
        <br></br>
        <Button color="green" fluid onClick={ ()=> this.onLogin()}> login </Button>
        <br></br>
        </Segment>
        <br></br>
        <Divider horizontal>Not registered yet?</Divider>
        <br></br>
        <Button color="orange" fluid onClick={ ()=> {this.props.history.push("/register");}}>Sign up</Button>
      </div>
    </center>

            );
        }
      }
