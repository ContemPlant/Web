import React from 'react'
import { Message } from 'semantic-ui-react'

const ErrorMessage = ({header, text}) => (
  <Message negative>
    <Message.Header>{header}</Message.Header>
    <p>{text}</p>
  </Message>
)

export default ErrorMessage