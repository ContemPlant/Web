import React from 'react';
import { Icon, Segment, Button, Popup, Grid, Image} from 'semantic-ui-react';


class HealthIcon extends React.Component {

	constructor(props) {
            super(props);
            this.state = {
              health: this.props.health,
              color: ""
			       };

             this.getColor();
		}

    getColor() {
      if (this.state.health <= 33) {
        this.state.color="red";
      } else if (this.state.health > 33 && this.state.health <= 66 ) {
        this.state.color= "yellow";
      } else {
        this.state.color="green";
      }
    }


    render() {

        return (
        	<div>
            <Popup trigger={<Button circular color={this.state.color} icon="heartbeat" />}
                content={this.state.health}/>
			    </div>
        )
    }
}

export default HealthIcon;
