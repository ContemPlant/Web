import React from 'react';
import { Link } from "react-router-dom";
import { Icon, Segment, Button, Popup, Grid, Image } from 'semantic-ui-react';
import IndividualImage from './IndividualImage';
import HealthIcon from './HealthIcon';
import ArduLoader from './ArduLoader';


class PlantView extends React.Component {

	constructor(props) {
            super(props);
            this.state = {
              jwt: sessionStorage.jwt,
              plantName: this.props.plant.name,
              plantId: this.props.plant.id,
              health: (this.props.plant.plantStates[0] && this.props.plant.plantStates[0].health || 0)*100,
							loaded: this.isLoaded()
			};
			console.log(this.props.plant.id)
	}

				isLoaded() {
					if (sessionStorage.loadedPlantId !== null && sessionStorage.loadedPlantId === this.props.plantId) {
						return true
					} else {
						return false
					}
				}

	onDetail(e) {
		sessionStorage.health = this.state.health,
		sessionStorage.plantId = this.state.plantId,
		sessionStorage.plantName = this.state.plantName,
		this.props.history.push("/detail")
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
								trigger={ <a onClick={ (e) => this.onDetail(e) }><h2>{this.props.plant.name}</h2></a> }
								content="Show plant details"
								basic
						/>
            </Grid.Column>
            <Grid.Column width={4} verticalAlign="middle">
              <HealthIcon health={this.state.health} />
            </Grid.Column>
            <Grid.Column width={4} verticalAlign="middle">
              <ArduLoader health={this.state.health} plantId={this.state.plantId} plantName={this.state.plantName}/>
            </Grid.Column>
          </Grid>

			    </div>
        )
    }
}

export default PlantView;
