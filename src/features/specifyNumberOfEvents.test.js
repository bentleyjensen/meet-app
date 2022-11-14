import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { mockData } from "../mock-data";

import App from "../App";
import EventList from "../EventList";

Enzyme.configure({ adapter: new Adapter() });

// Use path relative to the root
const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    test('Users are shown 32 events by default', async ({ given, when, then }) => {
        given('the app is closed', async () => {

        });

        let AppWrapper;
        when('the user opens the app', async () => {
            AppWrapper = await mount(<App />);
        });

        then('thirty-two events are shown', async () => {
            await AppWrapper.update();
            const expectedCount = (mockData.length <= 32) ? mockData.length : 32;
            expect(AppWrapper.find('.event')).toHaveLength(expectedCount)
        });
    });

    test('Users can change the number of events shown', async ({ given, when, then }) => {
        let AppWrapper;
        given('the app is open', async () => {
            AppWrapper = await mount(<App />);
        });

        when('the user changes the number of events', async () => {
            await AppWrapper.find('.eventCount').simulate('change', { target: { value: 1 }});
        });

        then('that number of events are listed', async () => {
            await AppWrapper.update();
            expect(await AppWrapper.find('.event')).toHaveLength(1);
        });
    });
});
