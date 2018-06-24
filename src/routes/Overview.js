import React from 'react'
import { createApolloFetch } from 'apollo-fetch'
import { Icon, Input, Segment, Button, List, Container, Accordion } from 'semantic-ui-react'
import { plantQuery, createPlant } from '../Utils/queries'

import '../styles/styles.css'
import Login from './Login'
import PlantView from '../Components/PlantView'

// Connecting to Graphql Endpoint
const uri = 'http://167.99.240.197:8000/graphql'
const fetch = createApolloFetch({ uri })

export default class Overview extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            jwt: sessionStorage.jwt,
            email: sessionStorage.email,
            username: sessionStorage.username,
            activeIndex: 1,
            plants: [],
            plantName: "",
            tempOpt: "",
            humidityOpt: "",
            radOpt: "",
            loudOpt: ""

        }
        this.updatePlants()
    }

    // Gets list of user plants
    updatePlants() {

        try {
            fetch.use(({ options }, next) => {
                if (!options.headers) {
                    options.headers = {} // Create the headers object if needed.
                }
                options.headers['authorization'] = "Bearer " + this.state.jwt
                next()
            })

            // Fetching query
            fetch({ query: plantQuery() })
                .then(res => {
                    this.setState({ plants: res.data.plants })
                    console.log(res.data.plants)
                })

        } catch (e) { console.log(e.message) }

    }

    //Function to crate a plant and persist on DB
    onCreatePlant = (e) => {
        fetch.use(({
            request,
            options
        }, next) => {
            if (!options.headers) {
                options.headers = {} // Create the headers object if needed.
            }
            options.headers['authorization'] = "Bearer " + this.state.jwt

            next()
        })

        try {

            // Fetching query
            fetch({
                query: createPlant(this.state.plantName, this.state.tempOpt, this.state.humidityOpt, this.state.radOpt, this.state.loudOpt),
            }).then(res => {
                // Updating token (We need another solution for that)
                console.log(res)
                this.updatePlants()

            })
        } catch (e) {
            console.log(e.message)
        }
    }

    //Changing state on user input
    onChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    // Render function of module
    render() {

        const { activeIndex } = this.state

        var green = {
            color: '#2bbf2b'
        }

        var orange = {
            color: 'orange'
        }

        if (this.state.jwt === "") {
            alert("Please login first!")
            return (< Login />)
        } else {

            return (
                <div>
                    <center>
                        <Segment padded>
                            <Container>
                                <br></br>
                                <h1>
                                    <span style={orange}>Hello</span>
                                    ,
                    <span style={green}> {this.state.username}</span>
                                    ! Your Plants:
                  </h1>
                                <br></br>
                                <br></br>
                                <List celled>
                                    {this.state.plants.map((plant) => { return <List.Item key={plant.id} ><PlantView plant={plant} history={this.props.history}/></List.Item> })}
                                </List>
                                <Accordion>
                                    <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                                        <Icon name='plus circle' />
                                        Add plant
                  </Accordion.Title>
                                    <Accordion.Content active={activeIndex === 0}>
                                        <div>
                                            <label>Plant name:</label>
                                            <br></br>
                                            <Input name="plantName" onChange={e => this.onChange(e)} value={this.state.plantName} placeholder="Plant name" />
                                            <br></br>
                                            <label>Optimal temperature:</label>
                                            <br></br>
                                            <Input name="tempOpt" onChange={e => this.onChange(e)} value={this.state.tempOpt} placeholder="Temperature Opt." />
                                            <br></br>
                                            <label>Optimal humidity:</label>
                                            <br></br>
                                            <Input name="humidityOpt" onChange={e => this.onChange(e)} value={this.state.humidityOpt} placeholder="Humidity Opt." />
                                            <br></br>
                                            <label>Optimal brightness:</label>
                                            <br></br>
                                            <Input name="radOpt" onChange={e => this.onChange(e)} value={this.state.radOpt} placeholder="Radiation Opt." />
                                            <br></br>
                                            <label>Optimal loudness:</label>
                                            <br></br>
                                            <Input name="loudOpt" onChange={e => this.onChange(e)} value={this.state.loudOpt} placeholder="Loudness Opt." />
                                            <br></br>
                                            <br></br>
                                            <Button primary onClick={e => this.onCreatePlant(e)}>Submit your new plant!</Button>
                                        </div>
                                    </Accordion.Content>
                                </Accordion>
                            </Container>
                        </Segment>
                    </center>
                </div>
            )
        }
    }
}
