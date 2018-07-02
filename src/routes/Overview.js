import React from 'react'
import { createApolloFetch } from 'apollo-fetch'
import { Link } from 'react-router-dom'
import { Icon, Input, Segment, Button, List, Container, Accordion, Grid, Popup } from 'semantic-ui-react'
import { plantQuery, createPlant } from '../Utils/queries'

import '../styles/styles.css'
import Landingpage from './Landingpage'
import PlantView from '../Components/PlantView'
import { GRAPHQL_URI } from '../Utils/config'

// Connecting to Graphql Endpoint
const fetch = createApolloFetch({ uri: GRAPHQL_URI })

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

    updatePlants() {

        try {
            fetch.use(({ options }, next) => {
                if (!options.headers) {
                    options.headers = {} // Create the headers object if needed.
                }
                options.headers['authorization'] = "Bearer " + this.state.jwt
                next()
            })

            fetch({ query: plantQuery() })
                .then(res => {
                    if (!res.data || !res.data.plants) {
                        console.log(res)
                        return
                    }

                    this.setState({ plants: res.data.plants })
                    console.log(res.data.plants)
                })

        } catch (e) { console.log(e.message) }

    }


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

    onLogout(e) {
        sessionStorage.clear()
        this.props.history.push('/')

        //notify the "native" app
        window.postMessage(`logout|`, "*")
    }

    // Render function of module
    render() {

        const { activeIndex } = this.state

        const green = { color: '#2bbf2b' }
        const orange = { color: 'orange' }

        if (this.state.jwt === "" || !this.state.jwt) return (< Landingpage />)

        return (
            <div>
                <center>
                <Container>
                    <Segment padded>
                        <br />
                        <Grid container columns={3}>
                            <Grid.Column>
                            </Grid.Column>
                            <Grid.Column >
                                <h1>
                                    <span style={orange}>Hello</span>
                                    ,
                                    <span style={green}> {this.state.username}</span>
                                    ! Your Plants:
                                </h1>
                            </Grid.Column>
                            <Grid.Column textAlign='right'>
                                <Link to='/'>
                                    <Popup trigger={<Icon color='green' name="log out" size='large' onClick={e => this.onLogout(e)}/>}
                                        content="Logout"/>
                                </Link>
                            </Grid.Column>
                        </Grid> 
                        <br />
                        <br />
                        
                        <List celled>
                            {this.state.plants.map((plant) => { return <List.Item key={plant.id} ><PlantView plant={plant} history={this.props.history} /></List.Item> })}
                        </List>

                        <Accordion>
                            <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                                <Icon name='plus circle' color='green' size='large' />
                                Add plant
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === 0}>
                                <div>
                                    <label>Plant name:</label>
                                    <br />
                                    <Input name="plantName" onChange={e => this.onChange(e)} value={this.state.plantName} placeholder="Plant name" />
                                    <br />
                                    <label>Optimal temperature:</label>
                                    <br />
                                    <Input name="tempOpt" onChange={e => this.onChange(e)} value={this.state.tempOpt} placeholder="Temperature Opt." />
                                    <br />
                                    <label>Optimal humidity:</label>
                                    <br />
                                    <Input name="humidityOpt" onChange={e => this.onChange(e)} value={this.state.humidityOpt} placeholder="Humidity Opt." />
                                    <br />
                                    <label>Optimal brightness:</label>
                                    <br />
                                    <Input name="radOpt" onChange={e => this.onChange(e)} value={this.state.radOpt} placeholder="Radiation Opt." />
                                    <br />
                                    <label>Optimal loudness:</label>
                                    <br />
                                    <Input name="loudOpt" onChange={e => this.onChange(e)} value={this.state.loudOpt} placeholder="Loudness Opt." />
                                    <br />
                                    <br />
                                    <Button color='green' onClick={e => this.onCreatePlant(e)}>Submit your new plant!</Button>
                                </div>
                            </Accordion.Content>
                        </Accordion>
                        
                    </Segment>
                    </Container>
                </center>
            </div>
        )
    }
}
