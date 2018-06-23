let datasetBaseConfig = {
    fill: false,
    lineTension: 0.1,
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
}

let tempTemplate = {
    labels: [],
    datasets: [
        {
            ...datasetBaseConfig,
            label: 'live temperature',
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            data: []


        },
        {
            ...datasetBaseConfig,
            label: 'temperature optimum',
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            data: []

        }
    ]
}

let radTemplate = {
    labels: [],
    datasets: [
        {
            ...datasetBaseConfig,
            label: 'live radiation',
            backgroundColor: 'rgba(140,0,22,130)',
            borderColor: 'rgba(140,0,22,130)',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointHoverBackgroundColor: 'rgba(140,0,22,130)',
            pointHoverBorderColor: 'rgba(140,0,22,130)',
            data: []

        },
        {
            ...datasetBaseConfig,
            label: 'radiation optimum',
            backgroundColor: 'rgba(140,0,22,130)',
            borderColor: 'rgba(140,0,22,130)',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointHoverBackgroundColor: 'rgba(140,0,22,130)',
            pointHoverBorderColor: 'rgba(140,0,22,130)',
            data: []

        }
    ]
}

let loudTemplate = {
    labels: [],
    datasets: [
        {
            ...datasetBaseConfig,
            label: 'live loudness',
            backgroundColor: 'rgba(150,45,232,2)',
            borderColor: 'rgba(150,45,232,2)',
            pointBorderColor: 'rgba(150,45,232,2)',
            pointHoverBackgroundColor: 'rgba(150,45,232,2)',
            pointHoverBorderColor: 'rgba(150,45,232,2)',
            data: []

        },
        {
            ...datasetBaseConfig,
            label: 'loudness optimum',
            backgroundColor: 'rgba(150,45,232,2)',
            borderColor: 'rgba(150,45,232,2)',
            pointBorderColor: 'rgba(150,45,232,2)',
            pointHoverBackgroundColor: 'rgba(150,45,232,2)',
            pointHoverBorderColor: 'rgba(150,45,232,2)',
            data: []

        }
    ]
}

let humTemplate = {
    labels: [],
    datasets: [
        {
            ...datasetBaseConfig,
            label: 'live humidity',
            backgroundColor: 'rgba(32,124,232,2)',
            borderColor: 'rgba(32,124,232,2)',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            data: []

        },
        {
            ...datasetBaseConfig,
            label: 'humidity optimum',
            backgroundColor: 'rgba(32,124,232,2)',
            borderColor: 'rgba(32,124,232,2)',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            data: []

        }
    ]
}


module.exports = {
    tempTemplate,
    radTemplate,
    humTemplate,
    loudTemplate
}