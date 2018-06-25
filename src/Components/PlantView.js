import React from 'react'
import { Popup, Grid } from 'semantic-ui-react'
import IndividualImage from './IndividualImage'
import HealthIcon from './HealthIcon'
import ArduLoader from './ArduLoader'

class PlantView extends React.Component {

    constructor(props) {
        super(props)
        const health = (this.props.plant.plantStates[0] && this.props.plant.plantStates[0].health || 0) * 100

        this.state = {
            plantName: this.props.plant.name,
            plantId: this.props.plant.id,
            health: health,
            tempOpt: this.props.plant.temperature_opt,
            humOpt: this.props.plant.humidity_opt,
            radOpt: this.props.plant.radiation_opt,
            loudOpt: this.props.plant.loudness_opt,
            history: this.props.history
        }
    }

    isLoaded() {
        const { loadedPlantId } = sessionStorage
        const { plantId } = this.props

        return loadedPlantId && loadedPlantId === plantId
            ? true
            : false
    }

    onDetail(e) {
        sessionStorage.health = this.state.health
        sessionStorage.plantId = this.state.plantId
        sessionStorage.plantName = this.state.plantName
        sessionStorage.tempOpt = this.state.tempOpt
        sessionStorage.humOpt = this.state.humOpt
        sessionStorage.radOpt = this.state.radOpt
        sessionStorage.loudOpt = this.state.loudOpt
        this.state.history.push("/detail")
    }

    render() {

        return (
            <div>
                <Grid>
                    <Grid.Column width={4} verticalAlign="middle">
                        <IndividualImage id={this.state.plantId} />
                    </Grid.Column>
                    <Grid.Column width={4} verticalAlign="middle">
                        <Popup
                            trigger={<a onClick={(e) => this.onDetail(e)}><h2>{this.props.plant.name}</h2></a>}
                            content="Show plant details"
                            basic
                        />
                    </Grid.Column>
                    <Grid.Column width={4} verticalAlign="middle">
                        <HealthIcon health={this.state.health} />
                    </Grid.Column>
                    <Grid.Column width={4} verticalAlign="middle">
                        <ArduLoader health={this.state.health} plantId={this.state.plantId} plantName={this.state.plantName} />
                    </Grid.Column>
                </Grid>

            </div>
        )
    }
}


export default PlantView
