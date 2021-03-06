import React, { Component } from 'react';
import { select as d3select, mouse as d3mouse } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { Container, Grid } from 'semantic-ui-react'

import Pythagoras from '../Components/Pythagoras';

class Tree extends Component {
    svg = {
        width: 600,
        height: 300
    };
    state = {
        currentMax: 11,
        baseW: 80,
        heightFactor: this.props.heightFactor,
        lean: 0
    };
    running = false;
    realMax = 11;

    componentDidMount() {
        d3select(this.refs.svg).on("mousemove", this.onMouseMove.bind(this));
        this.next();
    }

    componentWillReceiveProps(nextProps) {
      if ( nextProps.heightFactor !== this.state.heightFactor )
        this.setState( { ...this.state, heightFactor: nextProps.heightFactor})
    }

    next() {
        const { currentMax } = this.state;

        if (currentMax < this.realMax) {
            this.setState({currentMax: currentMax + 1});
            setTimeout(this.next.bind(this), 500);
        }
    }

// Lean function range 0.2 - -0.2
    onMouseMove(event) {
        if (this.running) return;
        this.running = true;

        const [x, y] = d3mouse(this.refs.svg),

              scaleLean = scaleLinear().domain([0, this.svg.width/2, this.svg.width])
                                       .range([.2, 0, -.2]);

        this.setState({
            lean: scaleLean(x)
        });
        this.running = false;
    }

    render() {
        return (
            <div>
                <svg width={this.svg.width} height={this.svg.height} ref="svg">
                    <Pythagoras w={this.state.baseW}
                                h={this.state.baseW}
                                heightFactor={this.state.heightFactor}
                                lean={this.state.lean}
                                x={this.svg.width/2-40}
                                y={this.svg.height-this.state.baseW}
                                lvl={0}
                                maxlvl={this.state.currentMax}
                    />
                </svg>
            </div>
        );
    }
}

export default Tree;
