import React from 'react';
import {createApolloFetch} from 'apollo-fetch';
import {Line} from 'react-chartjs-2';
import { Icon, Input, Segment, Button, Divider } from 'semantic-ui-react'

import Login from './Login';
import Plant from './Plant';

// Connecting to Graphql Endpoint
const uri = 'http://167.99.240.197:8000/graphql';
const fetch = createApolloFetch({uri});

// React React-component
export default class Dashboard extends React.Component {

    // Constructor for state
        constructor() {

        // Preparing state
            super();
            this.state = {
                show : false,
                jwt: sessionStorage.jwt,
                email: sessionStorage.email,
                username: sessionStorage.username,
                plantName: "",
                plants: [],
                tempOpt: "",
                humidityOpt: "",
                radOpt: "",
                loudOpt: ""

            };

            this.updatePlants();

        }

    //Function to get the latest plant list
        updatePlants() {

            try {

                // Preparing the query for gql

                var plantQuery = `{plants{name id temperature_opt humidity_opt radiation_opt}}`;

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
                    query: plantQuery,
                }).then(res => {
                    this.setState({
                        //             jwt: res.data.login.token,
                        plants: res.data.plants
                    });

                });
            } catch (e) {
                console.log(e.message);
            }

        }

    //Changing state
        onChange = (e) => {

            this.setState({
                [e.target.name]: e.target.value,
            });
        }

    //show : true -> show creation screen
         onShow = (e) => {

            this.setState({
                show : !this.state.show
            });
        }


    //Function to crate a plant and persist on DB
        onCreatePlant = (e) => {
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

                try {

                var createPlant = `mutation {
 createPlant(
   name: "` + this.state.plantName + `"

   temperature_opt:` + this.state.tempOpt + `

   temperature_weight:1

   humidity_opt: ` + this.state.humidityOpt + `

   humidity_weight: 1

   radiation_opt: ` + this.state.radOpt + `

   radiation_weight: 1

   loudness_opt: `+ this.state.loudOpt + `

   loudness_weight: 1
 ) {
    id
 }
}`
                // Fetching query
                fetch({
                    query: createPlant,
                }).then(res => {
                    // Updating token (We need another solution for that)
                    console.log(res)
                    this.updatePlants();

                });
            } catch (e) {
                console.log(e.message);
            }
            this.onShow();
        }

        render() {
                // If not logged in -> redirect to login page
            if (this.state.jwt === "") {
                alert("Please login first!")
                return ( < Login / > )
              } else {

                return (
                <center>
                    <div style={{width: 600}}>
                        <br/>
                        <br/>
                        <Segment padded>
                        <h1>Hello {this.state.username}!</h1>
                        <br></br>
                        <h2> Your plants: </h2>
                        <ul>
                            {this.state.plants.map((plant) => {return <Plant plant={plant} history={this.props.history} jwt={this.state.jwt} key={plant.id}/>})}
                        </ul>
                        </Segment>
                    </div>
                    <br></br>
                    { this.state.show ? (
                    <div>
                        <label>Plant name:</label>
                        <br></br>
                        <Input name = "plantName" onChange={ e=> this.onChange(e) } value = { this.state.plantName } placeholder="Plant name"/>
                        <br></br>
                        <label>Optimal temperature:</label>
                        <br></br>
                        <Input name = "tempOpt" onChange={ e=> this.onChange(e) } value = { this.state.tempOpt } placeholder="Temperature Opt."/>
                        <br></br>
                        <label>Optimal humidity:</label>
                        <br></br>
                        <Input name = "humidityOpt" onChange={ e=> this.onChange(e) } value = { this.state.humidityOpt } placeholder="Humidity Opt."/>
                        <br></br>
                        <label>Optimal brightness:</label>
                        <br></br>
                        <Input name = "radOpt" onChange={ e=> this.onChange(e) } value = { this.state.radOpt } placeholder="Radiation Opt."/>
                        <br></br>
                        <label>Optimal loudness:</label>
                        <br></br>
                        <Input name = "loudOpt" onChange={ e=> this.onChange(e) } value = { this.state.loudOpt } placeholder="Loudness Opt."/>
                        <br></br>
                        <br></br>
                        <Button primary onClick={ e => this.onCreatePlant(e)}>Submit your new plant!</Button>
                    </div>
                        ) : (
                        <Button primary onClick={ e => this.onShow(e)}>Create a new plant!</Button>
                        )}
                        <br></br>
                        <br></br>
                </center>
                );}
            }
        }
