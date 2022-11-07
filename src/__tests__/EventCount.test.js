import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import EventCount from '../EventCount';

import { mockData } from '../mock-data';

Enzyme.configure({ adapter: new Adapter() });

describe('EventCount Component', () => {
    let EventCountWrapper;

    beforeAll(() => {
        EventCountWrapper = shallow(<EventCount countEvents={32} />);
    });

    test('Render text input box', () => {
        expect(EventCountWrapper.find('.eventCount')).toHaveLength(1);
    });

    test('EventCount value is derived from countEvents prop', () => {
        expect(EventCountWrapper.find('.eventCount').props().value).toBe(32);
    })
});
