import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import EventList from '../EventList';
import Event from '../Event';

import { mockData } from '../mock-data'

Enzyme.configure({ adapter: new Adapter()})

describe('EventList component', () => {
    test('render correct number of events', () => {
        const EventListWrapper = shallow(<EventList events={mockData}/>);
        expect(EventListWrapper.find(Event)).toHaveLength(mockData.length);
    })
})
