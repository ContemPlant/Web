import React from 'react';
import {
  createApolloFetch
} from 'apollo-fetch';

// Connecting to Graphql Endpoint
const uri = 'http://167.99.240.197:8000/graphql';
const fetch = createApolloFetch({
  uri
});


// React Login component
export default class Login extends React.Component {

  state = {
    email: '',
    password: '',
    jwt: ''
  }

        //
        onChange = (e) => {

          this.setState({
            [e.target.name]: e.target.value,
          });
        }


        onLogin = async () => {

          try {

                // Preparing the query for gql
                var gQuery = 'mutation {login(email: ' + '"' + this.state.email + '"' + ', password: ' + '"' + this.state.password + '"' + ') {user{id,email},token}}';

                // Fetching query
                fetch({
                  query: gQuery,
                }).then(res => {
                  this.state.jwt = res.data.login.token;
                  alert("Erfolgreich eingelogt.");
                  sessionStorage.email = this.state.email;
                  sessionStorage.jwt = this.state.jwt;
                  sessionStorage.password = this.state.password;
                  this.props.history.push("/dashboard");
                    //                this.props.history.push("/dashboard?email="+this.state.email+"&jwt="+this.state.jwt);
                  });
              } catch (e) {
                console.log(e.message);
                alert(e.message);
              }
            }

        // Render HTML coding
        render() {
          return (

            <center>
            <div>
            <h1>Login</h1>
            <br></br>
            <label>Email:</label>
            <br></br>
            <input name="email" placeholder="Email" onChange={ e=> this.onChange(e) } value = { this.state.email } >
            </input>
            <br></br>
            <label>Passwort:</label>
            <br></br>
            <input name="password" placeholder="Passwort" type="password" onChange={ e=> this.onChange(e) } value = { this.state.password }>
            </input>
            <br></br>
            <br></br>
            <button onClick={ ()=> this.onLogin()
            }> Anmelden < /button>
            <br></br>
            <br></br>
            <label>Noch nicht registriert?</label>
            <br></br>
            <button onClick={ ()=> {this.props.history.push("/");}}>Registrieren</button>
            </div>
            </center>

            );
        }
      }
