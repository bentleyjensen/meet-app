import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import App from '../App';
import EventList from '../EventList';
import EventCount from '../EventCount';
import CitySearch from '../CitySearch';

import { extractLocations, getEvents } from '../api';
import { mockData } from '../mock-data';

Enzyme.configure({ adapter: new Adapter() })

describe('App component tests', () => {
    let AppWrapper;

    beforeAll(() => {
        AppWrapper = shallow(<App />)
    });

    test('render list of events', () => {
        expect(AppWrapper.find(EventList)).toHaveLength(1);
    });

    test('render count for events', () => {
        expect(AppWrapper.find(EventCount)).toHaveLength(1);
    });

    test('render CitySearch', () => {
        expect(AppWrapper.find(CitySearch)).toHaveLength(1);
    });
});

describe('App integration tests', () => {
    // Moving mount(<App />) into beforeAll() fails tests.
    // Props for children of <App /> are all blank. Dunno why.

    test('App passes "events" prop to EventList', () => {
        const AppWrapper = mount(<App />);
        const AppEventsState = AppWrapper.state('events');
        expect(AppEventsState).not.toEqual(undefined);
        console.log(Object.keys(AppWrapper.find(EventList).props()), AppWrapper.find(EventList).props().events)

        expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
        AppWrapper.unmount();
    });

    test('App passes "locations" prop to CitySearch', () => {
        const AppWrapper = mount(<App />);
        const AppLocationState = AppWrapper.state('locations');
        expect(AppLocationState).not.toEqual(undefined);
        expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationState);
        AppWrapper.unmount();
    });

    test('Get list of events matching user selected city', async () => {
        const AppWrapper = mount(<App />);
        const CitySearchWrapper = AppWrapper.find(CitySearch);
        const locations = extractLocations(mockData);
        CitySearchWrapper.setState({ suggestions: locations });
        const suggestions = CitySearchWrapper.state('suggestions');

        const selectedIndex = Math.floor(Math.random() * suggestions.length);
        const selectedCity = suggestions[selectedIndex];

        await CitySearchWrapper.instance().handleItemClicked(selectedCity);
        const allEvents = await getEvents();

        const eventsToShow = allEvents.filter(event =>  event.location ===  selectedCity);

        expect(AppWrapper.state('events')).toEqual(eventsToShow);
        AppWrapper.unmount();
    });

    test('Get list of all events when user selects "See all cities"', async () => {
        const AppWrapper = mount(<App />);
        const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');

        // "See all cities" is always the last suggestion
        await suggestionItems.at(suggestionItems.length - 1).simulate('click');

        const allEvents = await getEvents();

        expect(AppWrapper.state('events')).toEqual(allEvents);
        AppWrapper.unmount();
    });
});
