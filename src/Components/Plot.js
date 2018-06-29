import React from 'react'
import { Line } from 'react-chartjs-2'

class Plot extends React.Component {

    constructor(props) {
        super(props)
        const { config } = props
        this.state = {
            data: config
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.config == nextProps.config) return

        const { config } = nextProps
        this.setState({ data : config })
    }

    render() {
        return (
            <div style={{ maxWidth: 700, maxHeight: 550 }}>
                <Line data={this.state.data}
                    width={300}
                    height={200}
                    options={{ maintainAspectRatio: false, legend: { display: false }} } />
            </div>
        )
    }
}

export default Plot