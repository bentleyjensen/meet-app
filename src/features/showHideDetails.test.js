import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { mockData } from "../mock-data";

import Event from "../Event";


Enzyme.configure({ adapter: new Adapter() });

// Use path relative to the root
const feature = loadFeature('./src/features/showHideDetails.feature');

defineFeature(feature, test => {
    test('Event details are hidden by default', async ({ given, when, then }) => {
        given('the app is closed', () => {

        });

        let EventWrapper;
        when('the user opens the app', async () => {
            EventWrapper = await shallow(<Event event={mockData[0]} />);
        });

        then('the details are collapsed', () => {
            expect(EventWrapper.find('.description')).toHaveLength(0);
        });
    });

    test('User can expand an event and see details', async ({ given, when, then }) => {
        let EventWrapper;
        given('an event is collapsed', async () => {
            EventWrapper = await shallow(<Event event={mockData[0]} />);
        });

        when('the \'details\' button is clicked', async () => {
            await EventWrapper.find('.detailsButton').simulate('click');
        });

        then('the details become visible', async () => {
            expect(EventWrapper.find('.description')).toHaveLength(1);
        });
    });

    test('User can collapse event details to hide them', async ({ given, when, then }) => {
        let EventWrapper;
        given('an event has its details visible', async () => {
            EventWrapper = await shallow(<Event event={mockData[0]} />);
            await EventWrapper.setState({
                collapsed: false,
            });
            expect(EventWrapper.find('.description')).toHaveLength(1);
        });

        when('the \'details\' button is clicked', async () => {
            await EventWrapper.find('.detailsButton').simulate('click');
        });

        then('the details become hidden', async () => {
            expect(EventWrapper.find('.description')).toHaveLength(0);
        });
    });
});
