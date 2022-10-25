import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import CitySearch from '../CitySearch';
import { mockData } from '../mock-data';
import { extractLocations } from '../api';

Enzyme.configure({ adapter: new Adapter() });

describe('CitySearch component', () => {
    let locations, citySearchWrapper;

    beforeAll(() => {
        // Get an array of locations
        locations = extractLocations(mockData);
        citySearchWrapper = shallow(<CitySearch locations={locations} updateEvents={() => { }} />);
    });

    test('render text input box', () => {
        expect(citySearchWrapper.find('.cityInput')).toHaveLength(1);
    });

    test('renders a list of suggestions', () => {
        expect(citySearchWrapper.find('.suggestions')).toHaveLength(1);
    });

    test('renders text input correctly', () => {
        const query = citySearchWrapper.state('query');
        expect(citySearchWrapper.find('.cityInput').prop('value')).toBe(query)
    });

    test('change state when text input changes', () => {
        citySearchWrapper.setState({
            query: 'Munich',
        });
        const eventObject = { target: { value: 'Berlin'}};
        citySearchWrapper.find('.cityInput').simulate('change', eventObject);
        expect(citySearchWrapper.state('query')).toBe('Berlin');
    });

    test('render list of suggestions correctly', () => {
        // Set the state for the component
        citySearchWrapper.setState({
            suggestions: locations,
        });
        const suggestions = citySearchWrapper.state('suggestions');

        // We're adding 'see all cities', so it will be +1
        expect(citySearchWrapper.find('.suggestions li')).toHaveLength(suggestions.length + 1)
        // Loop through the current state suggestions
        for (let i = 0; i < suggestions.length; i++) {
            // Obtain the text for each suggestion
            // It should match against the suggestions in state
            expect(citySearchWrapper.find('.suggestions li').at(i).text()).toBe(suggestions[i])
        }
    });

    test('suggestion list matches query when changed', () => {
        citySearchWrapper.setState({
            query: '',
            suggestions: [],
        });
        citySearchWrapper.find('.cityInput').simulate('change', { target: { value: 'Berlin' }});
        const query = citySearchWrapper.state('query');
        const filteredLocations = locations.filter(location => location.toUpperCase().indexOf(query.toUpperCase()) !== -1);
        expect(citySearchWrapper.state('suggestions')).toEqual(filteredLocations);
    });

    test('selecting a suggestion should change query state', () => {
        citySearchWrapper.setState({
            query: 'Berlin',
        });
        const suggestions = citySearchWrapper.state('suggestions');
        citySearchWrapper.find('.suggestions li').at(0).simulate('click');
        expect(citySearchWrapper.state('query')).toBe(suggestions[0]);
    });
})
