import React from 'react';
import {Line} from 'react-chartjs-2';
import { Icon, Input, Segment, Button, Divider, Label } from 'semantic-ui-react';
import { createApolloFetch } from 'apollo-fetch';
import { updatePlantData, loadOnArdu } from '../queries'

import logo from "../styles/logo.svg";
import '../styles/styles.css';
import Healthometer from '../Healthometer';
import Tree from "./Tree"


// Connecting to Graphql Endpoint
const uri = 'http://167.99.240.197:8000/graphql';
const fetch = createApolloFetch({uri});


// Chart templates 
var tempTemplate = {
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

var radTemplate = {
  labels: [],
  datasets: [
  {
    label: 'live radiation',
    fill: false,
    lineTension: 0.1,
    backgroundColor: 'rgba(140,0,22,130)',
    borderColor: 'rgba(140,0,22,130)',
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: 'rgba(75,192,192,1)',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'rgba(140,0,22,130)',
    pointHoverBorderColor: 'rgba(140,0,22,130)',
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: []
  }
  ]
};

var loudTemplate = {
  labels: [],
  datasets: [
  {
    label: 'live loudness',
    fill: false,
    lineTension: 0.1,
    backgroundColor: 'rgba(150,45,232,2)',
    borderColor: 'rgba(150,45,232,2)',
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: 'rgba(150,45,232,2)',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'rgba(150,45,232,2)',
    pointHoverBorderColor: 'rgba(150,45,232,2)',
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: []
  }
  ]
};

var humTemplate = {
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
            super(props);
            this.state = {
              plantId: sessionStorage.plantId,
              plantName: sessionStorage.plantName,
              arduId: sessionStorage.arduId,
              jwt: sessionStorage.jwt,
              health: 0,
              size: 0,
              temperature : "",
              humidity: "",
              loudness: "",
              radiation: "",
              timer: "",
              loaded: this.plantIsLoaded(),
            };

            if (this.state.loaded) {
              this.state.temperature = tempTemplate
              this.state.humidity = humTemplate
              this.state.loudness = loudTemplate
              this.state.radiation = radTemplate
              this.onUpdatePlantData()
            }

            console.log(this.state.loaded)

          }


  plantIsLoaded() {
    if (sessionStorage.loadedPlantId === sessionStorage.plantId ) {
      return true
    } else {
      return false
    }
  };


     //Changing state on user input
     onChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }

    //Get last data of plant and add it into chart array
    onUpdatePlantData = async (e) => {
      try{

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
          query: updatePlantData(this.state.plantId),
        }).then(res => res.data.plant.plantStates && res.data.plant.plantStates[0])
        .then(plantState => {
          if(!plantState) {
            console.log("No data")
            return
          }
          const { sensorDates } = plantState
          console.log(this.state.temperature)
          console.log(sensorDates)
          console.log(plantState)

          const oldTime = this.state.temperature.labels.slice(-1)[0]
          const newTime = sensorDates.timeStamp.substring(11, 19)

          if (oldTime != newTime) {
            console.log("Setting state")
            this.setState(prev => ({
              health: Math.floor(plantState.health* 100),
              size: plantState.size,
              temperature : {
                  ...prev.temperature,
                  labels: [...prev.temperature.labels, sensorDates.timeStamp.substring(11, 19)],
                  datasets : [ { ...prev.temperature.datasets[0], data: [ ...prev.temperature.datasets[0].data, sensorDates.temperatureValue] }]
                },
                humidity : {
                    ...prev.humidity,
                    labels: [...prev.humidity.labels, sensorDates.timeStamp.substring(11, 19)],
                    datasets : [ { ...prev.humidity.datasets[0], data: [ ...prev.humidity.datasets[0].data, sensorDates.humidityValue] }]
                  },
                radiation : {
                      ...prev.radiation,
                      labels: [...prev.radiation.labels, sensorDates.timeStamp.substring(11, 19)],
                      datasets : [ { ...prev.radiation.datasets[0], data: [ ...prev.radiation.datasets[0].data, sensorDates.radiationValue] }]
                },
                loudness : {
                    ...prev.loudness,
                    labels: [...prev.loudness.labels, sensorDates.timeStamp.substring(11, 19)],
                    datasets : [ { ...prev.loudness.datasets[0], data: [ ...prev.loudness.datasets[0].data, sensorDates.loudnessValue] }]
                  },
            }))
        }
        });
      } catch (e) {
        console.log(e.message);
      }

            // timeout to wait for new data
            setTimeout(function(){this.onUpdatePlantData();}.bind(this), 4000);

          }

    render(){

      return(

                    <center>

                    <header className="HomePage-header">
                     <style>
                     @import url('https://fonts.googleapis.com/css?family=Pacifico');
                     </style>
                     <img src={logo} className="HomePage-logo" alt="logo" />
                     <h1 className="HomePage-title"><span>Contem</span>Plant</h1>
                   </header>
        <br/>
        <br/>
                <div style={{width: 900}}>
                <Segment padded>
                <h1>{this.state.plantName}</h1>
                <br/>
                <Tree heightFactor={this.state.size/100} />
                <br/>
                <Divider />
                <Button.Group>
                  <Button color="green">live data</Button>
                  <Button.Or />
                  <Button color="orange">historical</Button>
                </Button.Group>
        <br/>
        <br/>
                  < Healthometer health={this.state.health} />
                  <div style={{width: 700 , hight: 550}}>
                  <Line   data={this.state.temperature}
                            width={300}
                            height={200}
                            options={{maintainAspectRatio : false}} />
                    </div>
                    <div style={{width: 700 , hight: 550}}>
                  <Line   data={this.state.humidity}
                            width={300}
                            height={200}
                            options={{maintainAspectRatio : false}} />
                    </div>
                    <div style={{width: 700 , hight: 550}}>
                  <Line   data={this.state.radiation}
                            width={300}
                            height={200}
                            options={{maintainAspectRatio : false}} />
                    </div>
                    <div style={{width: 700 , hight: 550}}>
                  <Line   data={this.state.loudness}
                            width={300}
                            height={200}
                            options={{maintainAspectRatio : false}} />
                    </div>
                <br/>
        </Segment>
        </div>
      </center>


        )

    }
  }


  export default PlantDetail
