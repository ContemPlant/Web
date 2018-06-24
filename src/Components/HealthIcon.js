import React from 'react';
import { Button, Popup } from 'semantic-ui-react';


class HealthIcon extends React.Component {

	constructor(props) {
            super(props);
            this.state = {
              health: this.props.health,
              color: this.setColor(this.props.health)
			       };
		}

    setColor(health) {
      if (health <= 33) {
				return "red"
      } else if (health > 33 && health <= 66 ) {
				return "yellow"
      } else {
				return "green"
      }
    }

		componentWillReceiveProps(nextProps) {
			if ( nextProps.health !== this.state.health )
				this.setState( { health: nextProps.health, color: this.setColor(nextProps.health)})
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
