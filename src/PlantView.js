import React from 'react';
import { Link } from "react-router-dom";
import { Icon, Segment, Button, Popup, Grid, Image} from 'semantic-ui-react';
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
              health: 10
			};
		}


    render() {

        return (
        	<div>
          <Grid>
            <Grid.Column width={4} verticalAlign="middle">
              <IndividualImage id={this.state.plantId} />
            </Grid.Column>
            <Grid.Column width={4} verticalAlign="middle">
              <Link to="/detail">
                <h2>{this.props.plant.name}</h2>
              </Link>
            </Grid.Column>
            <Grid.Column width={4} verticalAlign="middle">
              <HealthIcon health={this.state.health} />
            </Grid.Column>
            <Grid.Column width={4} verticalAlign="middle">
              <ArduLoader health={this.state.health} plantId={this.state.plantId} />
            </Grid.Column>
          </Grid>

			    </div>
        )
    }
}

export default PlantView;
