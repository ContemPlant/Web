import React, { Component } from 'react';
import {createApolloFetch} from 'apollo-fetch';
import { Accordion, Icon, Button, Input } from 'semantic-ui-react';
import { loadOnArdu } from '../Utils/queries';
import { GRAPHQL_URI } from '../Utils/config'

// Connecting to Graphql Endpoint
const fetch = createApolloFetch({uri: GRAPHQL_URI});

export default class ArduLoader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      health: this.props.health,
      activeIndex: 1,
      plantId: this.props.plantId,
      plantName: this.props.plantName,
      arduId: ""
  	};
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })

    //notify the "native" app
    window.postMessage(`loadOnArdu|plantID:${this.state.plantId},plantName:${this.state.plantName}`, "*")
}

onChange = (e) => {
 this.setState({
   [e.target.name]: e.target.value,
 });
}

onArduLoad = async (e) => {

  try{
      fetch.use(({
        request,
        options
      }, next) => {
        if (!options.headers) {
              options.headers = {}; // Create the headers object if needed.
            }
            options.headers['authorization'] = "Bearer " + sessionStorage.jwt

            next();
          });

    // Fetching query
fetch({
query: loadOnArdu(this.state.arduId, this.state.plantId),
}).then(res => {

console.log(res);
sessionStorage.arduId = this.state.arduId;
sessionStorage.loadedPlantId = this.state.plantId;
sessionStorage.loadedPlantName = this.state.plantName;

});
} catch (e) {
console.log(e.message);
}

}

	render() {

    const { activeIndex } = this.state;

		return (
			<div>
      <Accordion>
      <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
        <Icon name='angle double down' />
        Connect your plant
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 0}>
        <Input name="arduId" placeholder="Arduino ID" onChange={ e=> this.onChange(e) } value = { this.state.arduId }/>
        <br/>
        <br/>
        <Button primary onClick={ e => this.onArduLoad(e)} > connect </Button>
      </Accordion.Content>
      </Accordion>
			</div>
		);
	}
}
