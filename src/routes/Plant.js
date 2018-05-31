import React from 'react';
import {Line} from 'react-chartjs-2';
import { Icon, Input, Segment, Button, Divider, Label } from 'semantic-ui-react'


const data = {
  labels: ['21:34', '21:35', '21:36', '21:37', '21:38', '21:39', '21:40'],
  datasets: [
    {
      label: 'Health history',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [24, 25, 23, 22, 20, 21, 22]
    }
  ]
};


class Plant extends React.Component {

	constructor(props) {

            // Preparing state
            super(props);
            this.state = {
               show : false,
               plantID: this.props.plant.id,
               plantName: this.props.plant.name,
               jwt: this.props.jwt
			};
		}

  detailView = (e) => {

    sessionStorage.plantID = this.state.plantID;
    sessionStorage.plantName = this.state.plantName;
    sessionStorage.jwt = this.state.jwt;
    this.props.history.push("/detail");
  }

	onShow = (e) => {
    
    this.setState({
		show : !this.state.show
  		});
	}


    render() {

        return (
        	<div>
        	<div onClick={ (e) => this.onShow(e)}>
            <li> <b>{"Name: "}</b>  {this.props.plant.name} <b>{"Temperatur Optimum: "}</b> {this.props.plant.temperature_opt} {"°C"} </li>
            <li> <b>{"Luftfeuchtigkeit Optimum: "}</b> {this.props.plant.humidity_opt} {"%"} <b>{"Helligkeit Optimum: "}</b> {this.props.plant.radiation_opt} </li> 
            </div>
            { this.state.show ? (
            	<div>			
            		<div style={{width: 400, height: 200}}>
                		<Line   data={data}
                        		width={400}
                        		height={200}
                        		options={{maintainAspectRatio : false}} />
            		</div>
            		<Button onClick= { (e) => this.detailView(e) }> detailed view </Button>
            	</div>
				) :(<label></label>)}
            <br></br>
			</div>        
        )
    }
}

export default Plant;

