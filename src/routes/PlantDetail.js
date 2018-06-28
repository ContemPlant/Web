import React from 'react'
import { Segment, Button, Divider, Accordion, Grid, Container } from 'semantic-ui-react'
import { createApolloFetch } from 'apollo-fetch'
import { merge } from 'lodash'

import { updatePlantData } from '../Utils/queries'
import '../styles/styles.css'
import Healthometer from '../Components/Healthometer'
import Tree from '../Components/Tree'
import Plot from '../Components/Plot'
import Calendar from '../Components/Calendar'


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
            onSelect: this.onSelect.bind(this),
            dateFrom: new Date(),
            dateTo: new Date(),
            lastSelected: new Date(),
            activeIndex: 1
        }
    }

    onSelect(e) {
      var selectedDate = new Date(e)
      var last = this.state.lastSelected

      if(selectedDate.getTime() <= last.getTime()) {
        this.setState({
            dateFrom: selectedDate,
            dateTo: last
        })
      } else {
        this.setState({
            dateFrom: last,
            dateTo: selectedDate
        })
      }

      this.setState({
        lastSelected: selectedDate
      })

      console.log('New date: ' + e)
      this.onHistory()
    }

    loadingStrategy(live) {
        this.setState({ live: live})

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

        const query = updatePlantData(this.state.plantId, true)
        const plantStates = await this.fetchData(query)
            .then(res => res.data.plant.plantStates)

        const health = plantStates.slice(-1).pop().health
        const size = plantStates.slice(-1).pop().size

        // TODO plants = .filter(timestamp>= dateFrom and <= dateTo)
        // timestamp format: e.g. 2018-06-15T11:12:57.984Z
        const plants = plantStates.filter(state =>
          this.isInTimeRange(state.sensorDates.timeStamp) )
        console.log('PLANTS: ' + plants);
        const timeStamps = plants.map(x => x.sensorDates.timeStamp.substring(11, 19))

        this.setState(prev => ({
            ...prev,
            health,
            size,
            temperature: merge(tempTemplate(), {
                labels: timeStamps,
                datasets: [{
                    label: 'temperature history',
                    data: plants.map(x => x.sensorDates.temperatureValue)
                }, { data: plants.map(x => this.state.tempOpt) }]
            }),
            humidity: merge(humTemplate(), {
                labels: timeStamps,
                datasets: [{
                    label: 'humidity history',
                    data: plants.map(x => x.sensorDates.humidityValue)
                }, { data: plants.map(x => this.state.humOpt) }]
            }),
            radiation: merge(radTemplate(), {
                labels: timeStamps,
                datasets: [{
                    label: 'radiation history',
                    data: plants.map(x => x.sensorDates.radiationValue)
                }, { data: plants.map(x => this.state.radOpt) }]
            }),
            loudness: merge(loudTemplate(), {
                labels: timeStamps,
                datasets: [{
                    label: 'loudness history',
                    data: plants.map(x => x.sensorDates.loudnessValue)
                }, { data: plants.map(x => this.state.loudOpt) }]
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

    isInTimeRange(timeStamp) {
      var currentTimestamp = new Date(timeStamp)
      var min = this.state.dateFrom.getTime()
      var max = this.state.dateTo.getTime()

      return currentTimestamp.getTime() >= min &&
            currentTimestamp.getTime() <= max
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
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

                          { this.state.live &&
                            <Button.Group>
                                <Button color="green" onClick={() => { this.loadingStrategy(true) }}>live data</Button>
                                <Button.Or />
                                <Button inverted color="orange" onClick={() => { this.loadingStrategy(false) }}>historical</Button>
                            </Button.Group>
                          }
                          { !this.state.live &&
                            <Button.Group>
                                <Button inverted color="green" onClick={() => { this.loadingStrategy(true) }}>live data</Button>
                                <Button.Or />
                                <Button color="orange" onClick={() => { this.loadingStrategy(false) }}>historical</Button>
                            </Button.Group>
                          }
                        <br />
                        <br />
                        < Healthometer health={Math.floor(this.state.health * 100)} />
                        <br />
                        <br />
                        {!this.state.live &&
                            <Container >
                                <Segment padded>
                                    <Accordion>
                                        <Accordion.Title active={this.state.activeIndex === 0} index={0} onClick={this.handleClick}>
                                            <Grid columns={2}>
                                                <Grid.Row>
                                                    <Grid.Column>
                                                        <h1>FROM </h1>
                                                        {this.state.dateFrom.getDate().toString()}.
                                                        {(this.state.dateFrom.getMonth()+1).toString()}.
                                                        {this.state.dateFrom.getFullYear().toString()}
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                        <h1>TO </h1>
                                                        {this.state.dateTo.getDate().toString()}.
                                                        {(this.state.dateTo.getMonth()+1).toString()}.
                                                        {this.state.dateTo.getFullYear().toString()}
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </ Grid>
                                            <Button circular inverted color='green' icon='calendar outline' />
                                        </Accordion.Title>
                                        <Accordion.Content active={this.state.activeIndex === 0}>
                                            <Calendar onSelect={this.state.onSelect.bind(this)} />
                                        </Accordion.Content>
                                    </Accordion>    
                                </Segment>    
                            </ Container>
                        }
                        <br />
                        <br />
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
