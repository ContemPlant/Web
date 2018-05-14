import React from 'react';

class Plant extends React.Component {

    render() {

        return (

            <li> {"ID: " + this.props.plant.id} {"Temperatur Optimum: " + this.props.plant.temperature_opt} </li>
        )
    }
}

export default Plant;


// {this.props.plant.id} {this.props.plant.temperature_opt}
