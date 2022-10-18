import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import EventCount from '../EventCount';

import { mockData } from '../mock-data';

Enzyme.configure({ adapter: new Adapter() });

describe('EventCount Component', () => {
    let EventCountWrapper;

    beforeAll(() => {
        EventCountWrapper = shallow(<EventCount event={mockData[0]} />);
    });

    test('Render text input box', () => {
        expect(EventCountWrapper.find('.eventCount')).toHaveLength(1);
    });

    test('Count defaults to blank', () => {
        expect(EventCountWrapper.state('count')).toBe(0);
        expect(EventCountWrapper.find('.eventCount').prop('value')).toBe(0);
    });

    test('Change state when text input changes', () => {
        EventCountWrapper.setState({
            count: 5
        });
        const eventObject = { target: { value: 10 }};
        EventCountWrapper.find('.eventCount').simulate('change', eventObject);
        expect(EventCountWrapper.state('count')).toBe(10);
        expect(EventCountWrapper.find('.eventCount').prop('value')).toBe(10);
    });
});
