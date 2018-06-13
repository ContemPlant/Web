import React, { Component } from 'react';
import Gauge from 'react-svg-gauge';

export default class Healthometer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      health: this.props.health,
      color: this.setColor()
  	};
  }

  setColor() {
    if(this.props.health <= 33) {
      return "red"
    } else if (this.props.health > 33 && this.props.health <= 66) {
      return "orange"
    } else {
      return "#2bbf2b"
    }
  }

	render() {
		return (
			<div>
				<Gauge value={this.state.health} width={400} height={320} label="Health" color={this.state.color} />
			</div>
		);
	}
}
