import React from 'react'
import { Segment, Button, Divider } from 'semantic-ui-react'
import { createApolloFetch } from 'apollo-fetch'
import { updatePlantData } from '../Utils/queries'

import '../styles/styles.css'
import Healthometer from '../Components/Healthometer'
import Tree from "../Components/Tree"
import Plot from "../Components/Plot"
import { merge } from 'lodash'

// Chart templates 
import {
    tempTemplate,
    radTemplate,
    humTemplate,
    loudTemplate
} from '../Utils/plot-config'

// Connecting to Graphql Endpoint
const uri = 'http://167.99.240.197:8000/graphql'
const fetch = createApolloFetch({ uri })

class PlantDetail extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            plantId: sessionStorage.plantId,
            plantName: sessionStorage.plantName,
            arduId: sessionStorage.arduId,
            jwt: sessionStorage.jwt,
            health: 0,
            size: 0,
            temperature: tempTemplate(),
            tempOpt: sessionStorage.tempOpt,
            humidity: humTemplate(),
            humOpt: sessionStorage.humOpt,
            loudness: loudTemplate(),
            loudOpt: sessionStorage.loudOpt,
            radiation: radTemplate(),
            radOpt: sessionStorage.radOpt,
            live: false,
        }
    }

    loadingStrategy(live) {
        // if the current plant is loaded
        if (live) {
            this.setState(prev => ({
                ...prev,
                temperature: tempTemplate(),
                humidity: humTemplate(),
                radiation: radTemplate(),
                loudness: loudTemplate()
            }))
            // Then start polling for live data
            this.startPoll()
        } else {
            // Otherwise load historical data
            clearTimeout(this.timeout)
            this.onHistory()
        }
    }

    componentWillMount() {
        this.loadingStrategy(this.state.live)
    }
    fetchData(query) {
        const authMiddleWare = jwt => ({ options }, next) => {
            if (!options.headers) {
                options.headers = {} // Create the headers object if needed.
            }
            options.headers['authorization'] = "Bearer " + jwt
            next()
        }
        fetch.use(authMiddleWare(this.state.jwt))

        // Fetching query
        return fetch({ query })
    }

    //Get last data of plant and add it into chart array
    async onUpdatePlantData() {

        const query = updatePlantData(this.state.plantId)
        const plantState = await this.fetchData(query)
            .then(res => res.data.plant.plantStates && res.data.plant.plantStates[0])

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
            health: plantState.health,
            size: plantState.size,
            temperature: this.addChartData(this.state.tempOpt)(this.state.temperature, newTime, t),
            humidity: this.addChartData(this.state.humOpt)(this.state.humidity, newTime, h),
            radiation: this.addChartData(this.state.radOpt)(this.state.radiation, newTime, r),
            loudness: this.addChartData(this.state.loudOpt)(this.state.loudness, newTime, l)
        }))

    }

    async onHistory() {

        this.setState({ live: false })

        const query = updatePlantData(this.state.plantId, 100)
        const plantStates = await this.fetchData(query)
            .then(res => res.data.plant.plantStates)

        const health = plantStates.slice(-1).pop().health
        const size = plantStates.slice(-1).pop().size
        const timeStamps = plantStates.map(x => x.sensorDates.timeStamp.substring(11, 19))

        this.setState(prev => ({
            ...prev,
            health,
            size,
            temperature: merge(tempTemplate(), {
                labels: timeStamps,
                datasets: [{
                    label: 'temperature history',
                    data: plantStates.map(x => x.sensorDates.temperatureValue)
                }, { data: plantStates.map(x => this.state.tempOpt) }]
            }),
            humidity: merge(humTemplate(), {
                labels: timeStamps,
                datasets: [{
                    label: 'humidity history',
                    data: plantStates.map(x => x.sensorDates.humidityValue)
                }, { data: plantStates.map(x => this.state.humOpt) }]
            }),
            radiation: merge(radTemplate(), {
                labels: timeStamps,
                datasets: [{
                    label: 'radiation history',
                    data: plantStates.map(x => x.sensorDates.radiationValue)
                }, { data: plantStates.map(x => this.state.radOpt) }]
            }),
            loudness: merge(loudTemplate(), {
                labels: timeStamps,
                datasets: [{
                    label: 'loudness history',
                    data: plantStates.map(x => x.sensorDates.loudnessValue)
                }, { data: plantStates.map(x => this.state.loudOpt) }]
            })
        }))
    }

    startPoll() {
        this.onUpdatePlantData()
        this.timeout = setTimeout(() => this.startPoll(), 3000);
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
                <div style={{ maxWidth: 900 }}>
                    <Segment padded>
                        <h1>{this.state.plantName}</h1>
                        <br />
                        <Tree heightFactor={this.state.size / 100} />
                        <br />
                        <Divider />
                        <Button.Group>
                            <Button color="green" onClick={() => { this.loadingStrategy(true) }}>live data</Button>
                            <Button.Or />
                            <Button color="orange" onClick={() => { this.loadingStrategy(false) }}>historical</Button>
                        </Button.Group>
                        <br />
                        <br />
                        < Healthometer health={Math.floor(this.state.health * 100)} />
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
