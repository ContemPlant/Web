import React from 'react'
import { Line } from 'react-chartjs-2'
import { Segment, Button, Divider } from 'semantic-ui-react'
import { createApolloFetch } from 'apollo-fetch'
import { updatePlantData } from '../Utils/queries'

import '../styles/styles.css'
import Healthometer from '../Components/Healthometer'
import Tree from "../Components/Tree"


// Connecting to Graphql Endpoint
const uri = 'http://167.99.240.197:8000/graphql'
const fetch = createApolloFetch({ uri })

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
        },
        {
            label: 'temperature optimum',
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
}

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
        },
        {
            label: 'radiation optimum',
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
}

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
        },
        {
            label: 'loudness optimum',
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
}

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
        },
        {
            label: 'humidity optimum',
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
}


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
            temperature: loaded ? tempTemplate : null,
            tempOpt: sessionStorage.tempOpt,
            humidity: loaded ? humTemplate : null,
            humOpt: sessionStorage.humOpt,
            loudness: loaded ? loudTemplate : null,
            loudOpt: sessionStorage.loudOpt,
            radiation: loaded ? radTemplate : null,
            radOpt: sessionStorage.radOpt,
            timer: "",
            loaded: loaded,
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
                query: updatePlantData(this.state.plantId),
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
                            <Button color="green">live data</Button>
                            <Button.Or />
                            <Button color="orange">historical</Button>
                        </Button.Group>
                        <br />
                        <br />
                        < Healthometer health={this.state.health} />
                        {/* <div style={{ width: 700, hight: 550 }}>
                            <Line data={this.state.temperature}
                                width={300}
                                height={200}
                                options={{ maintainAspectRatio: false }} />
                        </div>
                        <div style={{ width: 700, hight: 550 }}>
                            <Line data={this.state.humidity}
                                width={300}
                                height={200}
                                options={{ maintainAspectRatio: false }} />
                        </div>
                        <div style={{ width: 700, hight: 550 }}>
                            <Line data={this.state.radiation}
                                width={300}
                                height={200}
                                options={{ maintainAspectRatio: false }} />
                        </div>
                        <div style={{ width: 700, hight: 550 }}>
                            <Line data={this.state.loudness}
                                width={300}
                                height={200}
                                options={{ maintainAspectRatio: false }} />
                        </div> */}
                        <br />
                    </Segment>
                </div>
            </center>
        )
    }
}

export default PlantDetail
