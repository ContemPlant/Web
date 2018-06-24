import React, { Component } from 'react';
import Gauge from 'react-svg-gauge';

export default class Healthometer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      health: this.props.health,
      color: this.setColor(this.props.health)
  	};
  }

  setColor(health) {
    if(health <= 33) {
      return "red"
    } else if (health > 33 && health <= 66) {
      return "orange"
    } else {
      return "#2bbf2b"
    }
  }

  componentWillReceiveProps(nextProps) {
    if ( nextProps.health !== this.state.health )
      this.setState( { health: nextProps.health, color: this.setColor(nextProps.health)})
  }

	render() {
		return (
			<div>
				<Gauge value={this.state.health} width={400} height={320} label="Health" color={this.state.color} />
			</div>
		);
	}
}
