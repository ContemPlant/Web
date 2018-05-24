import React from 'react';
import {createApolloFetch} from 'apollo-fetch';
import {Line} from 'react-chartjs-2';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginPage from './LoginPage';
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
                jwt: sessionStorage.jwt,
                email: sessionStorage.email,
                plants: [],
                tempOpt: "",
                humidityOpt: "",
                radOpt: ""

            };

            this.updatePlants();

        }

    //Function to get the latest plant list
        updatePlants() {

            try {

                // Preparing the query for gql

                var plantQuery = `{plants{id temperature_opt humidity_opt radiation_opt}}`;

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
                    console.log(res)
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

   temperature_opt:` + this.state.tempOpt + `

   temperature_weight:1

   humidity_opt: ` + this.state.humidityOpt + `

   humidity_weight: 1

   water_opt:1

   water_weight: 0

   radiation_opt: ` + this.state.radOpt + `

   radiation_weight: 0
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

        }

        render() {
                // If not logged in -> redirect to login page
            if (this.state.jwt === "") {
                alert("Melde dich zuerst an!")
                return ( < LoginPage / > )
              } else {

                return (
                <center>
                    <div>
                        <h1>Hallo {this.state.email}</h1>
                        <br></br>
                        <h2> Deine Pflanzen: </h2>
                        <ul>
                            {this.state.plants.map((plant) => {return <Plant plant={plant} key={plant.id}/>})}
                        </ul>
                    </div>
                    <br></br>
                    <label>Optimale Temperatur:</label>
                    <br></br>
                    <input name = "tempOpt" onChange={ e=> this.onChange(e) } value = { this.state.tempOpt } placeholder="Temp. Opt."></input>
                    <br></br>
                    <label>Optmimale Luftfeuchtigkeit:</label>
                    <br></br>
                    <input name = "humidityOpt" onChange={ e=> this.onChange(e) } value = { this.state.humidityOpt } placeholder="Temp. Opt."></input>
                    <br></br>
                    <label>Optimale Helligkeit:</label>
                    <br></br>
                    <input name = "radOpt" onChange={ e=> this.onChange(e) } value = { this.state.radOpt } placeholder="Temp. Opt."></input>
                    <br></br>
                    <button onClick={ e => this.onCreatePlant(e)}>Erstelle eine Pflanze</button>
                </center>
                );}
            }
        }
