import React from 'react';
import { Line } from 'react-chartjs-2';


const data = {
  labels: ['21:34', '21:35', '21:36', '21:37', '21:38', '21:39', '21:40'],
  datasets: [
    {
      label: 'Temperatur Verlauf',
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

const data2 = {
  labels: ['21:34', '21:35', '21:36', '21:37', '21:38', '21:39', '21:40'],
  datasets: [
    {
      label: 'Luftfeuchtigkeit',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(255,0,0,0.4)',
      borderColor: 'rgba(255,0,0,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(255,0,0,0.4)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [35, 40, 38, 55, 48, 43, 37]
    }
  ]
};


class Plant extends React.Component {

	constructor() {

            // Preparing state
            super();
            this.state = {
               show : false
			};
		}



	onShow = (e) => {

    this.setState({
		show : !this.state.show
  		});
	}


    render() {

        return (
        	<div onClick={ (e) => this.onShow(e)}>
            <li> <b>{"ID: "}</b>  {this.props.plant.id} <b>{"Temperatur Optimum: "}</b> {this.props.plant.temperature_opt} {"°C"} </li>
            <li> <b>{"Luftfeuchtigkeit Optimum: "}</b> {this.props.plant.humidity_opt} {"%"} <b>{"Helligkeit Optimum: "}</b> {this.props.plant.radiation_opt} </li>
            { this.state.show ? (
            	<div>
            		<div style={{width: 400, height: 200}}>
                		<Line   data={data}
                        		width={400}
                        		height={200}
                        		options={{maintainAspectRatio : false}} />
            		</div>

            		<div style={{width: 400, height: 200}}>
                		<Line   data={data2}
                        		width={400}
                        		height={200}
                        		options={{maintainAspectRatio : false}} />
            		</div>
            	</div>
				) :(<label></label>)}
            <br></br>
			</div>
        )
    }
}

export default Plant;
