import React from 'react'
import { Line } from 'react-chartjs-2'
import { merge } from 'lodash'

class Plot extends React.Component {

    constructor(props) {
        super(props)
        const { template } = props.config
        this.state = { data: template }
    }

    componentWillReceiveProps(newProps) {
        addData(this.state.data, newProps.label, newProps.data)
    }

    addData(label, data) {

        let { data: chart } = this.state

        chart.data.labels.push(label)
        chart.data.datasets[0].push(data)

        this.setState(prev => merge(prev, { data: chart }))
    }

    render() {
        return (
            <div style={{ maxWidth: 700, maxHeight: 550 }}>
                <Line data={this.state.data}
                    width={300}
                    height={200}
                    options={{ maintainAspectRatio: false }} />
            </div>
        )
    }
}

export default Plot