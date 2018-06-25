import React from 'react'
import { Line } from 'react-chartjs-2'
import { Segment, Button, Divider } from 'semantic-ui-react'
import { createApolloFetch } from 'apollo-fetch'
import { updatePlantData } from '../Utils/queries'
import {  tempTemplate,
          tempTemplateHist,
          radTemplate,
          radTemplateHist,
          humTemplate,
          humTemplateHist,
          loudTemplate,
          loudTemplateHist} from "../Utils/chartTemplates"

import logo from "../styles/logo.svg"
import '../styles/styles.css'
import Healthometer from '../Components/Healthometer'
import Tree from "./Tree"
import LiveCharts from "../Components/LiveCharts"
import HistoricalCharts from "../Components/HistoricalCharts"


// Connecting to Graphql Endpoint
const uri = 'http://167.99.240.197:8000/graphql'
const fetch = createApolloFetch({ uri })



class PlantDetail extends React.Component {

    constructor(props) {
        super(props)
        const loaded = this.plantIsLoaded()
        this.state = {
            plantId: sessionStorage.plantId,
            plantName: sessionStorage.plantName,
            arduId: sessionStorage.arduId,
            jwt: sessionStorage.jwt,
            health: 0,
            size: 0,
            temperature: loaded ? tempTemplate() : null,
            temperatureHist: tempTemplateHist(),
            tempOpt: sessionStorage.tempOpt,
            humidity: loaded ? humTemplate() : null,
            humidityHist: humTemplateHist(),
            humOpt: sessionStorage.humOpt,
            loudness: loaded ? loudTemplate() : null,
            loudnessHist: loudTemplateHist(),
            loudOpt: sessionStorage.loudOpt,
            radiation: loaded ? radTemplate() : null,
            radiationHist: radTemplateHist(),
            radOpt: sessionStorage.radOpt,
            timer: "",
            loaded: loaded,
            live: true,
            plantStatesHist: [],
            timeStampsHist: [],
            tempDataHist: [],
            humDataHist: [],
            radDataHist: [],
            loudDataHist: []
        }

        if (loaded) this.onUpdatePlantData()

    }

    plantIsLoaded() {
        const { loadedPlantId, plantId } = sessionStorage
        return loadedPlantId === plantId ? true : false
    }

    //Changing state on user input
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    //Get last data of plant and add it into chart array
    onUpdatePlantData = async (e) => {
        try {

            fetch.use(({ options }, next) => {
                if (!options.headers) {
                    options.headers = {} // Create the headers object if needed.
                }
                options.headers['authorization'] = "Bearer " + this.state.jwt
                next()
            })

            // Fetching query
            const plantState = await fetch({
                query: updatePlantData(this.state.plantId, 1),
            }).then(res => res.data.plant.plantStates && res.data.plant.plantStates[0])

            // If we didn't receive any data
            if (!plantState) return

            const { sensorDates } = plantState

            const oldTime = this.state.temperature.labels.slice(-1)[0]
            const newTime = sensorDates.timeStamp.substring(11, 19)
            // If we didn't receive new data
            if (oldTime == newTime) return

            this.setState(prev => ({
                health: Math.floor(plantState.health * 100),
                size: plantState.size,
                temperature: {
                    ...prev.temperature,
                    labels: [...prev.temperature.labels, sensorDates.timeStamp.substring(11, 19)],
                    datasets: [{ ...prev.temperature.datasets[0], data: [...prev.temperature.datasets[0].data, sensorDates.temperatureValue] }],
                    datasets: [{ ...prev.temperature.datasets[1], data: [...prev.temperature.datasets[1].data, this.state.tempOpt] }]
                },
                humidity: {
                    ...prev.humidity,
                    labels: [...prev.humidity.labels, sensorDates.timeStamp.substring(11, 19)],
                    datasets: [{ ...prev.humidity.datasets[0], data: [...prev.humidity.datasets[0].data, sensorDates.humidityValue] }],
                    datasets: [{ ...prev.humidity.datasets[1], data: [...prev.humidity.datasets[1].data, this.state.humOpt] }]
                },
                radiation: {
                    ...prev.radiation,
                    labels: [...prev.radiation.labels, sensorDates.timeStamp.substring(11, 19)],
                    datasets: [{ ...prev.radiation.datasets[0], data: [...prev.radiation.datasets[0].data, sensorDates.radiationValue] }],
                    datasets: [{ ...prev.radiation.datasets[1], data: [...prev.radiation.datasets[1].data, this.state.radOpt] }]
                },
                loudness: {
                    ...prev.loudness,
                    labels: [...prev.loudness.labels, sensorDates.timeStamp.substring(11, 19)],
                    datasets: [{ ...prev.loudness.datasets[0], data: [...prev.loudness.datasets[0].data, sensorDates.loudnessValue] }],
                    datasets: [{ ...prev.loudness.datasets[1], data: [...prev.loudness.datasets[1].data, this.state.loudOpt] }]
                },
            }))

        } catch (e) { console.log(e.message) }

        // timeout to wait for new data
        setTimeout(function () { this.onUpdatePlantData() }.bind(this), 4000)
    }

    onHistory = async (e) => {

      this.setState({live: false});

      try {

          fetch.use(({ options }, next) => {
              if (!options.headers) {
                  options.headers = {} // Create the headers object if needed.
              }
              options.headers['authorization'] = "Bearer " + this.state.jwt
              next()
          })

          // Fetching query
          const plantState = await fetch({
              query: updatePlantData(this.state.plantId, 100),
          }).then(res => { this.setState({ plantStatesHist : res.data.plant.plantStates})})
          console.log(this.state.plantStatesHist);

          this.setState({ timeStampsHist : this.state.plantStatesHist.map( plant => plant.sensorDates.timeStamp.substring(11, 19)),
                          tempDataHist : this.state.plantStatesHist.map( plant => plant.sensorDates.temperatureValue),
                          humDataHist : this.state.plantStatesHist.map( plant => plant.sensorDates.humidityValue),
                          radDataHist : this.state.plantStatesHist.map( plant => plant.sensorDates.radiationValue),
                          loudDataHist : this.state.plantStatesHist.map( plant => plant.sensorDates.loudnessValue)});

           this.state.temperatureHist.labels = this.state.timeStampsHist
           this.state.temperatureHist.datasets[0].data = this.state.tempDataHist

           this.state.humidityHist.labels = this.state.timeStampsHist
           this.state.humidityHist.datasets[0].data = this.state.humDataHist

           this.state.radiationHist.labels = this.state.timeStampsHist
           this.state.radiationHist.datasets[0].data = this.state.radDataHist

           this.state.loudnessHist.labels = this.state.timeStampsHist
           this.state.loudnessHist.datasets[0].data = this.state.loudDataHist

           this.setState({})


      } catch (e) { console.log(e.message) }
    }

    render() {
        return (
            <center>
                <div style={{ width: 900 }}>
                    <Segment padded>
                        <h1>{this.state.plantName}</h1>
                        <br />
                        <Tree heightFactor={this.state.size / 100} />
                        <br />
                        <Divider />
                        <Button.Group>
                            <Button color="green" onClick={() => {this.setState({live: true})}}>live data</Button>
                            <Button.Or />
                            <Button color="orange" onClick={(e) => this.onHistory(e)}>historical</Button>
                        </Button.Group>
                        <br />
                        <br />
                        < Healthometer health={this.state.health} />
                        {this.state.live ?
                          <LiveCharts temperatureLive={this.state.temperature} humidityLive={this.state.humidity} radiationLive={this.state.radiation} loudnessLive={this.state.loudness}/>
                          :
                          <HistoricalCharts temperatureHist={this.state.temperatureHist} humidityHist={this.state.humidityHist} radiationHist={this.state.radiationHist} loudnessHist={this.state.loudnessHist}/>
                        }
                        <br />
                    </Segment>
                </div>
            </center>
        )
    }
}

export default PlantDetail

// Maybe i will need it later

// <div style={{ width: 700, hight: 550 }}>
//     <Line data={this.state.temperature}
//         width={300}
//         height={200}
//         options={{ maintainAspectRatio: false }} />
// </div>
// <div style={{ width: 700, hight: 550 }}>
//     <Line data={this.state.humidity}
//         width={300}
//         height={200}
//         options={{ maintainAspectRatio: false }} />
// </div>
// <div style={{ width: 700, hight: 550 }}>
//     <Line data={this.state.radiation}
//         width={300}
//         height={200}
//         options={{ maintainAspectRatio: false }} />
// </div>
// <div style={{ width: 700, hight: 550 }}>
//     <Line data={this.state.loudness}
//         width={300}
//         height={200}
//         options={{ maintainAspectRatio: false }} />
// </div>
