import React from 'react';
import {Line} from 'react-chartjs-2';
import { Icon, Input, Segment, Button, Divider, Label } from 'semantic-ui-react';
import {createApolloFetch} from 'apollo-fetch';
import { WebSocketLink } from 'apollo-link-ws';

// Connecting to Graphql Endpoint
const uri = 'http://167.99.240.197:8000/graphql';
const fetch = createApolloFetch({uri});



const temperature = {
  labels: [],
  datasets: [
    {
      label: 'live temperature',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: []
    }
  ]
};

const humidity = {
  labels: [],
  datasets: [
    {
      label: 'live humidity',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(32,124,232,2)',
      borderColor: 'rgba(32,124,232,2)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: []
    }
  ]
};


class PlantDetail extends React.Component {

	constructor(props) {
            // Preparing state
            super(props);
            console.log(sessionStorage)
            this.state = {
              plantID: sessionStorage.plantID,
              plantName: sessionStorage.plantName,
              arduID: "",
              jwt: sessionStorage.jwt
			};
		}

	   //Changing state
  	onChange = (e) => {
    	this.setState({
    	[e.target.name]: e.target.value,
    	});
  	}

  	onArduLoad = async (e) => {

  		try{

  		var loadOnArdu = `mutation {
                            loadPlantOnArdu(
                                  arduId: ` + `"` + this.state.arduID + `"` + `
                                  plantId: ` + `"` + this.state.plantID + `"` + `
                                  ){arduId}}`;

        fetch.use(({
      				request,
                    options
                }, next) => {
                    if (!options.headers) {
                        options.headers = {}; // Create the headers object if needed.
                    }
                    options.headers['authorization'] = "Bearer " + this.state.jwt;

                    next();
                });

        // Fetching query
        fetch({
                    query: loadOnArdu,
                }).then(res => {

                	console.log(res);

                });
            } catch (e) {
                console.log(e.message);
            }

  	}


	render(){

		return(

			<center>
				<br/>
				<br/>
                <div style={{width: 900}}>
                <Segment padded>
                <h2>{this.state.plantName}</h2>
                <br/>
                	<div style={{width: 300 , hight: 200}}>
                	<Line   data={temperature}
                        		width={300}
                        		height={200}
                        		options={{maintainAspectRatio : false}} />
                    </div>
                    <div style={{width: 300 , hight: 200}}>
                	<Line   data={humidity}
                        		width={300}
                        		height={200}
                        		options={{maintainAspectRatio : false}} />
                    </div>
                <br/>
                <Divider horizontal>You want live data? Connect your plant to an Arduino!</Divider>
                <br/>
                <Input name="arduID" placeholder="Arduino ID" onChange={ e=> this.onChange(e) } value = { this.state.arduID }/>
                <br/>
                <br/>
                <Button primary onClick={ e => this.onArduLoad(e)} > connect </Button>
				</Segment>
				</div>
			</center>

			)

	}
}


export default PlantDetail
