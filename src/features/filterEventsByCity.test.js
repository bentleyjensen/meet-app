import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { mockData } from "../mock-data";
import { extractLocations } from '../api';

import App from "../App";
import CitySearch from '../CitySearch';


Enzyme.configure({ adapter: new Adapter() });

// Use path relative to the root
const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, test => {
    test('When a user hasn\'t searched for a city, show events from all cities', ({ given, when, then }) => {
        given('a user hasn\'t searched for a city', () => {

        });

        let AppWrapper;
        when('the user opens the app', () => {
            AppWrapper = mount(<App />);
        });

        then('events from all cities are displayed', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
        });
    });

    test('User should see a list of suggestions when searching for a city', ({ given, when, then, and }) => {
        let CitySearchWrapper;
        let locations = extractLocations(mockData)

        given('the main page is open', () => {
            CitySearchWrapper = shallow(<CitySearch updateEvents={() => {}} locations={locations} />)
        });

        when('the user begins typing in the searchbox', () => {
            CitySearchWrapper.find('.cityInput').simulate('change', { target: { value: 'Berlin' } });
        });

        then('a list of suggestions appears', () => {
            expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(2);
        });
    });

    test('User can select a city from the suggestions list', async ({ given, and, when, then }) => {
        let AppWrapper;

        given('A user has typed into the searchbox (such as \'berlin\')', async () => {
            AppWrapper = await mount(<App />);
            AppWrapper.find('.cityInput').simulate('change', { target: { value: 'berlin' } });
        });

        and('the list of suggestions is visible', async () => {
            await AppWrapper.update();
            expect(AppWrapper.find('.suggestions li')).toHaveLength(2);
        });

        when('the user clicks a suggested city (ie \'Berlin, Germany\')', () => {
            AppWrapper.find('.suggestions li').at(0).simulate('click');
        });

        then('the users city should be changed to that city (ie \'Berlin, Germany\')', () => {
            const CitySearchWrapper = AppWrapper.find(CitySearch);
            expect(CitySearchWrapper.state('query')).toBe('Berlin, Germany');
        });

        and('only events in that city should be listed', () => {
            AppWrapper.update();
            const filteredLocations = mockData.filter(ev => ev.location === 'Berlin, Germany');
            expect(AppWrapper.find('.event')).toHaveLength(filteredLocations.length)
        });
    });

});
