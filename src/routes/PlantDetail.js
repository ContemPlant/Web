import React from 'react';
import {Line} from 'react-chartjs-2';
import { Icon, Input, Segment, Button, Divider, Label } from 'semantic-ui-react';
import { createApolloFetch } from 'apollo-fetch';


import logo from "../styles/logo.svg";
import '../styles/styles.css';
import Healthometer from '../Healthometer';


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
            // Preparing states
            super(props);
            this.state = {
              plantID: sessionStorage.plantID,
              plantName: sessionStorage.plantName,
              arduID: "",
              jwt: sessionStorage.jwt,
              temperature : tempTemplate,
              humidity: humTemplate,
              loudness: loudTemplate,
              radiation: radTemplate,
              timer: ""
            };
          }



     //Changing state on user input
     onChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }

    //Get last data of plant and add it into chart array
    onUpdatePlantData = async (e) => {

      try{

        var updateData = `query {
          plant(
          id: ` + `"` + this.state.plantID + `"` + `
          ){name ,loudnessData(last: 1){value ,  timeStamp}, humidityData(last: 1){value ,  timeStamp}, radiationData(last: 1){value ,  timeStamp}, temperatureData(last : 1){value, timeStamp}}}`;

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
          query: updateData,
        }).then(res => {


          if( this.state.temperature.labels[this.state.temperature.labels.length - 1] !== res.data.plant.temperatureData[0].timeStamp.substring(11, 19)){

            this.state.temperature.labels = [...this.state.temperature.labels, res.data.plant.temperatureData[0].timeStamp.substring(11, 19)]
            this.state.temperature.datasets[0].data = [...this.state.temperature.datasets[0].data, res.data.plant.temperatureData[0].value]

            this.state.humidity.labels = [...this.state.humidity.labels, res.data.plant.humidityData[0].timeStamp.substring(11, 19)]
            this.state.humidity.datasets[0].data = [...this.state.humidity.datasets[0].data, res.data.plant.humidityData[0].value]

            this.state.radiation.labels = [...this.state.radiation.labels, res.data.plant.radiationData[0].timeStamp.substring(11, 19)]
            this.state.radiation.datasets[0].data = [...this.state.radiation.datasets[0].data, res.data.plant.radiationData[0].value]

            this.state.loudness.labels = [...this.state.loudness.labels, res.data.plant.loudnessData[0].timeStamp.substring(11, 19)]
            this.state.loudness.datasets[0].data = [...this.state.loudness.datasets[0].data, res.data.plant.loudnessData[0].value]

            // Has to be there :D! => refreshes the state
            this.setState({
            });
          }else{
            console.log("No new data!")
          }
        });
      } catch (e) {
        console.log(e.message);
      }

            // timeout to wait for new data
            setTimeout(function(){this.onUpdatePlantData();}.bind(this), 4000);

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

      setTimeout(function(){this.onUpdatePlantData();}.bind(this), 8000);

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
                <h2>{this.state.plantName}</h2>
                <br/>
                  < Healthometer health={100} />
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
