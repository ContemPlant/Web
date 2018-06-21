import React from 'react'
import { Segment, Button, Divider } from 'semantic-ui-react'
import logo from "../styles/logo.svg"
import '../styles/styles.css'



class Landingpage extends React.Component {


render(){

	return(
    <center>
        <br/>
        <br/>
        <div style={{width: 400, height: 600}}>
          <Segment padded>
  	         <br/>
              <Button inverted color='green' fluid onClick={ ()=> {this.props.history.push("/login");}}>Login</Button>
              <Divider horizontal>Or</Divider>
              <Button inverted color='green' fluid onClick={ ()=> {this.props.history.push("/register");}}>Sign Up Now</Button>
          </Segment>
        </div>
  </center>
  )
}
}
export default Landingpage
