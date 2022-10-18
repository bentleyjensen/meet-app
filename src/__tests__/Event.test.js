import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Event from '../Event';

import { mockData } from '../mock-data';

Enzyme.configure({ adapter: new Adapter() });

describe('Event Component', () => {
    let EventWrapper;

    beforeAll(() => {
        EventWrapper = shallow(<Event event={mockData[0]} />);
    });

    test('Events default to collapsed', () => {
        expect(EventWrapper.state('collapsed')).toBe(true);
    });

    test('Collapsed events contain correct details', () => {
        
        // Visible elements
        expect(EventWrapper.find('.summary')).toHaveLength(1);
        expect(EventWrapper.find('.datetime')).toHaveLength(1);
        expect(EventWrapper.find('.location')).toHaveLength(1);
        expect(EventWrapper.find('.detailsButton').text()).toBe('Show Details');

        // Hidden elements
        expect(EventWrapper.find('.aboutHeading')).toHaveLength(0);
        expect(EventWrapper.find('.calendarLink')).toHaveLength(0);
        expect(EventWrapper.find('.description')).toHaveLength(0);
    });

    test('Component expands when clicked', () => {
        expect(EventWrapper.state('collapsed')).toBe(true);
        EventWrapper.find('.detailsButton').simulate('click');
        expect(EventWrapper.state('collapsed')).toBe(false);
    });

    test('Expanded components contain all details', () => {
        EventWrapper.setState({
            collapsed: false,
        });
        // Visible elements
        expect(EventWrapper.find('.summary')).toHaveLength(1);
        expect(EventWrapper.find('.datetime')).toHaveLength(1);
        expect(EventWrapper.find('.location')).toHaveLength(1);
        expect(EventWrapper.find('.aboutHeading')).toHaveLength(1);
        expect(EventWrapper.find('.calendarLink')).toHaveLength(1);
        expect(EventWrapper.find('.description')).toHaveLength(1);
        expect(EventWrapper.find('.detailsButton').text()).toBe('Hide Details');
    });
});
