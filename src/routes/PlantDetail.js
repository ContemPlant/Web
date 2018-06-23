import React from 'react'
import { Line } from 'react-chartjs-2'
import { Segment, Button, Divider } from 'semantic-ui-react'
import { createApolloFetch } from 'apollo-fetch'
import { updatePlantData } from '../Utils/queries'
import { merge } from 'lodash'

import '../styles/styles.css'
import Healthometer from '../Components/Healthometer'
import Tree from "../Components/Tree"
import Plot from "../Components/Plot"

// Chart templates 
import {
    tempTemplate,
    radTemplate,
    humTemplate,
    loudTemplate
} from '../Components/plot-config'

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
            temperature: tempTemplate,
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

    componentWillMount() {
        // if the current plant is loaded
        if (this.plantIsLoaded())
            // Then start polling for live data
            this.startPoll()
    }

    fetchData() {
        const authMiddleWare = jwt => ({ options }, next) => {
            if (!options.headers) {
                options.headers = {} // Create the headers object if needed.
            }
            options.headers['authorization'] = "Bearer " + jwt
            next()
        }
        fetch.use(authMiddleWare(this.state.jwt))

        // Fetching query
        return fetch({ query: updatePlantData(this.state.plantId) })
            .then(res => res.data.plant.plantStates && res.data.plant.plantStates[0])
    }

    //Get last data of plant and add it into chart array
    async onUpdatePlantData() {

        const plantState = await this.fetchData()

        console.log(plantState)
        // If we didn't receive any data
        if (!plantState) return

        const { sensorDates } = plantState

        const oldTime = this.state.temperature.labels.slice(-1)[0]
        const newTime = sensorDates.timeStamp.substring(11, 19)
        // If we didn't receive new data
        if (oldTime == newTime) return

        const {
            temperatureValue: t,
            humidityValue: h,
            radiationValue: r,
            loudnessValue: l
        } = sensorDates

        this.setState(prev => ({
            health: Math.floor(plantState.health * 100),
            size: plantState.size,
            temperature: this.addChartData(this.state.tempOpt)(this.state.temperature, newTime, t),
            humidity: this.addChartData(this.state.humOpt)(this.state.humidity, newTime, h),
            radiation: this.addChartData(this.state.radOpt)(this.state.radiation, newTime, r),
            loudness: this.addChartData(this.state.loudOpt)(this.state.loudness, newTime, l)
        }))

    }

    startPoll() {
        this.onUpdatePlantData()
        setTimeout(() => this.startPoll(), 3000);
    }

    addChartData = opt => (chart, label, data) => {
        return {
            labels: [...chart.labels, label],
            datasets: [
                { ...chart.datasets[0], data: [...chart.datasets[0].data, data] },
                { ...chart.datasets[1], data: [...chart.datasets[1].data, opt] }
            ]
        }
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
                        < Plot config={this.state.temperature} />
                        < Plot config={this.state.humidity} />
                        < Plot config={this.state.radiation} />
                        < Plot config={this.state.loudness} />
                        <br />
                    </Segment>
                </div>
            </center>
        )
    }
}

export default PlantDetail
