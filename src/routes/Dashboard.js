import React from 'react';
import {
    createApolloFetch
}
from 'apollo-fetch';


import Login from './Login';
import Plant from './Plant';



// Connecting to Graphql Endpoint
const uri = 'http://167.99.240.197:8000/graphql';
const fetch = createApolloFetch({
    uri
});

// React Login component
export default class Dashboard extends React.Component {

    constructor() {

            // Preparing state
            super();
            this.state = {
                email: sessionStorage.email,
                password: sessionStorage.password,
                jwt: sessionStorage.jwt,
                plants: [],
                tempOpt: ""

            };

            try {

                // Preparing the query for gql
                var gQuery = 'mutation {login(email: ' + '"' + sessionStorage.email + '"' + ', password: ' + '"' + sessionStorage.password + '"' + ') {user{id,email, plants{id,temperature_opt}},token}}';

                // Fetching query
                fetch({
                    query: gQuery,
                }).then(res => {
                    // Updating token (We need another solution for that)
                    this.setState({
                        jwt: res.data.login.token,
                        plants: res.data.login.user.plants
                    });


                });
            } catch (e) {
                console.log(e.message);
            }

        }

            onChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value,
        });
    }

        onCreatePlant = (e) => {

            fetch.use(({
                request, options
            }, next) => {
                if (!options.headers) {
                    options.headers = {}; // Create the headers object if needed.
                }
                options.headers['authorization'] = "Bearer " + this.state.jwt;

                next();
            });

            try {

                // Preparing the query for gql
                var gQuery = "mutation CreatePlant { createPlant(temperature_opt: " + this.state.tempOpt + ", temperature_weight: 0.5, radiation_opt: 22, radiation_weight:1.0, humidity_opt: 39, humidity_weight:1.0, water_opt: 100, water_weight: 2.0) { id owner { id email } temperature_opt temperature_weight radiation_opt radiation_weight humidity_opt humidity_weight water_opt water_weight waterData {id, createdAt} }}";

                // Fetching query
                fetch({
                    query: gQuery,
                }).then(res => {
                    // Updating token (We need another solution for that)
                    console.log(res)

                });
            } catch (e) {
                console.log(e.message);
            }

        }

        render() {
                // If not logged in -> redirect to login page
                if (this.state.email === "" || this.state.jwt === "") {
                  alert("Melde dich zuerst an!")
                  return ( < Login / > )
              } else {

                return (
                  <center>
                  <div>
                  <h1>Hallo {this.state.email}</h1>
                  <br></br>
                  <h2> Deine Pflanzen: </h2>
                  <ul>
                  {
                      this.state.plants.map((plant) => {
                        return <Plant plant={plant} key={plant.id}/>
                    })
                }
                </ul>
                </div>
                <br></br>
                <label>Temperatur Optimum deiner Pflanze:</label>
                <br></br>
                <input name = "tempOpt" onChange={ e=> this.onChange(e) } value = { this.state.tempOpt } placeholder="Temp. Opt."></input>
                <br></br>
                <button onClick={ e => this.onCreatePlant(e)}>Erstelle eine Pflanze</button>
                </center>
                );}
            }
        }

