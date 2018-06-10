import React, { Component } from 'react';
import Gauge from 'react-svg-gauge';

export default class Healthometer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      health: this.props.health
  	};
  }

	render() {
		return (
			<div>
				<Gauge value={this.state.health} width={400} height={320} label="Health" />
			</div>
		);
	}
}
