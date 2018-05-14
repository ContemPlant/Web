import React from 'react';
import {
    gql,
    graphql
} from 'react-apollo';



class Register extends React.Component {
    state = {
        email: '',
        password: '',
        password2: ''
    }

    onChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    onSubmit = async () => {
        console.log(this.props);
        if (this.state.password !== "" && this.state.password2 !== "" && this.state.email !== "") {
            if (this.state.password === this.state.password2) {
                try {
                    const response = await this.props.mutate({
                        variables: this.state
                    });
                    console.log(response);
                    alert("User wurde erfolgreich angelegt.")
                    this.props.history.push("/login");
                } catch (e) {
                    alert(e.message)
                }
            } else {
                alert("Passwoerter sind unterschiedlich!")
            }
        } else {
            alert("Alle Felder müssen ausgefüllt werden!")
        }
    };

    render() {
        return (
          < center>
          < div>
          <h1>Registrierung</h1>
          <br></br>

          < label> Email:
          < /label> <br></br>
          < input name='email' placeholder='Email' onChange={ e=> this.onChange(e) } value = { this.state.email } /> <br></br>
          < label> Passwort:
          < /label> <br></br>
          < input name='password' placeholder='Passwort' type='password' onChange={ e=> this.onChange(e) } value = { this.state.password } /> <br></br>
          < input name='password2' placeholder='Passwort wiederholen' type='password' onChange={ e=> this.onChange(e) } value = { this.state.password2 } /> <br></br>
          <br></br>
          < button onClick={ ()=> this.onSubmit() } type = "primary" > Registrieren
          < /button>
          <br></br>
          <br></br>
          <label>Bereits registriert?</label>
          <br></br>
          <button onClick={ ()=> {this.props.history.push("/login");}}>Anmelden</button>
          </div>
          < /center>
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

export default graphql(mutation)(Register);
