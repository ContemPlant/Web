import React from 'react'
import { gql, graphql } from 'react-apollo'
import {
    Input,
    Segment,
    Button,
    Divider
} from 'semantic-ui-react'

//Register React-component
class Register extends React.Component {

    //State declaration
    state = {
        username: '',
        email: '',
        password: '',
        password2: ''
    }

    //Changing state on user input
    onChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    //Register user and persist on DB -> redirect to Login page
    onSubmit = async () => {
        if (this.state.password !== "" && this.state.password2 !== "" && this.state.email !== "") {
            if (this.state.password === this.state.password2) {
                try {
                    const response = await this.props.mutate({
                        variables: this.state
                    })
                    console.log(response)
                    //                    alert("User successfully created.")
                    this.props.history.push("/login")
                } catch (e) {
                    alert(e.message)
                }
            } else {
                alert("Passwords must be equal!")
            }
        } else {
            alert("Fields can't be blank!")
        }
    }

    //Render function of component
    render() {
        return (
            < center>
                <div style={{ maxWidth: 400, height: 600 }}>
                    <br />
                    <br />
                    <Segment padded>
                        <h1>Sign up</h1>
                        <br></br>
                        <Divider horizontal>Username</Divider>
                        <br></br>
                        <Input name='username' placeholder='username' onChange={e => this.onChange(e)} value={this.state.username} />
                        <br></br>
                        <Divider horizontal>Email</Divider>
                        <br></br>
                        <Input name='email' placeholder='email@email.com' onChange={e => this.onChange(e)} value={this.state.email} />
                        <br></br>
                        <Divider horizontal>Password</Divider>
                        <br></br>
                        <Input name='password' placeholder='Choose a password' type='password' onChange={e => this.onChange(e)} value={this.state.password} />
                        <br></br>
                        <Input name='password2' placeholder='Repeat password' type='password' onChange={e => this.onChange(e)} value={this.state.password2} />
                        <br></br>
                        <br></br>
                        <Button color='green' fluid onClick={() => this.onSubmit()} type="primary" > Sign up </Button>
                        <br></br>
                    </Segment>
                    <br></br>
                    <Divider horizontal>Already registered?</Divider>
                    <br></br>
                    <Button color='orange' fluid onClick={() => { this.props.history.push("/login") }}>Login</Button>
                </div>
            </center>
        )
    }
}

const mutation = gql`
    mutation signup ($username: String!, $email: String!, $password: String!){
            signup(username: $username, email: $email, password:$password) {
            user{username,id,email}
    }
}`

export default graphql(mutation)(Register)
