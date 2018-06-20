import React from 'react'
import PlantView from '../Components/PlantView'
import { shallow, mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'

configure({ adapter: new Adapter() })


describe('PlantView', () => {
    const plant = {
        id: 'plant1',
        name: 'fanky',
        temperature_opt: 20,
        humidity_opt: 10,
        radiation_opt: 30,
        loudness_opt: 300,
        plantStates: [{
            healht: 1, environment: 0, size: 1337
        }]
    }

    test('Renders correctly', () => {
        const tree = shallow(
            <PlantView plant={plant} />
        )
        expect(tree).toMatchSnapshot()
    })
})