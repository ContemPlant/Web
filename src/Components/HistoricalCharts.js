import React from 'react'
import { Line } from 'react-chartjs-2'

class HistoricalCharts extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          temperature: this.props.temperatureHist,
          humidity: this.props.humidityHist,
          radiation: this.props.radiationHist,
          loudness: this.props.loudnessHist
        }
    }

    render() {
        return (
        <div>
          <div style={{ width: 700, hight: 550 }}>
              <Line data={this.state.temperature}
                  width={300}
                  height={200}
                  options={{ maintainAspectRatio: false }} />
          </div>
          <div style={{ width: 700, hight: 550 }}>
              <Line data={this.state.humidity}
                  width={300}
                  height={200}
                  options={{ maintainAspectRatio: false }} />
          </div>
          <div style={{ width: 700, hight: 550 }}>
              <Line data={this.state.radiation}
                  width={300}
                  height={200}
                  options={{ maintainAspectRatio: false }} />
          </div>
          <div style={{ width: 700, hight: 550 }}>
              <Line data={this.state.loudness}
                  width={300}
                  height={200}
                  options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        )
      }
    }

export default HistoricalCharts
